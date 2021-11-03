import styles from './PickedTrackListItem.module.css';

import PickerIcon from '../PickerIcon/PickerIcon';

function PickedTrackListItem({pickedTrack, pickers, isTopTrack}) {
  return (
    <tr>
      <th scope="row">{pickedTrack.trackNumber}</th>
      <td className="overflow-hidden">{pickedTrack.title}</td>
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

export default PickedTrackListItem;
