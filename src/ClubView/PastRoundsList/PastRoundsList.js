// Import styles
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './PastRoundsList.module.css';

// Import packages
import { useState, useEffect } from 'react';

// Import components
import RoundListItem from '../RoundListItem/RoundListItem.js';
import Spinner from '../../Spinner/Spinner.js';

// Import services
import { getClubAsync } from '../../services/ClubService';
import { getRoundsAsync } from '../../services/RoundService';

function PastRoundsList() {
  const [roundListItemsData, setRoundListItemsData] = useState([]);
  const [isDoneLoading, setIsDoneLoading] = useState(false);

  useEffect(() => {
    const getPastRounds = async () => {
      const club = await getClubAsync('04d9a851-61a1-476a-bc87-a3a30fc6a353');
      const rounds = await getRoundsAsync();

      let tempListItems = [];
      for (let round of rounds) {
        if (round.id === club.currentRoundId) continue;
        const roundListItemData = { round: round };
        tempListItems.push(roundListItemData);
      }
      tempListItems.sort((a, b) => b.round.number - a.round.number);

      setRoundListItemsData(tempListItems);
      setIsDoneLoading(true);
    };
    getPastRounds();
  }, []);

  let roundListItems = roundListItemsData.map(
    (itemData) => <RoundListItem key={itemData.round.id} round={itemData.round} />
  );

  return (
    <div className={`${styles.PastRoundsList} d-flex flex-column align-items-center`}>
      <h2 className="mb-3">Past Rounds</h2>
      <div className="d-flex justify-content-center flex-wrap">
        { isDoneLoading ? roundListItems : <Spinner /> }
      </div>
    </div>
  );
}

export default PastRoundsList;
