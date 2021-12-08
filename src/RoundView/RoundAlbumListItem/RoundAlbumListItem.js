import 'bootstrap/dist/css/bootstrap.min.css';
import './RoundAlbumListItem.css';

import PickedTrackTable from '../PickedTrackTable/PickedTrackTable';

function RoundAlbumListItem({album, participants}) {
  const showPickedTrackTable = album.pickedTracks !== null && album.pickedTracks.length > 0;

  const poster = participants.filter(participant => participant.id === album.posterId)[0];

  return (
    <div className="RoundAlbumListItem">
      <div className="row">
        <div className="col-sm-4">
          <div className="d-flex flex-column align-items-center">
            <div className="postedAlbumIcon mb-3" style={{backgroundImage: 'url(' + album.imageUrl + ')'}}>
              <div className="posterIcon" style={{backgroundColor: poster.color}}>
                <p className="m-0">{poster.firstName[0] + poster.lastName[0]}</p>
              </div>
            </div>
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
