function PickedTrackListItem({pickedTrack}) {
  console.log(pickedTrack);

  return (
    <div className="PickedTrackListItem list-group-item">
      <p className="text-dark">{pickedTrack.title}</p>
    </div>
  );
}

export default PickedTrackListItem;
