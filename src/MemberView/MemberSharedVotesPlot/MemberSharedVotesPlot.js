import { VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryLabel } from 'victory';
import { useState, useEffect } from 'react';

function MemberSharedVotesPlot({member}) {
  const [sharedVotes, setSharedVotes] = useState([]);
  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (member === null) return;

      // Get shared votes
      const res = await fetch(`https://tb-music-club.herokuapp.com/api/shared-votes?memberId=${member.id}&clubId=04d9a851-61a1-476a-bc87-a3a30fc6a353`);
      const sharedVotes = await res.json();
      setSharedVotes(sharedVotes);

      // Prepare shared vote data for plotting
      const plotData = sharedVotes.map((memberSharedVotes) => ({
        name: memberSharedVotes.member.firstName,
        count: memberSharedVotes.sharedVotesCount >= 0 ? memberSharedVotes.sharedVotesCount : 0,
        color: memberSharedVotes.member.color
      }));

      setPlotData(plotData);
    };

    loadData();
  }, [member]);

  const chartSkeleton = (<div style={{ width: '100%', height: '350px', backgroundColor: '#f3f3f3', borderRadius: '3px' }}></div>);

  return (
    (plotData.length === 0) ? chartSkeleton :
    <VictoryChart
      domainPadding={30}
      animate={{ duration: 500, easing: 'cubic' }}>
      <VictoryBar
        data={plotData}
        x="name"
        y="count"
        labels={sharedVotes.map((x) => x.sharedVotesCount >= 0 ? x.sharedVotesCount : 'NA')}
        style={{ data: { width: 40, fill: ({ datum }) => datum.color}, labels: { fontFamily: 'Poppins', fontSize: 12, fill: "#313131" } }}
      />

      <VictoryAxis
        style={{ tickLabels: { fontFamily: 'Poppins', fontSize: 12 } }}
      />

      <VictoryAxis
        dependentAxis
        style={{ tickLabels: { fontFamily: 'Poppins', fontSize: 12 } }}
      />

      <VictoryLabel
        text="Shared Votes"
        x={225}
        y={30}
        textAnchor="middle"
        style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: 'bold' }}
      />
    </VictoryChart>
  );
}

export default MemberSharedVotesPlot;
