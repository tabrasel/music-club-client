// Import stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './RoundAlbumListItem.module.css';

// Import packages
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

// Import components
import HeartbeatChart from './HeartbeatChart';
import { MemberIconMedium } from '../../MemberIcons/MemberIcons';
import MissingVotesInfo from './MissingVotesInfo'
import PickedTrackTable from '../PickedTrackTable/PickedTrackTable';


function RoundAlbumListItem({ album, participants, votesPerParticipant }) {
  const showPickedTrackTable = album.tracks !== null && album.tracks.length > 0;

  const poster = participants.filter(participant => participant.id === album.posterId)[0];

  const participantsCount = participants.length;
  const pickedTracksCount = album.tracks.filter((track) => track.pickerIds.length > 0).length;
  const alignmentScore = (participantsCount * votesPerParticipant - pickedTracksCount) / (participantsCount * votesPerParticipant - votesPerParticipant);
  const alignmentPercentage = Math.floor(alignmentScore * 100);

  const participantVotes = createParticipantVotes(participants, album.tracks);
  const unfinishedParticipants = participantVotes.filter((participantVotes) => participantVotes.votes.length === 0);
  const isComplete = unfinishedParticipants.length === 0;

  return (
    <div className={`${styles.RoundAlbumListItem} row`}>
      <div className={`${styles.albumInfoArea} col-lg-4`}>
        <div className="d-flex flex-column align-items-center">
          <div className={`${styles.posterHeader} d-flex align-items-center mb-3`}>
            <MemberIconMedium key={poster.id} member={poster} />
            <p className="m-0">posted</p>
          </div>

          <Link to={'/album/' + album.id} style={{textDecoration: 'none'}}>
            <img className={`${styles.postedAlbumImg}`} src={album.imageUrl} alt={`${album.title} cover art`} />
          </Link>
        </div>

        <div className="flex-grow-1">
          <div className={styles.albumDescription}>
            <Link to={'/album/' + album.id} style={{textDecoration: 'none'}}>
              <h2 className="text-center">{album.title}</h2>
            </Link>

            <h3 className="text-center mb-2">{album.artists.join(', ')}</h3>

            <div className={`${styles.albumStatsArea} mb-0`}>
              {
                isComplete
                ? <div className="m-0"><HeartbeatChart album={album} title="Hello" /></div>
                : null
              }

              {
                isComplete
                ? <p className="m-0" title="Vote overlap score. There is 100% overlap if everyone votes for the same songs, and 0% overlap if everyone votes for different songs."><FontAwesomeIcon icon={faHandshake} /> {alignmentPercentage}%</p>
                : <MissingVotesInfo unfinishedParticipants={unfinishedParticipants}/>
              }
            </div>
          </div>
        </div>

      </div>

      <div className="col-lg-8">
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

/**
 * Creates am array of (participant, voted tracks) pairs.
 * @param participants array of participants
 * @param tracks       array of tracks
 */
function createParticipantVotes(participants, tracks) {
  // Create a map from each participant to their voted tracks
  const participantVotesMap = {};
  for (let track of tracks) {
    for (let voterId of track.pickerIds) {
      if (!(voterId in participantVotesMap))
        participantVotesMap[voterId] = [];
      participantVotesMap[voterId].push(track);
    }
  }

  // Create a list of mappings from each participant to the tracks they voted for
  const participantVotes = participants.map((participant) => {
    const votes = (participant.id in participantVotesMap) ? participantVotesMap[participant.id] : [];
    return { participant, votes };
  });

  return participantVotes;
}

export default RoundAlbumListItem;

/*

*/
