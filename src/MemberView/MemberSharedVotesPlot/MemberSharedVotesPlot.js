import { VictoryAxis, VictoryBar, VictoryChart, VictoryContainer } from 'victory';
import { useState, useEffect } from 'react';

import ChartPlaceholder from '../../ChartPlaceholder';

import { getMemberSharedVotes } from '../../services/MemberService';

function MemberSharedVotesPlot({member}) {
  const [sharedVotes, setSharedVotes] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadChartData = async () => {
      if (member === null) return;

      // Get shared votes
      const sharedVotes = await getMemberSharedVotes(member.id, '04d9a851-61a1-476a-bc87-a3a30fc6a353');
      setSharedVotes(sharedVotes);

      // Prepare shared vote data for plotting
      const chartData = sharedVotes.map((memberSharedVotes) => ({
        name: memberSharedVotes.member.firstName,
        count: memberSharedVotes.sharedVotesCount >= 0 ? memberSharedVotes.sharedVotesCount : 0,
        color: memberSharedVotes.member.color
      }));

      setChartData(chartData);
    };

    loadChartData();
  }, [member]);

  // Define chart container that can scroll on mobile
  const chartContainer = <VictoryContainer style={{ pointerEvents: "auto", userSelect: "auto", touchAction: "auto" }} />;

  return (
    (chartData.length === 0) ? <ChartPlaceholder aspectRatio={300 / 450} /> :
    <VictoryChart
      containerComponent={chartContainer}
      domainPadding={200 / chartData.length}
      padding={{left: 35, right: 1, top: 1, bottom: 25}}
      animate={{ duration: 500, easing: 'cubic' }}>
      <VictoryBar
        data={chartData}
        x="name"
        y="count"
        labels={sharedVotes.map((x) => x.sharedVotesCount >= 0 ? '' : 'NA')}
        style={{ data: { width: 300 / chartData.length, fill: ({ datum }) => datum.color}, labels: { fontFamily: 'Poppins', fontSize: 12, fill: "#313131" } }}
      />

      <VictoryAxis
        style={{ tickLabels: { fontFamily: 'Poppins', fontSize: 12 } }}
      />

      <VictoryAxis
        dependentAxis
        style={{ tickLabels: { fontFamily: 'Poppins', fontSize: 12 } }}
      />
    </VictoryChart>
  );
}

export default MemberSharedVotesPlot;
