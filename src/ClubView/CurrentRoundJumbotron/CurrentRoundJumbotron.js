// Import stylesheets
import styles from './CurrentRoundJumbotron.module.css';

// Import packages
import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import components
import ParticipantsList from '../ParticipantsList/ParticipantsList';

function CurrentRoundJumbotron({club}) {
  const [hasCurrentRound, setHasCurrentRound] = useState(false);
  const [round, setRound] = useState(null);
  const [rounds, setRounds] = useState([]);
  const [nextRoundNumber, setNextRoundNumber] = useState(1);
  const [participants, setParticipants] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      let rounds = await fetchRounds();
      rounds = rounds.sort((round1, round2) => round1.number - round2.number);
      setRounds(rounds);
      setNextRoundNumber(rounds[rounds.length - 1].number + 1);

      // Fetch current round
      setHasCurrentRound(club.currentRoundId !== null);
      if (!(club.currentRoundId !== null)) return;
      const round = await fetchRound(club.currentRoundId);
      setRound(round);

      if (round === null) return;

      // Fetch participants
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

      // Fetch albums
      const albumPromises = round.albumIds.map((albumId) => {
        return fetch('https://tb-music-club.herokuapp.com/api/album?id=' + albumId)
          .then(response => response.json());
      });
      const albums = await Promise.all(albumPromises);
      setAlbums(albums);
    };

    if (club === null) return;
    loadData();
  }, [club]);

  const fetchRound = async (id) => {
    const res = await fetch('https://tb-music-club.herokuapp.com/api/round?id=' + id);
    const round = await res.json();
    return round;
  };

  const fetchRounds = async () => {
    const res = await fetch('https://tb-music-club.herokuapp.com/api/rounds');
    const rounds = await res.json();
    return rounds;
  };

  // Display loading skeleton
  if (club === null) {
    return (
      <div className={`${styles.CurrentRoundJumbotron} jumbotron mb-5`} style={{ backgroundColor: '#f3f3f3' }}>
        <div className={styles.currentRoundThumbnail}></div>
      </div>
    );
  }

  // Display upcoming round jumbotron
  if (!hasCurrentRound && rounds.length > 0) {
    const lastRoundEndDate = rounds[rounds.length - 1].endDate;
    const endDate = DateTime.fromISO(lastRoundEndDate);
    const daysSinceCount = Math.floor(DateTime.now().diff(endDate, 'days').days);
    const daysSinceStr = `${daysSinceCount} ${daysSinceCount === 1 ? 'day' : 'days'} since the last round`

    return (
      <div className={`${styles.CurrentRoundJumbotron} jumbotron mb-5`}>
        <div className="d-flex flex-column flex-grow-1 justify-content-between">
          <div>
            <h2 className="m-0" >Coming up</h2>
            <h1 className="m-0">Round {nextRoundNumber}</h1>
            <p className={styles.roundDate}>{daysSinceStr}</p>
          </div>
        </div>
      </div>
    );
  }

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
          <h2 className="m-0" >Now playing</h2>
          <h1 className="m-0">Round {round.number}</h1>
          <p className={styles.roundDate}>{ 'Day ' + dayNumber + ' since ' + startDateStr }</p>
        </div>

        <ParticipantsList
          participants={participants}
          albums={albums}
          picksPerParticipant={round.picksPerParticipant} />
      </div>

      <Link to={'/round/' + round.id} style={{ textDecoration: 'none' }}>
        <div className={styles.currentRoundThumbnail} style={{backgroundImage: 'url(' + thumbnailUrl + ')'}}></div>
      </Link>
    </div>
  );
}

export default CurrentRoundJumbotron;
