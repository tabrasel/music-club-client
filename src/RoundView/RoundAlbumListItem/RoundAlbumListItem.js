import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './RoundAlbumListItem.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';

import PickedTrackTable from '../PickedTrackTable/PickedTrackTable';

function RoundAlbumListItem({album, participants, votesPerParticipant}) {
  const showPickedTrackTable = album.pickedTracks !== null && album.pickedTracks.length > 0;

  const poster = participants.filter(participant => participant.id === album.posterId)[0];

  const participantsCount = participants.length;
  const pickedTracksCount = album.pickedTracks.length;
  const alignmentScore = (participantsCount * votesPerParticipant - pickedTracksCount) / (participantsCount * votesPerParticipant - votesPerParticipant);
  const alignmentPercentage = Math.floor(alignmentScore * 100);

  return (
    <div className={styles.RoundAlbumListItem}>
      <div className="row">
        <div className="col-sm-4">
          <div className="d-flex flex-column align-items-center">
            <div className={`${styles.postedAlbumIcon} mb-3`} style={{backgroundImage: 'url(' + album.imageUrl + ')'}}>
              <div className={styles.posterIcon} style={{backgroundColor: poster.color}}>
                <p className="m-0">{poster.firstName[0] + poster.lastName[0]}</p>
              </div>
            </div>
            <h2 className="text-center">{album.title}</h2>
            <h3 className="text-center mb-4">{album.artists.join(', ')}</h3>
            <div className="d-flex justify-content-between">
              {
                hasAllVotes(album, participants, votesPerParticipant)
                ? <p title="Vote overlap score. There is 100% overlap if everyone votes for the same songs, and 0% overlap if everyone votes for different songs."><FontAwesomeIcon icon={faHandshake} /> {alignmentPercentage}%</p>
                : <p className={styles.missingLabel}>Missing votes</p>
              }
            </div>
          </div>
        </div>

        <div className="col-sm-8">
          {
            showPickedTrackTable
            ? <PickedTrackTable
                album={album}
                participants={participants} />
            : <p>Picks not posted</p>
          }
        </div>
      </div>
    </div>
  );
}

function hasAllVotes(album, participants, votesPerParticipant) {
  let expectedVoteCount = votesPerParticipant * participants.length;
  let voteCount = 0;
  album.pickedTracks.forEach((pickedTrack) => { voteCount += pickedTrack.pickerIds.length });
  return voteCount === expectedVoteCount;
}

export default RoundAlbumListItem;
