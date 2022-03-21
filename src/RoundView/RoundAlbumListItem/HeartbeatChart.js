// Import packages
import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { VictoryAxis, VictoryChart, VictoryContainer, VictoryLine } from 'victory';

// Import components
import ChartPlaceholder from '../../ChartPlaceholder';

function HeartbeatChart({album}) {
  const [pointData, setPointData] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (album === null) return;

      const pointData = album.tracks.map((track, i) => {
        return { x: i, y: track.pickerIds.length }
      });

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
      domain={{ x: [-0.5, pointData.length - 0.5], y: [-0.5, 4.5] }}>
      <VictoryLine
        data={pointData}
        interpolation="catmullRom"
        style={{
          strokeLinecap: 'round',
          data: { stroke: '#aaa' }
        }}
      />

      <VictoryAxis style={{ axis: { stroke: 'transparent' } }} />
    </VictoryChart>
  );
}

export default HeartbeatChart;
