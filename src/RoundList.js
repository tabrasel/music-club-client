import 'bootstrap/dist/css/bootstrap.min.css';
import RoundListItem from './RoundListItem.js';

function RoundList() {
  const roundListItemsData = [
    {
      number: 26,
      startDate: 'Oct 4, 2021'
    },
    {
      number: 25,
      startDate: 'Sep 10, 2021'
    },
    {
      number: 24,
      startDate: 'Aug 8, 2021'
    }
  ];

  const roundListItems = roundListItemsData.map((itemData) => {
    return (
      <RoundListItem number={itemData.number} startDate={itemData.startDate}/>
    );
  });

  return (
    <div>
      <div className="d-flex">
        <h1>Rounds</h1>
        <button className="btn btn-primary">+</button>
      </div>

      <div>
        {roundListItems}
      </div>
    </div>
  );
}

export default RoundList;
