import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './AlbumView.module.css';

import { Duration } from 'luxon';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AlbumHeader from './AlbumHeader/AlbumHeader';
import AudioFeaturesChart from './AudioFeaturesChart';

function AlbumView() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const getAlbum = async () => {
      const albumRes = await fetch('https://tb-music-club.herokuapp.com/api/album?id=' + id);
      const album = await albumRes.json();
      setAlbum(album);
    };
    getAlbum();
  }, [id]);

  if (album === null) return null;

  return (
    <div className={`${styles.AlbumView} mt-3`}>
      <AlbumHeader album={album} />

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
                <tr key={track.trackNumber}>
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
