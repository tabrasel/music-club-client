import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './MemberView.module.css';

import { DateTime } from 'luxon';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MemberHeader from './MemberHeader/MemberHeader';
import MemberSharedVotesPlot from './MemberSharedVotesPlot/MemberSharedVotesPlot';

function MemberView() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [participatedRounds, setParticipatedRounds] = useState([]);

  useEffect(() => {
    const getMember = async () => {
      // Get member info
      const member = await fetchMember(id);
      setMember(member);

      // Get rounds info
      const rounds = await fetchRounds(member.participatedRoundIds);
      rounds.sort((a, b) => { return a.number - b.number });
      setParticipatedRounds(rounds);
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

  if (member === null) return null;

  if (participatedRounds.length === 0) return null;

  const joinDate = DateTime.fromISO(participatedRounds[0].startDate);
  const joinDateStr = joinDate.toLocaleString(DateTime.DATE_FULL);

  const participatedRoundCount = participatedRounds.length;
  const firstRound = participatedRounds[0];
  const latestRound = participatedRounds[participatedRoundCount - 1];

  return (
    <div className={`${styles.MemberView} mt-3`}>
      <MemberHeader member={member} />

      <p>
        {`${member.firstName} joined round #${firstRound.number} on ${joinDateStr} and has participated in ${participatedRoundCount - 1}
        more since—the latest being #${latestRound.number}.`}
      </p>

      <div className="row">
        <div className="col-12">
          <MemberSharedVotesPlot member={member} />
        </div>
      </div>
    </div>
  );
}

export default MemberView;
