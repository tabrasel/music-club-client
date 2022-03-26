// Import stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './RoundAlbumListItem.module.css';

// Import components
import { MemberIconSmall } from '../../MemberIcons/MemberIcons';

function MissingVotesInfo({ unfinishedParticipants }) {
  return (
    <div>
      <p className={`${styles.missingLabel} mb-2`}>Missing votes</p>

      <div className="d-flex justify-content-center">
      {
        unfinishedParticipants.map((unfinishedParticipant) => {
          return (
            <MemberIconSmall
              key={unfinishedParticipant.participant.id}
              member={unfinishedParticipant.participant}
              isLoading={true}
              defaultFontColor={unfinishedParticipant.participant.color}
              loadingFontColor={'black'} />
          );
        })
      }
      </div>
    </div>
  );
}

export default MissingVotesInfo;
