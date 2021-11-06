import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './RoundParticipantsKey.module.css';

import MemberIcon from '../../MemberIcon/MemberIcon';

function RoundParticipantsKey({participants}) {
  return (
    <div className={`${styles.RoundParticipantsKey} d-flex flex-column align-items-end`}>
    {
      participants.map((participant) => (
        <div className="d-flex align-items-center mb-2" key={participant.id}>
          <p className="my-0 mx-2">{participant.firstName} {participant.lastName}</p>
          <MemberIcon member={participant} />
        </div>
      ))
    }
    </div>
  );
}

export default RoundParticipantsKey;
