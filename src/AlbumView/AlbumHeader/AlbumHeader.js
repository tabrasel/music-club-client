import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './AlbumHeader.module.css';

import { DateTime } from 'luxon';

function AlbumHeader({album}) {
  if (album === null) return null;

  const releaseYear = DateTime.fromISO(album.releaseDate).year;

  return (
    <div className={`${styles.AlbumHeader} mb-5`}>
      <div>
        <div className={styles.albumInfo}>
          <div>
            <h1>{album.title}</h1>
            <h2 className="mb-5">{album.artists.join(', ')}</h2>
          </div>

          <div className={styles.albumMetadata}>
            <p className="mb-2">{releaseYear}  •  {album.tracks.length} tracks</p>

            <div className={styles.genreTagList}>
              {
                album.artistGenres.map((genre) => {
                  return (
                    <div className={styles.genreTag} key={genre}>
                      <p>{genre}</p>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>

      <div className={styles.albumImgContainer}>
        <img className={`${styles.albumImg}`} src={album.imageUrl} alt="Album cover art" />
      </div>
    </div>
  );
}

export default AlbumHeader;
