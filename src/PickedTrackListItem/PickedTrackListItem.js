function PickedTrackListItem({pickedTrack}) {
  return (
    <div className="PickedTrackListItem list-group-item">
      <p className="text-dark m-0">{pickedTrack.title}</p>
    </div>
  );
}

export default PickedTrackListItem;
