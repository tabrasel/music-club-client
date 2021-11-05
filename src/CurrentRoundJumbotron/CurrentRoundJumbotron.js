import styles from './CurrentRoundJumbotron.module.css';

import { useState, useEffect } from 'react';

import RoundIcon from '../RoundIcon/RoundIcon';

function CurrentRoundJumbotron() {

  const [round, setRound] = useState(null);
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    const getRound = async () => {
      // Get club info
      const club = await fetchClub('04d9a851-61a1-476a-bc87-a3a30fc6a353');

      // Get round info
      const round = await fetchRound(club.currentRoundId);
      setRound(round);

      // Get albums
      const albumPromises = round.albumIds.map((albumId) => {
        return fetch('https://tb-music-club.herokuapp.com/api/album?id=' + albumId)
          .then(response => response.json());
      });
      const albums = await Promise.all(albumPromises);
      setAlbums(albums);

      /*
      // Get participant info
      const participants = await fetchParticipants(round);
      participants.sort((a, b) => {
        if (a.lastName < b.lastName)
          return -1;
        else if (a.lastName > b.lastName)
          return 1;
        return a.firstName < b.firstName ? -1 : 1;
      });
      setParticipants(participants);

      // Get album info
      const albums = await fetchAlbums(round);
      setAlbums(albums);
      */
    };

    getRound();
  }, []);

  const fetchClub = async (id) => {
    const res = await fetch('https://tb-music-club.herokuapp.com/api/club?id=' + id);
    const club = await res.json();
    return club;
  };

  const fetchRound = async (id) => {
    const res = await fetch('https://tb-music-club.herokuapp.com/api/round?id=' + id);
    const round = await res.json();
    return round;
  };

  if (round === null) return null;

  return (
    <div className={`${styles.CurrentRoundJumbotron} jumbotron d-flex justify-content-between mb-5 p-4`}>
      <div>
        <h2 className="m-0">Now playing</h2>
        <h1>Round {round.number}</h1>
      </div>

      <div className={styles.currentRoundIcon}>
        <RoundIcon round={round} albums={albums} />
      </div>
    </div>
  );
}

export default CurrentRoundJumbotron;
