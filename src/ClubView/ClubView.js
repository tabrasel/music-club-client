import './ClubView.css';

import { useState, useEffect } from 'react';

import CurrentRoundJumbotron from './CurrentRoundJumbotron/CurrentRoundJumbotron';
import MembersList from './MembersList/MembersList';
import PastRoundsList from './PastRoundsList/PastRoundsList';

function ClubView() {
  const [club, setClub] = useState(null);

  useEffect(() => {
    const fetchClub = async () => {
      const res = await fetch('https://tb-music-club.herokuapp.com/api/club?id=04d9a851-61a1-476a-bc87-a3a30fc6a353');
      const club = await res.json();
      setClub(club);
    };
    fetchClub();
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
