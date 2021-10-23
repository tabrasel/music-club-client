import 'bootstrap/dist/css/bootstrap.min.css';
import './RoundListItem.css';

import RoundIcon from './RoundIcon.js';

function RoundListItem({number, participants, albums}) {
  return (
    <div className="RoundListItem m-3">
      <RoundIcon albums={albums} />

      <p className="text-center">{number}</p>
    </div>
  );
}

export default RoundListItem;
