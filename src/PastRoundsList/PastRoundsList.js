import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from 'react';

import RoundListItem from '../RoundListItem/RoundListItem.js';
import Spinner from '../Spinner/Spinner.js';

function PastRoundsList() {

  const [roundListItemsData, setRoundListItemsData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getRounds = async () => {
      const rounds = await fetchRounds();

      let tempListItems = [];

      for (let round of rounds) {
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
    getRounds();
  }, []);

  const fetchRounds = async () => {
    const res = await fetch('https://tb-music-club.herokuapp.com/api/rounds');
    const rounds = await res.json();
    return rounds;
  };

  return (
    <div className="RoundList">
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
