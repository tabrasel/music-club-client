import 'bootstrap/dist/css/bootstrap.min.css';
import RoundListItem from './RoundListItem.js';

function RoundList() {
  return (
    <div>
      <div className="d-flex">
        <h1>Rounds</h1>
        <button className="btn btn-primary">+</button>
      </div>

      <RoundListItem number="26"/>
      <RoundListItem number="25"/>
    </div>
  );
}

export default RoundList;
