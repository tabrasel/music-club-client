import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './RoundListItem.module.css';

import { Link } from 'react-router-dom';

import RoundIcon from '../RoundIcon/RoundIcon.js';

function RoundListItem({round, participants, albums}) {
  return (
    <div className={`${styles.RoundListItem} position-relative m-4`}>
      <div className={styles.disk}></div>
      <Link to={'/round/' + round.id}>
          <RoundIcon round={round} albums={albums} />
          <div className={styles.roundIconOverlay}></div>
      </Link>
    </div>
  );
}

export default RoundListItem;
