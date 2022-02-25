import chroma from 'chroma-js';
import { VictoryAxis, VictoryBoxPlot, VictoryChart, VictoryContainer, VictoryLabel } from 'victory';
import { useState, useEffect } from 'react';

import ChartPlaceholder from '../ChartPlaceholder';

function TrackMoodChart({tracks}) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (tracks === null) return;

      const danceabilityValues = tracks.map((track) => {
        if (track.audioFeatures === null)
          return null;
        return track.audioFeatures.danceability
      });

      const valenceValues = tracks.map((track) => {
        if (track.audioFeatures === null)
          return null;
        return track.audioFeatures.valence
      });

      const energyValues = tracks.map((track) => {
        if (track.audioFeatures === null)
          return null;
        return track.audioFeatures.energy
      });

      const chartData = [
        { x: 1, y: danceabilityValues },
        { x: 2, y: valenceValues },
        { x: 3, y: energyValues }
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
      domainPadding={{x: [50, 50]}}
      animate={{ duration: 500, easing: 'cubic' }}>
      <VictoryBoxPlot
        boxWidth={30}
        data={chartData}
        categories={{ x: ['danceability', 'valence', 'energy'] }}
      />

      <VictoryAxis
        style={{ tickLabels: { fontFamily: 'Poppins', fontSize: 12 } }}
      />

      <VictoryAxis
        dependentAxis
        domain={{y: [0, 1]}}
        tickValues={[0.0, 0.2, 0.4, 0.6, 0.8, 1.0]}
        tickFormat={(t) => t.toFixed(1)}
        style={{ tickLabels: { fontFamily: 'Poppins', fontSize: 12 } }}
      />

      <VictoryLabel
        text="Mood"
        x={225}
        y={30}
        textAnchor="middle"
        style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: 'bold' }}
      />
    </VictoryChart>
  );
}

export default TrackMoodChart;
