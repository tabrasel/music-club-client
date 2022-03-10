import styles from './ParticipantStatusIcon.module.css';

function ParticipantStatusIcon({participant, albums, picksPerParticipant}) {
  const unfinishedIcon = (
    <div className={styles.unfinishedIcon}>
      <div className={styles.spinner} style={{'--c': participant.color}}></div>
      <p>{participant.firstName[0] + participant.lastName[0]}</p>
    </div>
  );

  const finishedIcon = (
    <div className={styles.finishedIcon} style={{backgroundColor: participant.color}}>
      <p>{participant.firstName[0] + participant.lastName[0]}</p>
    </div>
  );

  return (
    <div className={styles.ParticipantStatusIcon}>
      {
        isFinished(participant, albums, picksPerParticipant) ? finishedIcon : unfinishedIcon
      }
    </div>
  );
}

/**
 * Determine if a participant has submitted all their picks for a round.
 * @param participant         the participant to check on
 * @param albums              the albums in the round
 * @param votesPerParticipant the number of votes each participant can submit per album for the round
 */
function isFinished(participant, albums, votesPerParticipant) {
  for (let album of albums) {
    const participantPicks = album.tracks.filter((track) => track.pickerIds.includes(participant.id));
    if (participantPicks.length !== votesPerParticipant)
      return false;
  }

  return true;
}

export default ParticipantStatusIcon;
