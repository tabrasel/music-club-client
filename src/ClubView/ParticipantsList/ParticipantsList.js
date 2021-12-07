import styles from './ParticipantsList.module.css';

import ParticipantStatusIcon from '../ParticipantStatusIcon/ParticipantStatusIcon';

function ParticipantsList({participants, albums, picksPerParticipant}) {
  return (
    <div className={styles.ParticipantsList}>
      {
        participants.map((participant) => {
          return (
            <ParticipantStatusIcon
              key={participant.id}
              participant={participant}
              albums={albums}
              picksPerParticipant={picksPerParticipant} />
          );
        })
      }
    </div>
  )
}

export default ParticipantsList;
