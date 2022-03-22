// Import stylesheets
import styles from './PickedTrackTableRow.module.css';

// Import components
//import MemberIcon from '../../MemberIcon/MemberIcon';
import { MemberIconSmall } from '../../MemberIcons/MemberIcons';

function PickedTrackTableRow({pickedTrack, pickers, isTopTrack}) {
  return (
    <tr className={styles.PickedTrackTableRow} style={{backgroundColor: isTopTrack ? '#cde3bb' : 'white'}}>
      <td style={{textAlign: 'right'}}>{pickedTrack.trackNumber}.</td>
      <td>{pickedTrack.title}</td>
      <td>
        <div className={styles.pickerList}>
          {
            pickers.map((picker) => <MemberIconSmall key={picker.id} member={picker} />)
          }
        </div>
      </td>
    </tr>
  );
}

export default PickedTrackTableRow;
