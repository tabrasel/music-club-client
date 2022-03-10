// Import stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './RoundAlbumListItem.module.css';

// Import packages
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

// Import components
import HeartbeatChart from './HeartbeatChart';
import PickedTrackTable from '../PickedTrackTable/PickedTrackTable';

function RoundAlbumListItem({album, participants, votesPerParticipant}) {
  const showPickedTrackTable = album.pickedTracks !== null && album.pickedTracks.length > 0;

  const poster = participants.filter(participant => participant.id === album.posterId)[0];

  const participantsCount = participants.length;
  const pickedTracksCount = album.pickedTracks.length;
  const alignmentScore = (participantsCount * votesPerParticipant - pickedTracksCount) / (participantsCount * votesPerParticipant - votesPerParticipant);
  const alignmentPercentage = Math.floor(alignmentScore * 100);

  return (
    <div className={`${styles.RoundAlbumListItem} row`}>
      <div className="col-sm-4 d-flex flex-column align-items-center">
        <Link to={'/album/' + album.id} style={{textDecoration: 'none'}}>
          <div className={`${styles.postedAlbumIcon} mb-3`} style={{backgroundImage: 'url(' + album.imageUrl + ')'}}>
            <div className={styles.posterIcon} style={{backgroundColor: poster.color}}>
              <p className="m-0">{poster.firstName[0] + poster.lastName[0]}</p>
            </div>
            <div className={styles.iconOverlay}></div>
          </div>
        </Link>

        <Link to={'/album/' + album.id} style={{textDecoration: 'none'}}>
          <h2 className="text-center">{album.title}</h2>
        </Link>

        <h3 className="text-center mb-3">{album.artists.join(', ')}</h3>

        {
          hasAllVotes(album, participants, votesPerParticipant)
          ? <p className="mb-2" title="Vote overlap score. There is 100% overlap if everyone votes for the same songs, and 0% overlap if everyone votes for different songs."><FontAwesomeIcon icon={faHandshake} /> {alignmentPercentage}%</p>
          : <p className={`${styles.missingLabel} mb-2`}>Missing votes</p>
        }

        <div className="mb-4">
          <HeartbeatChart album={album} />
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
  );
}

function hasAllVotes(album, participants, votesPerParticipant) {
  let expectedVoteCount = votesPerParticipant * participants.length;
  let voteCount = 0;
  album.pickedTracks.forEach((pickedTrack) => { voteCount += pickedTrack.pickerIds.length });
  return voteCount === expectedVoteCount;
}

export default RoundAlbumListItem;
