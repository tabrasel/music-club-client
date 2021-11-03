import './RoundsView.css';

import CurrentRoundJumbotron from '../CurrentRoundJumbotron/CurrentRoundJumbotron';
import PastRoundsList from '../PastRoundsList/PastRoundsList';

function RoundsView() {
  return (
    <div className="h-100">
      <CurrentRoundJumbotron />
      <PastRoundsList />
    </div>
  );
}

export default RoundsView;
