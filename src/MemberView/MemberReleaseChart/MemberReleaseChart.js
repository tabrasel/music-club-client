import chroma from 'chroma-js';
import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryTooltip } from 'victory';

import ChartPlaceholder from '../../ChartPlaceholder';

function MemberReleaseChart({member}) {
  const [plotData, setPlotData] = useState([]);
  const [fillColors, setFillColors] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (member === null) return;

      // Get shared votes
      const res = await fetch(`https://tb-music-club.herokuapp.com/api/member-release?memberId=${member.id}&byDecade=true`);
      const releases = await res.json();

      const fillColors = chroma.scale(['#fafa6e','purple']).mode('lch').colors(releases.releases.length);
      setFillColors(fillColors);

      // Format genre data for plotting
      const plotData = releases.releases.map((x, i) => ({
        i: i,
        decade: x.releaseTimeLabel,
        count: x.albumTitles.length,
        albumTitles: x.albumTitles.join(',\n')
      }));

      setPlotData(plotData);
    };

    loadData();
  }, [member]);

  // Define chart container that can scroll on mobile
  const touchDraggableContainer = <VictoryContainer style={{ pointerEvents: "auto", userSelect: "auto", touchAction: "auto" }} />;

  return (
    (plotData.length === 0) ? <ChartPlaceholder aspectRatio={300 / 450} /> :
    <VictoryChart
      containerComponent={isMobile ? touchDraggableContainer : <VictoryContainer />}
      domainPadding={200 / plotData.length}
      padding={{left: 35, right: 1, top: 1, bottom: 25}}
      animate={{ duration: 500, easing: 'cubic' }}>
      <VictoryBar
        data={plotData}
        x="decade"
        y="count"
        labels={plotData.map((x) => x.albumTitles)}
        labelComponent={
          <VictoryTooltip
            constrainToVisibleArea
            cornerRadius={0}
            flyoutStyle={{ strokeWidth: 0, fill: 'black' }}
            flyoutPadding={{top: 2, bottom: 2, left: 5, right: 5}}
            style={{ fontSize: 10, fill: 'white' }}
          />
        }
        style={{ data: { width: 300 / plotData.length, fill: ({ datum }) => fillColors[datum.i]}, labels: { fontFamily: 'Poppins', fontSize: 12, fill: "#313131" } }}
      />

      <VictoryAxis
        style={{ tickLabels: { fontFamily: 'Poppins', fontSize: 12 } }}
      />

      <VictoryAxis
        dependentAxis
        tickFormat={(t) => Math.round(t)}
        style={{ tickLabels: { fontFamily: 'Poppins', fontSize: 12 } }}
      />
    </VictoryChart>
  );
}

export default MemberReleaseChart;
