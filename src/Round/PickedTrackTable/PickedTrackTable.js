import styles from './PickedTrackTable.module.css';

import PickedTrackTableRow from '../PickedTrackTableRow/PickedTrackTableRow';

function PickedTrackTable({album, participants}) {
  const pickedTracks = album.pickedTracks.sort((a, b) => a.trackNumber - b.trackNumber);

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
          pickedTracks.map((pickedTrack) => {
            const pickers = participants.filter((participant) => pickedTrack.pickerIds.includes(participant.id));
            const isTopTrack = pickedTrack.trackNumber === album.topTrackNumber;

            return (
              <PickedTrackTableRow
                key={pickedTrack.trackNumber}
                pickedTrack={pickedTrack}
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
