// Import packages
import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { VictoryArea, VictoryAxis, VictoryChart, VictoryContainer } from 'victory';

// Import components
import ChartPlaceholder from '../../ChartPlaceholder';

function HeartbeatChart({album}) {
  const [pointData, setPointData] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (album === null) return;

      let pointData = album.tracks.map((track, i) => {
        return { x: i + 1, y: track.pickerIds.length, y0: track.pickerIds.length * -1 }
      });

      // Flatten the start and end of the waveform
      pointData.unshift({x: 0, y: 0, y0: 0});
      pointData.push({x: album.tracks.length + 1, y: 0, y0: 0});

      setPointData(pointData);
      setHasLoaded(true);
    };

    loadData();
  }, [album]);

  // Define chart container that can scroll on mobile
  const touchDraggableContainer = <VictoryContainer
    responsive={false}
    style={{
      pointerEvents: 'auto', userSelect: 'auto', touchAction: 'auto'
    }}
  />;

  return (
    !hasLoaded ? <ChartPlaceholder aspectRatio={100 / 600} /> :
    <VictoryChart
      containerComponent={isMobile ? touchDraggableContainer : <VictoryContainer responsive={false} />}
      width={200}
      height={50}
      padding={0}
      domain={{ y: [-4.5, 4.5] }}>
      <VictoryArea
        data={pointData}
        interpolation="monotoneX" />

      <VictoryAxis
        style={{
          axis: { stroke: 'transparent' },
          ticks: {stroke: 'transparent' },
          tickLabels: { fill: 'transparent' }
        }} />
    </VictoryChart>
  );
}

export default HeartbeatChart;
