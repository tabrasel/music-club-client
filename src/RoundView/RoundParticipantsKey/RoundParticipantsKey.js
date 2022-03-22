// Import stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './RoundParticipantsKey.module.css';

// Import components
import { MemberIconSmall } from '../../MemberIcons/MemberIcons';

function RoundParticipantsKey({participants}) {
  return (
    <div className={`${styles.RoundParticipantsKey} d-flex flex-column align-items-end`}>
    {
      participants.map((participant) => (
        <div className={`${styles.participantListItem} mb-2`} key={participant.id}>
          <p className={styles.participantName}>{participant.firstName} {participant.lastName}</p>
          <MemberIconSmall member={participant} />
        </div>
      ))
    }
    </div>
  );
}

export default RoundParticipantsKey;
