import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './RoundHeader.module.css'

import RoundParticipantsKey from '../RoundParticipantsKey/RoundParticipantsKey';

function RoundHeader({round, participants}) {
  return (
    <div className={`${styles.RoundHeader} mt-3 d-flex justify-content-between`}>
      <div>
        <h1 className="m-0">Round {round.number}</h1>
        <h2 className="m-0">{round.startDate} to {round.endDate}</h2>
        {
          round.description ? <p className="mt-4">{ round.description}</p> : null
        }
      </div>

      <RoundParticipantsKey participants={participants} />
    </div>
  );
}

export default RoundHeader;
