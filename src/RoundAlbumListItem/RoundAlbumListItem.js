import 'bootstrap/dist/css/bootstrap.min.css';
import './RoundAlbumListItem.css';

import PickedTrackListItem from '../PickedTrackListItem/PickedTrackListItem.js';

function RoundAlbumListItem({album, participants}) {

  const pickedTracks = album.pickedTracks.sort((a, b) => a.trackNumber - b.trackNumber);

  return (
    <div className="RoundAlbumListItem mb-5">
      <div className="row gx-5 ">
        <div className="col-sm-4">
          <div className="d-flex flex-column align-items-center">
            <img className="mb-3" src={album.imageUrl} alt={album.title + ' image'} />
            <h2 className="text-center">{album.title}</h2>
            <h3 className="mb-4 text-center">{album.artist}</h3>
          </div>
        </div>

        <div className="col-sm-8">
          <div className="list-group">
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
        </div>
      </div>
    </div>
  );
}

export default RoundAlbumListItem;
