import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './MemberView.module.css';

import { DateTime } from 'luxon';

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
  }, []);

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

  return (
    <div className={`${styles.MemberView} mt-3`}>
      <h1>{member.firstName} {member.lastName}</h1>

      <p>
        {`Joined for round #${firstRound.number} on ${joinDateStr}. Has participated in ${participatedRoundCount} rounds
        so far—the latest being #${latestRound.number}.`}
      </p>

      <p>
        # votes shared with other club members:
      </p>

      <ol>
        {
          memberMatches.map((memberMatch) => {
            const member = memberMatch.member;
            return (
              <li key={member.id}>{`${member.firstName} ${member.lastName} - ${memberMatch.matchCount}`}</li>
            );
          })
        }
      </ol>
    </div>
  );
}

export default MemberView;
