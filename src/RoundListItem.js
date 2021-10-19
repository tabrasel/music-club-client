function RoundListItem(props) {
  return (
    <div>
      <h2>Round {props.number}</h2>
      <small>{props.startDate}</small>
    </div>
  );
}

export default RoundListItem;
