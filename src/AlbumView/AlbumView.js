import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './AlbumView.module.css';

import { DateTime, Duration } from 'luxon';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AudioFeaturesChart from './AudioFeaturesChart';

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
    <div className={`${styles.AlbumView} mt-3`}>
      <div className="d-flex justify-content-between mb-5">
        <div className="">
          <div className="h-100 d-flex flex-column">
            <div>
              <h1>{album.title}</h1>
              <h2>{album.artists.join(', ')}</h2>
              <p>{releaseDateLabel}  •  {album.tracks.length} tracks</p>
            </div>

            <div className={styles.genreTagList}>
              {
                album.artistGenres.map((genre) => {
                  return (
                    <div className={styles.genreTag}>
                      <p>{genre}</p>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>

        <img className={`${styles.albumImg}`} src={album.imageUrl} />
      </div>

      <table className={`table mb-4`}>
        <thead>
          <tr>
            <th scope="col" style={{width: '5%', textAlign: 'right'}}>#</th>
            <th scope="col">Title</th>
            <th scope="col" style={{textAlign: 'right'}}>Length</th>
          </tr>
        </thead>
        <tbody>
          {
            album.tracks.map((track) => {
              const durationStr = Duration.fromMillis(track.duration).toFormat('m:ss')

              return (
                <tr>
                  <td style={{textAlign: 'right'}}>{track.trackNumber}.</td>
                  <td>{track.title}</td>
                  <td style={{textAlign: 'right'}}>{durationStr}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>

      <div className={styles.chartGallery}>
        <div className={styles.chartArea}>
          <AudioFeaturesChart tracks={album.tracks} features={['valence', 'energy', 'danceability']} colors={['Green', 'Red', 'Magenta']} title={'Mood'} />
        </div>

        <div className={styles.chartArea}>
          <AudioFeaturesChart tracks={album.tracks} features={['speechiness', 'instrumentalness']} colors={['DodgerBlue', 'DarkOrange']} title={'Properties'} />
        </div>

        <div className={styles.chartArea}>
          <AudioFeaturesChart tracks={album.tracks} features={['acousticness', 'liveness']} colors={['Sienna', 'Teal']} title={'Context'} />
        </div>
      </div>
    </div>
  );
}

export default AlbumView;
