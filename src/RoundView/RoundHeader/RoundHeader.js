import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './RoundHeader.module.css'

import { DateTime } from 'luxon';

import RoundParticipantsKey from '../RoundParticipantsKey/RoundParticipantsKey';

function RoundHeader({round, participants}) {
  const startDate = DateTime.fromISO(round.startDate);
  const endDate = DateTime.fromISO(round.endDate);
  const dayNumber = Math.floor(endDate.diff(startDate, 'days').days);

  const startDateStr = startDate.toLocaleString(DateTime.DATE_MED);
  const endDateStr = endDate.toLocaleString(DateTime.DATE_MED);
  const dayNumberStr = (dayNumber === 1) ? '1 day' : dayNumber + ' days';

  return (
    <div className={`${styles.RoundHeader} mt-3`}>
      <div className="d-flex justify-content-between">
        <div>
          <h1 className="m-0">Round {round.number}</h1>
          <h2 className="m-0">{startDateStr} - {endDateStr} ({dayNumberStr})</h2>
        </div>

        <RoundParticipantsKey participants={participants} />
      </div>

      {
        round.description ? <p className={`${styles.roundDescription} mt-4`}>{ round.description}</p> : null
      }
    </div>
  );
}

export default RoundHeader;
