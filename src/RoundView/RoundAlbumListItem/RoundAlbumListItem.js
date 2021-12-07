import 'bootstrap/dist/css/bootstrap.min.css';
import './RoundAlbumListItem.css';

import PickedTrackTable from '../PickedTrackTable/PickedTrackTable';

function RoundAlbumListItem({album, participants}) {
  const showPickedTrackTable = album.pickedTracks !== null && album.pickedTracks.length > 0;

  return (
    <div className="RoundAlbumListItem">
      <div className="row gx-5">
        <div className="col-sm-4">
          <div className="d-flex flex-column align-items-center">
            <img className="mb-3" src={album.imageUrl} alt={album.title + ' image'} />
            <h2 className="text-center">{album.title}</h2>
            <h3 className="text-center">{album.artist}</h3>
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

export default RoundAlbumListItem;
