import RoundAlbumListItem from '../RoundAlbumListItem/RoundAlbumListItem';

function AlbumList({albums, participants}) {
  return (
    <div>
    {
      albums.map((album) => (
        <RoundAlbumListItem album={album} participants={participants} key={album.id}/>
      ))
    }
    </div>
  );
}

export default AlbumList;
