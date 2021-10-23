import './RoundListItem.css';

import RoundIcon from './RoundIcon.js';

function RoundListItem({number, participants, albums}) {
  return (
    <div className="RoundListItem m-3 position-relative">
      <RoundIcon albums={albums} />

      <div className="round-number-label">
        <p>{number}</p>
      </div>
    </div>
  );
}

export default RoundListItem;
