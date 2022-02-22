import 'bootstrap/dist/css/bootstrap.min.css';

import { DateTime } from 'luxon';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AlbumView() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [releaseDateLabel, setReleaseDateLabel] = useState('');

  useEffect(() => {
    const getAlbum = async () => {
      const albumRes = await fetch('https://tb-music-club.herokuapp.com/api/album?id=' + id);
      const album = await albumRes.json();
      const releaseDate = DateTime.fromISO(album.releaseDate);
      setReleaseDateLabel(releaseDate.toLocaleString(DateTime.DATE_FULL));
      setAlbum(album);
    };
    getAlbum();
  }, [id]);

  if (album === null) return null;

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>
          <h1>{album.title}</h1>
          <h2>{album.artists.join(', ')}</h2>
          <p>{releaseDateLabel}  •  {album.tracks.length} tracks</p>
        </div>
        <img src={album.imageUrl} />
      </div>
    </div>
  );
}

export default AlbumView;
