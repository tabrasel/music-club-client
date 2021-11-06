import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './PastRoundsList.module.css';

import { useState, useEffect } from 'react';

import RoundListItem from '../RoundListItem/RoundListItem.js';
import Spinner from '../../Spinner/Spinner.js';

function PastRoundsList() {

  const [roundListItemsData, setRoundListItemsData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getPastRounds = async () => {
      // Get club info
      const club = await fetchClub('04d9a851-61a1-476a-bc87-a3a30fc6a353');

      const rounds = await fetchRounds();

      let tempListItems = [];

      for (let round of rounds) {
        // Skip the current round
        if (round.id === club.currentRoundId) continue;

        // Get albums
        const albumPromises = round.albumIds.map((albumId) => {
          return fetch('https://tb-music-club.herokuapp.com/api/album?id=' + albumId)
            .then(response => response.json());
        });
        const albums = await Promise.all(albumPromises);

        // Get participants
        /*
        const participantPromises = round.participantIds.map((participantId) => {
          return fetch('https://tb-music-club.herokuapp.com/api/member?id=' + participantId)
            .then(response => response.json());
        });
        const participants = await Promise.all(participantPromises);
        */
        const participants = [];

        const roundListItemData = {
          round: round,
          participants: participants,
          albums: albums
        };

        tempListItems.push(roundListItemData);
      }

      tempListItems.sort((a, b) => {
        return b.round.number - a.round.number;
      });

      setIsLoaded(true);
      setRoundListItemsData(tempListItems);
    };
    getPastRounds();
  }, []);

  const fetchClub = async (id) => {
    const res = await fetch('https://tb-music-club.herokuapp.com/api/club?id=' + id);
    const club = await res.json();
    return club;
  };

  const fetchRounds = async () => {
    const res = await fetch('https://tb-music-club.herokuapp.com/api/rounds');
    const rounds = await res.json();
    return rounds;
  };

  return (
    <div className={`${styles.PastRoundsList} d-flex flex-column align-items-center`}>
      <h2 className="mb-2">Past Rounds</h2>
      <div className="d-flex justify-content-center flex-wrap">
        {
          !isLoaded
          ? <Spinner />
          : roundListItemsData.map((itemData) =>
            <RoundListItem
              key={itemData.round.id}
              round={itemData.round}
              albums={itemData.albums}
              participants={itemData.participants}
            />
          )
        }
      </div>
    </div>
  );
}

export default PastRoundsList;
