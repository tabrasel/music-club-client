import 'bootstrap/dist/css/bootstrap.min.css';
import './RoundAlbumListItem.css';

import PickedTrackListItem from '../PickedTrackListItem/PickedTrackListItem.js';

function RoundAlbumListItem({album, participantsMap}) {

  const pickedTracks = album.pickedTracks.sort((a, b) => a.trackNumber - b.trackNumber);
  console.log(album);

  return (
    <div className="RoundAlbumListItem mb-5">
      <div className="row">
        <div className="col-4">
          <div className="d-flex flex-column align-items-center">
            <img className="mb-3" src={album.imageUrl} alt={album.title + ' image'} />
            <h2 className="text-center">{album.title}</h2>
            <h3 className="text-center">{album.artist}</h3>
          </div>
        </div>

        <div className="col">
          <div className="list-group">
            {
              pickedTracks.map((pickedTrack) => (
                <PickedTrackListItem pickedTrack={pickedTrack} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoundAlbumListItem;
