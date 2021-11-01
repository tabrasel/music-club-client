import 'bootstrap/dist/css/bootstrap.min.css';
import './RoundListItem.css';

import { Link } from 'react-router-dom';

import RoundIcon from '../RoundIcon/RoundIcon.js';

function RoundListItem({round, participants, albums}) {
  return (
    <div className="RoundListItem position-relative m-3">
      <Link to={'/round/' + round.id}>
          <RoundIcon round={round} albums={albums} />
          <div className="round-icon-overlay"></div>
      </Link>
    </div>
  );
}

export default RoundListItem;
