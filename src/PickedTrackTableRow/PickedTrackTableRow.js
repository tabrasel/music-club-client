import styles from './PickedTrackTableRow.module.css';

import PickerIcon from '../PickerIcon/PickerIcon';

function PickedTrackTableRow({pickedTrack, pickers, isTopTrack}) {
  return (
    <tr className={styles.PickedTrackTableRow} style={{backgroundColor: isTopTrack ? '#cde3bb' : 'white'}}>
      <th scope="row" style={{textAlign: 'right'}}>{pickedTrack.trackNumber}.</th>
      <td>{pickedTrack.title}</td>
      <td>
        <div className="d-flex justify-content-end">
          {
            pickers.map((picker) => (
              <PickerIcon
                key={picker.id}
                picker={picker} />
            ))
          }
        </div>
      </td>
    </tr>
  );
}

export default PickedTrackTableRow;
