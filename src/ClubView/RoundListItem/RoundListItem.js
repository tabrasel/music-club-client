import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './RoundListItem.module.css';

import { Link } from 'react-router-dom';

function RoundListItem({round}) {
  const thumbnailUrl = 'https://tb-music-club.s3.us-west-2.amazonaws.com/round_thumbnails/' + round.id + '.jpeg';

  return (
    <div className={`${styles.RoundListItem} position-relative m-4`} style={{backgroundImage: 'url(' + thumbnailUrl + ')'}}>
      <div className={styles.disk}></div>
      <Link to={'/round/' + round.id}>
        <div className={styles.roundIconOverlay}></div>
      </Link>
    </div>
  );
}

export default RoundListItem;
