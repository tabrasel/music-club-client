import styles from './ParticipantsList.module.css';

import ParticipantStatusIcon from '../ParticipantStatusIcon/ParticipantStatusIcon';

function ParticipantsList({participants}) {
  return (
    <div className={styles.ParticipantsList}>
      {
        participants.map((participant) => {
          return (
            <ParticipantStatusIcon key={participant.id} participant={participant} />
          );
        })
      }
    </div>
  )
}

export default ParticipantsList;
