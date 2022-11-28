// Import styles
import './ClubView.css';

// Import packages
import { useState, useEffect } from 'react';

// Import components
import CurrentRoundJumbotron from './CurrentRoundJumbotron/CurrentRoundJumbotron';
import MembersList from './MembersList/MembersList';
import PastRoundsList from './PastRoundsList/PastRoundsList';

// Import services
import { getClubAsync } from '../services/ClubService';

function ClubView() {
  const [club, setClub] = useState(null);

  useEffect(() => {
    const loadClub = async () => {
      const club = await getClubAsync('04d9a851-61a1-476a-bc87-a3a30fc6a353')
      setClub(club);
    };
    loadClub();
  }, []);

  return (
    <div className="h-100">
      <MembersList memberIds={club ? club.participantIds : null} />
      <CurrentRoundJumbotron club={club} />
      <PastRoundsList />
    </div>
  );
}

export default ClubView;
