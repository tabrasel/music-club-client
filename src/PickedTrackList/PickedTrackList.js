import styles from './PickedTrackList.module.css';

import PickedTrackListItem from '../PickedTrackListItem/PickedTrackListItem';

function PickedTrackList({album, participants}) {
  const pickedTracks = album.pickedTracks.sort((a, b) => a.trackNumber - b.trackNumber);

  return (
    <div className={`${styles.PickedTrackList} list-group`}>
      {
        pickedTracks.map((pickedTrack) => {
          const pickers = participants.filter((participant) => pickedTrack.pickerIds.includes(participant.id));
          const isTopTrack = pickedTrack.trackNumber === album.topTrackNumber;

          return (
            <PickedTrackListItem
              key={pickedTrack.trackNumber}
              pickedTrack={pickedTrack}
              pickers={pickers}
              isTopTrack={isTopTrack}
            />
          );
        })
      }
    </div>
  );
}

export default PickedTrackList;
