import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './MemberView.module.css';

import { DateTime } from 'luxon';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from 'victory';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MemberView() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [participatedRounds, setParticipatedRounds] = useState([]);
  const [memberMatches, setMemberMatches] = useState([]);

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
      const memberMatches = await fetchMemberMatches(id);
      setMemberMatches(memberMatches);
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

  const fetchMemberMatches = async (id) => {
    const res = await fetch(`https://tb-music-club.herokuapp.com/api/member-match?memberId=${id}&clubId=04d9a851-61a1-476a-bc87-a3a30fc6a353`);
    const memberMatches = await res.json();
    return memberMatches;
  };

  if (member === null) return null;

  if (participatedRounds.length === 0) return null;

  const joinDate = DateTime.fromISO(participatedRounds[0].startDate);
  const joinDateStr = joinDate.toLocaleString(DateTime.DATE_FULL);

  const participatedRoundCount = participatedRounds.length;
  const firstRound = participatedRounds[0];
  const latestRound = participatedRounds[participatedRoundCount - 1];

  const plotData = (memberMatches !== null && memberMatches !== undefined)
  ? memberMatches.map((memberMatch) => {
    return {
      name: memberMatch.member.firstName,
      count: memberMatch.matchCount >= 0 ? memberMatch.matchCount : 0
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
      labels={memberMatches.map((x) => x.matchCount >= 0 ? x.matchCount : 'NA')}
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
      <div className={`${styles.memberHeader} mb-3`}>
        <div className={styles.memberIcon} style={{ backgroundColor: member.color }}>
          <p>{member.firstName[0]}{member.lastName[0]}</p>
        </div>

        <h1>{member.firstName} {member.lastName}</h1>
      </div>

      <p>
        {`${member.firstName} joined round #${firstRound.number} on ${joinDateStr} and has participated in ${participatedRoundCount - 1}
        more since—the latest being #${latestRound.number}.`}
      </p>

      <div className="row">
        <div className="col-12">
          <h2></h2>
          {
            memberMatchPlot
          }
        </div>
      </div>


    </div>
  );
}

export default MemberView;
