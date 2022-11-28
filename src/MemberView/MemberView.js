// Import styles
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './MemberView.module.css';

// Import packages
import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Import components
import MemberHeader from './MemberHeader/MemberHeader';
import MemberSharedVotesPlot from './MemberSharedVotesPlot/MemberSharedVotesPlot';
import MemberGenresChart from './MemberGenresChart/MemberGenresChart';
import MemberReleaseChart from './MemberReleaseChart/MemberReleaseChart';

// Import services
import { getRoundAsync } from '../services/RoundService';
import { getMemberAsync } from '../services/MemberService';

function MemberView() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [participatedRounds, setParticipatedRounds] = useState([]);
  const [joinDateStr, setJoinDateStr] = useState('');

  useEffect(() => {
    const loadMemberData = async () => {
      // Get member info
      const member = await getMemberAsync(id);
      setMember(member);

      // Get round info
      const rounds = await fetchRounds(member.participatedRoundIds);
      rounds.sort((a, b) => { return a.number - b.number });
      setParticipatedRounds(rounds);

      const joinDate = DateTime.fromISO(rounds[0].startDate);
      setJoinDateStr(joinDate.toLocaleString(DateTime.DATE_FULL));
    };

    loadMemberData();
  }, [id]);

  const fetchRounds = async (roundIds) => {
    const roundPromises = roundIds.map((roundId) => getRoundAsync(roundId));
    const rounds = await Promise.all(roundPromises);
    return rounds;
  };

  const memberDescriptionSkeleton = (<p>Loading...</p>);

  return (
    <div className={`${styles.MemberView} mt-3`}>
      <MemberHeader member={member} />

      <div className='d-flex'>
        {
          (member === null || participatedRounds.length === 0) ? memberDescriptionSkeleton :
          <p>
            {
              `${member.firstName} joined round #${participatedRounds[0].number} on ${joinDateStr} and has participated in ${participatedRounds.length - 1} more since—the latest being #${participatedRounds[participatedRounds.length - 1].number}.`
            }
          </p>
        }
      </div>

      <div className={styles.chartGallery}>
        <div className={styles.chartArea}>
          <div>
            <h1 className="mb-3">Posted Genres</h1>
            <MemberGenresChart member={member} />
          </div>
        </div>

        <div className={styles.chartArea}>
          <div>
            <h1 className="mb-3">Posted Albums By Decade</h1>
            <MemberReleaseChart member={member} />
          </div>
        </div>

        <div className={styles.chartArea}>
          <div>
            <h1 className="mb-3">Shared Votes</h1>
            <MemberSharedVotesPlot member={member} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberView;
