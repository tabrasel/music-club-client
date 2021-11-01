import './RoundIcon.css';

function RoundIcon({round, albums}) {
  const indices = [0, 1, 2, 3];

  return (
    <div className="RoundIcon position-relative">
      <div className="round-number-overlay">
        <div className="number-label">
          <p>{round.number}</p>
        </div>
      </div>

      <div className="cover-grid">
        { indices.map(i => createAlbumImage(albums, i)) }
      </div>
    </div>
  );
}

export default RoundIcon;


function createAlbumImage(albums, i) {
  if (albums === null || i >= albums.length) {
    return (<div className="placeholder-img" key={i}></div>);
  }

  return (
    <img key={i} src={albums[i].imageUrl} alt={albums[i].title + ' cover image'} />
  );
}
