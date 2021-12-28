import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from 'victory';
import { useState, useEffect } from 'react';

function MemberSharedVotesPlot({member}) {
  const [sharedVotes, setSharedVotes] = useState([]);
  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      // Get shared votes
      const res = await fetch(`https://tb-music-club.herokuapp.com/api/shared-votes?memberId=${member.id}&clubId=04d9a851-61a1-476a-bc87-a3a30fc6a353`);
      const sharedVotes = await res.json();
      setSharedVotes(sharedVotes);

      // Prepare shared vote data for plotting
      const plotData = sharedVotes.map((memberSharedVotes) => ({
        name: memberSharedVotes.member.firstName,
        count: memberSharedVotes.sharedVotesCount >= 0 ? memberSharedVotes.sharedVotesCount : 0
      }));

      setPlotData(plotData);
    };

    loadData();
  }, [member]);

  if (member === null) return null;
  if (plotData.length === 0) return null;

  return (
    <VictoryChart
      domainPadding={30}
      animate={{ duration: 500, easing: 'cubic' }}>
      <VictoryBar
        data={plotData}
        x="name"
        y="count"
        labels={sharedVotes.map((x) => x.sharedVotesCount >= 0 ? x.sharedVotesCount : 'NA')}
        style={{ data: { width: 40, fill: "#888" }, labels: { fontFamily: 'Poppins', fontSize: 12, fill: "#888" } }}
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
