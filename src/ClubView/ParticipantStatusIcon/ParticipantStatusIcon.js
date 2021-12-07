import styles from './ParticipantStatusIcon.module.css';

function ParticipantStatusIcon({participant, albums, picksPerParticipant}) {
  // Determine if the participant has submitted all their picks for the round
  const isFinished = testIsFinished(participant, albums, picksPerParticipant);

  return (
    <div className={styles.ParticipantStatusIcon}>
      {
        isFinished
        ? null
        : <div className={styles.spinner} style={{borderTopColor: participant.color, borderRightColor: participant.color, borderBottomColor: participant.color}}></div>
      }

      <div className={styles.icon} style={{backgroundColor: participant.color}}>
        <p>{participant.firstName[0] + participant.lastName[0]}</p>
      </div>
    </div>
  );
}

function testIsFinished(participant, albums, votesPerParticipant) {
  for (let album of albums) {
    const participantPicks = album.pickedTracks.filter(pickedTrack => {
      return pickedTrack.pickerIds.includes(participant.id);
    });

    if (participantPicks.length < votesPerParticipant)
      return false;
  }

  return true;
}

export default ParticipantStatusIcon;
