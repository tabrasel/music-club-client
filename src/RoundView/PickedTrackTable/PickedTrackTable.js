import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './PickedTrackTable.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

import PickedTrackTableRow from '../PickedTrackTableRow/PickedTrackTableRow';

function PickedTrackTable({album, participants}) {
  const [showAllTracks, setShowAllTracks] = useState(false);

  const visibleTracks = showAllTracks ? album.tracks : album.tracks.filter((track) => track.pickerIds.length > 0);

  function toggleShowAllTracks() {
    setShowAllTracks(!showAllTracks);
  }

  return (
    <div>
      <table className={`${styles.PickedTrackTable} table mb-0`}>
        <thead className="table-dark">
          <tr>
            <th scope="col" style={{width: '5%', textAlign: 'right'}}>#</th>
            <th scope="col">Title</th>
            <th scope="col" style={{width: '25%', textAlign: 'right'}}>Votes</th>
          </tr>
        </thead>
        <tbody>
          {
            visibleTracks.map((track) => {
              const pickers = participants.filter((participant) => track.pickerIds.includes(participant.id));
              const isTopTrack = track.diskNumber === album.topDiskNumber && track.trackNumber === album.topTrackNumber;

              return (
                <PickedTrackTableRow
                  key={`${track.diskNumber}.${track.trackNumber}`}
                  pickedTrack={track}
                  pickers={pickers}
                  isTopTrack={isTopTrack}
                />
              );
            })
          }
        </tbody>
      </table>

      <div className="d-flex justify-content-center mb-2">
        <button className={styles.tracksToggleButton} onClick={toggleShowAllTracks}>
          <p>
            {
              showAllTracks
              ? <FontAwesomeIcon icon={faChevronUp} />
              : <FontAwesomeIcon icon={faChevronDown} />
            }
          </p>
        </button>
      </div>
    </div>
  );
}

export default PickedTrackTable;
