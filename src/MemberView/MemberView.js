import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './MemberView.module.css';

import { DateTime } from 'luxon';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from 'victory';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MemberHeader from './MemberHeader/MemberHeader';

function MemberView() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [participatedRounds, setParticipatedRounds] = useState([]);
  const [sharedVotes, setSharedVotes] = useState([]);

  useEffect(() => {
    const getMember = async () => {
      // Get member info
      const member = await fetchMember(id);
      setMember(member);

      // Get rounds info
      const rounds = await fetchRounds(member.participatedRoundIds);
      rounds.sort((a, b) => { return a.number - b.number });
      setParticipatedRounds(rounds);

      // Get member matches
      const sharedVotes = await fetchSharedVotes(id);
      setSharedVotes(sharedVotes);
    };

    getMember();
  }, [id]);

  const fetchMember = async (id) => {
    const res = await fetch('https://tb-music-club.herokuapp.com/api/member?id=' + id);
    const member = await res.json();
    return member;
  };

  const fetchRounds = async (roundIds) => {
    const roundPromises = roundIds.map((roundId) => {
      return fetch('https://tb-music-club.herokuapp.com/api/round?id=' + roundId)
        .then((res) => res.json());
    });
    const rounds = await Promise.all(roundPromises);
    return rounds;
  };

  const fetchSharedVotes = async (id) => {
    const res = await fetch(`https://tb-music-club.herokuapp.com/api/shared-votes?memberId=${id}&clubId=04d9a851-61a1-476a-bc87-a3a30fc6a353`);
    const sharedVotes = await res.json();
    return sharedVotes;
  };

  if (member === null) return null;

  if (participatedRounds.length === 0) return null;

  const joinDate = DateTime.fromISO(participatedRounds[0].startDate);
  const joinDateStr = joinDate.toLocaleString(DateTime.DATE_FULL);

  const participatedRoundCount = participatedRounds.length;
  const firstRound = participatedRounds[0];
  const latestRound = participatedRounds[participatedRoundCount - 1];

  const plotData = (sharedVotes !== null && sharedVotes !== undefined)
  ? sharedVotes.map((memberMatch) => {
    return {
      name: memberMatch.member.firstName,
      count: memberMatch.sharedVotesCount >= 0 ? memberMatch.sharedVotesCount : 0
    };
  })
  : null;

  const memberMatchPlot = (plotData.length > 0) ?
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
  : null;

  return (
    <div className={`${styles.MemberView} mt-3`}>
      <MemberHeader member={member} />

      <p>
        {`${member.firstName} joined round #${firstRound.number} on ${joinDateStr} and has participated in ${participatedRoundCount - 1}
        more since—the latest being #${latestRound.number}.`}
      </p>

      <div className="row">
        <div className="col-12">
          {
            memberMatchPlot
          }
        </div>
      </div>
    </div>
  );
}

export default MemberView;
