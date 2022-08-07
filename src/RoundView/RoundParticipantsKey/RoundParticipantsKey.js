// Import stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './RoundParticipantsKey.module.css';

// Import components
import { MemberIconMedium } from '../../MemberIcons/MemberIcons';

function RoundParticipantsKey({participants}) {
  return (
    <div className={styles.RoundParticipantsKey}>
      <h2>Participants</h2>

      <div className={styles.participantsList}>
        {
          participants.map((participant) => (
            <div className={`${styles.participantListItem}`} key={participant.id}>
              <MemberIconMedium member={participant} />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default RoundParticipantsKey;
