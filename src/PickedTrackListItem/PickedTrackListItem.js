import styles from './PickedTrackListItem.module.css';

import PickerIcon from '../PickerIcon/PickerIcon';

function PickedTrackListItem({pickedTrack, pickers, isTopTrack}) {
  return (
    <div className={`${styles.PickedTrackListItem} list-group-item px-3 py-1`} style={{backgroundColor: isTopTrack ? '#cde3bb' : 'white'}}>

      <div className="row g-0 h-100">
        <div className="col-9">
          <div className="row h-100">
            <div className="col-1 d-flex align-items-center">
              <p className="m-0 text-right">{pickedTrack.trackNumber}.</p>
            </div>
            <div className="col-11 d-flex align-items-center">
              <p className="m-0">{pickedTrack.title}</p>
            </div>
          </div>
        </div>

        <div className="col-3 d-flex justify-content-end">
          {
            pickers.map((picker) => (
              <PickerIcon
                key={picker.id}
                picker={picker} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default PickedTrackListItem;
