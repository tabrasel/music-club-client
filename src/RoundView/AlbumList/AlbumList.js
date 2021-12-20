import styles from './AlbumList.module.css';

import RoundAlbumListItem from '../RoundAlbumListItem/RoundAlbumListItem';

function AlbumList({albums, participants, votesPerParticipant}) {
  return (
    <div className={styles.AlbumList}>
    {
      albums.map((album) => (
        <RoundAlbumListItem
          key={album.id}
          album={album}
          participants={participants}
          votesPerParticipant={votesPerParticipant} />
      ))
    }
    </div>
  );
}

export default AlbumList;
