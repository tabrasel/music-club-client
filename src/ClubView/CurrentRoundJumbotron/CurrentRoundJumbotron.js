// Import stylesheets
import styles from './CurrentRoundJumbotron.module.css';

// Import packages
import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';

// Import components
import ParticipantsList from '../ParticipantsList/ParticipantsList';

// Import services
import { getAlbumAsync } from '../../services/AlbumService';
import { getMemberAsync } from '../../services/MemberService';
import { getRoundAsync, getRoundsAsync } from '../../services/RoundService';

function CurrentRoundJumbotron({club}) {
  const [hasCurrentRound, setHasCurrentRound] = useState(false);
  const [round, setRound] = useState(null);
  const [rounds, setRounds] = useState([]);
  const [nextRoundNumber, setNextRoundNumber] = useState(1);
  const [participants, setParticipants] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (club === null) return;

    const loadData = async () => {
      let rounds = await getRoundsAsync();
      rounds = rounds.sort((round1, round2) => round1.number - round2.number);
      setRounds(rounds);
      setNextRoundNumber(rounds[rounds.length - 1].number + 1);

      // Fetch current round
      setHasCurrentRound(club.currentRoundId !== null);
      if (!(club.currentRoundId !== null)) return;
      const round = await getRoundAsync(club.currentRoundId);
      setRound(round);

      if (round === null) return;

      // Fetch participants
      const participantPromises = round.participantIds.map((participantId) => getMemberAsync(participantId));
      const participants = await Promise.all(participantPromises);
      participants.sort((a, b) => {
        if (a.lastName < b.lastName) return -1;
        else if (a.lastName > b.lastName) return 1;
        return a.firstName < b.firstName ? -1 : 1;
      });
      setParticipants(participants);

      // Fetch albums
      const albumPromises = round.albumIds.map((albumId) => getAlbumAsync(albumId));
      const albums = await Promise.all(albumPromises);
      setAlbums(albums);
    };

    loadData();
  }, [club]);

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
  const dayNumber = Math.floor(DateTime.now().diff(startDate, 'days').days) + 1;
  const startDateStr = startDate.toLocaleString(DateTime.DATE_FULL);

  return (
    <div className={`${styles.CurrentRoundJumbotron} jumbotron d-flex justify-content-between mb-5`}>
      <div className="d-flex flex-column flex-grow-1 justify-content-between">
        <div>
          <h2 className="m-0" >Now playing</h2>
          <h1 className="m-0">Round {round.number}</h1>
          <p className={styles.roundDate}>{ `Day ${dayNumber} • Started ${startDateStr}` }</p>
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
