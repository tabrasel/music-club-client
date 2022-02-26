import chroma from 'chroma-js';
import { VictoryAxis, VictoryBoxPlot, VictoryChart, VictoryContainer, VictoryLabel } from 'victory';
import { useState, useEffect } from 'react';

import ChartPlaceholder from '../ChartPlaceholder';

function TrackPropertiesChart({tracks}) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (tracks === null) return;

      const speechinessValues = tracks.map((track) => {
        if (!('audioFeatures' in track))
          return null;
        return track.audioFeatures.speechiness
      });

      const instrumentalnessValues = tracks.map((track) => {
        if (!('audioFeatures' in track))
          return null;
        return track.audioFeatures.instrumentalness
      });

      const chartData = [
        { x: 1, y: speechinessValues },
        { x: 2, y: instrumentalnessValues }
      ];

      setChartData(chartData);
    };

    loadData();
  }, [tracks]);

  // Define chart placeholder
  const chartSkeleton = (<div style={{ width: '100%', height: '350px', backgroundColor: '#f3f3f3', borderRadius: '3px' }}></div>);

  // Define chart container that can scroll on mobile
  const chartContainer = <VictoryContainer style={{ pointerEvents: "auto", userSelect: "auto", touchAction: "auto" }} />;

  return (
    (chartData.length === 0) ? <ChartPlaceholder aspectRatio={300 / 450} /> :
    <VictoryChart
      containerComponent={chartContainer}
      width={250}
      height={250}
      padding={{left: 30, right: 30, top: 60, bottom: 25}}
      domainPadding={{x: [50, 50]}}
      animate={{ duration: 500, easing: 'cubic' }}>
      <VictoryBoxPlot
        boxWidth={25}
        data={chartData}
        categories={{ x: ['speechiness', 'instrumentalness'] }}
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
        text="Properties"
        x={125}
        y={30}
        textAnchor="middle"
        style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: 'bold' }}
      />
    </VictoryChart>
  );
}

export default TrackPropertiesChart;
