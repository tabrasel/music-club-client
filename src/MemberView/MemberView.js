import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './MemberView.module.css';

import { DateTime } from 'luxon';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MemberHeader from './MemberHeader/MemberHeader';
import MemberSharedVotesPlot from './MemberSharedVotesPlot/MemberSharedVotesPlot';
import MemberGenresChart from './MemberGenresChart/MemberGenresChart';
import MemberReleaseChart from './MemberReleaseChart/MemberReleaseChart';

function MemberView() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [participatedRounds, setParticipatedRounds] = useState([]);
  const [joinDateStr, setJoinDateStr] = useState('');

  useEffect(() => {
    const getMember = async () => {
      // Get member info
      const member = await fetchMember(id);
      setMember(member);

      // Get rounds info
      const rounds = await fetchRounds(member.participatedRoundIds);
      rounds.sort((a, b) => { return a.number - b.number });
      setParticipatedRounds(rounds);

      const joinDate = DateTime.fromISO(rounds[0].startDate);
      setJoinDateStr(joinDate.toLocaleString(DateTime.DATE_FULL));
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

  const memberDescriptionSkeleton = (<p>Loading...</p>);

  return (
    <div className={`${styles.MemberView} mt-3`}>
      <MemberHeader member={member} />

      {
        (member === null || participatedRounds.length === 0) ? memberDescriptionSkeleton :
        <p>
          {
            `${member.firstName} joined round #${participatedRounds[0].number} on ${joinDateStr} and has participated in ${participatedRounds.length - 1} more since—the latest being #${participatedRounds[participatedRounds.length - 1].number}.`
          }
        </p>
      }

      <div className={styles.chartGallery}>
        <div className={styles.chartArea}>
          <MemberSharedVotesPlot member={member} />
        </div>

        <div className={styles.chartArea}>
          <MemberReleaseChart member={member} />
        </div>

        <div className={styles.chartArea}>
          <MemberGenresChart member={member} />
        </div>
      </div>
    </div>
  );
}

export default MemberView;
