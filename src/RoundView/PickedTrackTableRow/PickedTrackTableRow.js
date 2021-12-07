import styles from './PickedTrackTableRow.module.css';

import MemberIcon from '../../MemberIcon/MemberIcon';

function PickedTrackTableRow({pickedTrack, pickers, isTopTrack}) {
  return (
    <tr className={styles.PickedTrackTableRow} style={{backgroundColor: isTopTrack ? '#cde3bb' : 'white'}}>
      <td style={{textAlign: 'right'}}>{pickedTrack.trackNumber}.</td>
      <td>{pickedTrack.title}</td>
      <td>
        <div className="d-flex justify-content-end">
          {
            pickers.map((picker) => (
              <MemberIcon
                key={picker.id}
                member={picker} />
            ))
          }
        </div>
      </td>
    </tr>
  );
}

export default PickedTrackTableRow;
