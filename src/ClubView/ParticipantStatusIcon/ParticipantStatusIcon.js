import styles from './ParticipantStatusIcon.module.css';

function ParticipantStatusIcon({participant}) {

  // TODO: Test if the participant has the required number of votes for each album in the round
  const isFinished = false;

  return (
    <div className={styles.ParticipantStatusIcon}>
      <div className={styles.spinner} style={{borderTopColor: participant.color, borderRightColor: participant.color, borderBottomColor: participant.color}}></div>

      <div className={styles.icon} style={{backgroundColor: participant.color}}>
        <p>{participant.firstName[0] + participant.lastName[0]}</p>
      </div>
    </div>
  );
}

export default ParticipantStatusIcon;
