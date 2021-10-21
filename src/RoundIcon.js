import './RoundIcon.css';

function RoundIcon(props) {
  return (
    <div className="RoundIcon">
      {
        props.albums.map((album) =>
          <img
            src={album.imageUrl}
            alt={album.title + " cover"}
          />
        )
      }
    </div>
  );
}

export default RoundIcon;
