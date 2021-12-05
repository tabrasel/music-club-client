import './ClubView.css';

import CurrentRoundJumbotron from './CurrentRoundJumbotron/CurrentRoundJumbotron';
import PastRoundsList from './PastRoundsList/PastRoundsList';

function ClubView() {
  return (
    <div className="h-100">
      <CurrentRoundJumbotron />
      <PastRoundsList />
    </div>
  );
}

export default ClubView;
