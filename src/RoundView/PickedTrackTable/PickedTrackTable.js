import styles from './PickedTrackTable.module.css';

import PickedTrackTableRow from '../PickedTrackTableRow/PickedTrackTableRow';

function PickedTrackTable({album, participants, showAllTracks}) {
  const visibleTracks = (showAllTracks) ? album.tracks : album.tracks.filter((track) => track.pickerIds.length > 0);

  return (
    <table className={`${styles.PickedTrackTable} table`}>
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
  );
}

export default PickedTrackTable;
