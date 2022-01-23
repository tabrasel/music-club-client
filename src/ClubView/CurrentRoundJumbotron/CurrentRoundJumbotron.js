import styles from './CurrentRoundJumbotron.module.css';

import { useState, useEffect } from 'react';

import { DateTime } from 'luxon';

import ParticipantsList from '../ParticipantsList/ParticipantsList';

function CurrentRoundJumbotron() {

  const [round, setRound] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      // Get club info
      const club = await fetchClub('04d9a851-61a1-476a-bc87-a3a30fc6a353');

      // Fetch round info
      const round = await fetchRound(club.currentRoundId);
      setRound(round);

      if (round === null) return;

      // Fetch participant info
      const participantPromises = round.participantIds.map((participantId) => {
        return fetch('https://tb-music-club.herokuapp.com/api/member?id=' + participantId)
          .then(response => response.json());
      });
      const participants = await Promise.all(participantPromises);
      participants.sort((a, b) => {
        if (a.lastName < b.lastName)
          return -1;
        else if (a.lastName > b.lastName)
          return 1;
        return a.firstName < b.firstName ? -1 : 1;
      });
      setParticipants(participants);

      // Fetch album info
      const albumPromises = round.albumIds.map((albumId) => {
        return fetch('https://tb-music-club.herokuapp.com/api/album?id=' + albumId)
          .then(response => response.json());
      });
      const albums = await Promise.all(albumPromises);
      setAlbums(albums);
    };

    loadData();
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

  if (round === null) {
    return (
      <div className={`${styles.CurrentRoundJumbotron} jumbotron mb-5`} style={{ backgroundColor: '#f3f3f3' }}>
        <div className={styles.currentRoundThumbnail}></div>
      </div>
    );
  };

  const thumbnailUrl = 'https://tb-music-club.s3.us-west-2.amazonaws.com/round_thumbnails/' + round.id + '.jpeg';

  const startDate = DateTime.fromISO(round.startDate);
  const dayNumber = Math.floor(DateTime.now().diff(startDate, 'days').days);
  const startDateStr = startDate.toLocaleString(DateTime.DATE_FULL);

  return (
    <div className={`${styles.CurrentRoundJumbotron} jumbotron d-flex justify-content-between mb-5`}>
      <div className="d-flex flex-column flex-grow-1 justify-content-between">
        <div>
          <h2 className="m-0">Now playing</h2>
          <h1 className="m-0">Round {round.number}</h1>
          <p className={styles.roundDate}>{ 'Day ' + dayNumber + ' since ' + startDateStr }</p>
        </div>

        <ParticipantsList
          participants={participants}
          albums={albums}
          picksPerParticipant={round.picksPerParticipant} />
      </div>

      <div className={styles.currentRoundThumbnail} style={{backgroundImage: 'url(' + thumbnailUrl + ')'}}></div>
    </div>
  );
}

export default CurrentRoundJumbotron;
