import './PickedTrackListItem.css'

import { useState, useEffect } from 'react';

import PickerIcon from '../PickerIcon/PickerIcon';

function PickedTrackListItem({pickedTrack, pickers}) {
  return (
    <div className="PickedTrackListItem list-group-item">
      <div className="row">
        <div className="col-9">
          <p className="m-0">{pickedTrack.title}</p>
        </div>
        <div className="col d-flex justify-content-end">
          {
            pickers.map((picker) => (
              <PickerIcon picker={picker} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default PickedTrackListItem;
