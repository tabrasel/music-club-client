import './RoundIcon.css';

function RoundIcon(props) {
  return (
    <div className="RoundIcon">
      {
        props.albums.map((album) =>
          <img
            key={album.title}
            src={album.imageUrl}
            alt={album.title + " cover"}
          />
        )
      }
    </div>
  );
}

export default RoundIcon;
