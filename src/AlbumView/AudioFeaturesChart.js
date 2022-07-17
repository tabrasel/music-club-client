import chroma from 'chroma-js';
import { VictoryAxis, VictoryBoxPlot, VictoryChart, VictoryContainer, VictoryLabel, VictoryScatter, VictoryTooltip } from 'victory';
import { isMobile } from 'react-device-detect';
import { useState, useEffect } from 'react';

import ChartPlaceholder from '../ChartPlaceholder';

function AudioFeaturesChart({ tracks, features, colors, title }) {
  const [boxData, setBoxData] = useState([]);
  const [pointData, setPointData] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  colors = colors.map((color) => chroma(color));

  useEffect(() => {
    const loadData = async () => {
      if (tracks === null) return;

      const pointColors = createPointColors(features, colors);
      const boxColors = createBoxColors(features, colors);

      const boxData = createBoxData(tracks, features, boxColors);
      const pointData = createPointData(tracks, features, pointColors);

      setBoxData(boxData);
      setPointData(pointData);
      setHasLoaded(true);
    };

    loadData();
  }, [tracks]);

  // Define chart container that can scroll on mobile
  const touchDraggableContainer = <VictoryContainer style={{ pointerEvents: "auto", userSelect: "auto", touchAction: "auto" }} />;

  return (
    !hasLoaded ? <ChartPlaceholder aspectRatio={300 / 450} /> :
    <VictoryChart
      containerComponent={isMobile ? touchDraggableContainer : <VictoryContainer />}
      width={250}
      height={250}
      padding={{left: 30, right: 30, top: 60, bottom: 25}}
      domainPadding={{x: [40, 40]}}>
      <VictoryBoxPlot
        boxWidth={35}
        data={boxData}
        categories={{ x: features }}
        style={{
          min: { stroke: ({ datum }) => datum.color },
          max: { stroke: ({ datum }) => datum.color },
          median: { stroke: "white" },
          q1: { fill: ({ datum }) => datum.color },
          q3: { fill: ({ datum }) => datum.color }
        }}
      />

      <VictoryScatter
        style={{ data: { fill: ({ datum }) => datum.color }}}
        size={3}
        data={pointData}
        labels={pointData.map((datum) => datum.label)}
        labelComponent={
          <VictoryTooltip
            cornerRadius={0}
            flyoutStyle={{ strokeWidth: 0, fill: "black" }}
            flyoutPadding={{top: 2, bottom: 2, left: 5, right: 5}}
            style={{ fontSize: 10, fill: "white" }}
            pointerLength={10}
            pointerWidth={5}
          />
        }
      />

      <VictoryAxis
        style={{ tickLabels: { fontFamily: 'Poppins', fontSize: 10 } }}
      />

      <VictoryAxis
        dependentAxis
        domain={{y: [0, 1]}}
        tickValues={[0.0, 0.2, 0.4, 0.6, 0.8, 1.0]}
        tickFormat={(t) => t.toFixed(1)}
        style={{ tickLabels: { fontFamily: 'Poppins', fontSize: 10 } }}
      />

      <VictoryLabel
        text={title}
        x={125}
        y={30}
        textAnchor="middle"
        style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: 'bold' }}
      />
    </VictoryChart>
  );
}

function createBoxColors(features, colors) {
  const boxColors = {};
  for (let i = 0; i < features.length; i++)
    boxColors[features[i]] = colors[i].brighten(2).desaturate().hex();
  return boxColors;
}

function createPointColors(features, colors) {
  const pointColors = {};
  for (let i = 0; i < features.length; i++)
    pointColors[features[i]] = colors[i].alpha(0.6).hex();
  return pointColors;
}

function createBoxData(tracks, features, boxColors) {
  const boxData = [];
  for (const track of tracks) {
    if ('audioFeatures' in track) {
      let x = 1;
      for (const feature of features) {
        boxData.push({ x: x, y: track.audioFeatures[feature], color: boxColors[feature] });
        x++;
      }
    }
  }
  return boxData;
}

function createPointData(tracks, features, pointColors) {
  const pointData = [];
  for (const track of tracks) {
    if ('audioFeatures' in track) {
      let x = 1;
      for (const feature of features) {
        pointData.push({ x: x + Math.random() * 0.25 - 0.125, y: track.audioFeatures[feature], color: pointColors[feature], label: track.title });
        x++;
      }
    }
  }
  return pointData;
}

export default AudioFeaturesChart;
