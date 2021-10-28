function PickedTrackListItem({pickedTrack}) {
  console.log(pickedTrack);

  return (
    <div className="PickedTrackListItem list-group-item px-2 py-1">
      <p className="text-dark m-0">{pickedTrack.title}</p>
    </div>
  );
}

export default PickedTrackListItem;
