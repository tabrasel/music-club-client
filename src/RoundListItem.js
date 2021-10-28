import 'bootstrap/dist/css/bootstrap.min.css';
import './RoundListItem.css';

import { Link } from 'react-router-dom';

import RoundIcon from './RoundIcon.js';

function RoundListItem({round, participants, albums}) {
  return (
    <div className="RoundListItem m-3">
      <Link to={'/round/' + round.id}>
        <RoundIcon albums={albums} />
        <p className="round-label">{round.number}</p>
      </Link>
    </div>
  );
}

export default RoundListItem;
