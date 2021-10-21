import './RoundListItem.css';

import RoundIcon from './RoundIcon.js';

function RoundListItem(props) {
  // TODO: sort albums by poster name

  return (
    <div className="RoundListItem">
      <RoundIcon albums={props.albums}/>
    </div>
  );
}

export default RoundListItem;
