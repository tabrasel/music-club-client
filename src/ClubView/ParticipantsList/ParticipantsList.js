// Import stylesheets
import styles from './ParticipantsList.module.css';

// Import components
import { MemberIconMedium } from '../../MemberIcons/MemberIcons';

function ParticipantsList({participants, albums, picksPerParticipant}) {
  return (
    <div className={styles.ParticipantsList}>
      {
        participants.map((participant) => {
          return (
            <MemberIconMedium
              key={participant.id}
              member={participant}
              isLoading={!isFinished(participant, albums, picksPerParticipant)}
              loadingFontColor="white" />
          );
        })
      }
    </div>
  )
}

/**
 * Determines if a participant has submitted all their picks for a round.
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

export default ParticipantsList;
