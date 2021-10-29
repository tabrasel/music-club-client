import './PickedTrackListItem.css'

import { useState, useEffect } from 'react';

import PickerIcon from '../PickerIcon/PickerIcon';

function PickedTrackListItem({pickedTrack, pickers, isTopTrack}) {
  return (
    <div className="PickedTrackListItem list-group-item px-2 py-1" style={{backgroundColor: isTopTrack ? '#cde3bb' : 'white'}}>
      <div className="row">
        <div className="col-9">
          <div className="row">
            <div className="col-1">
              <p className="mx-1 my-0">{pickedTrack.trackNumber}.</p>
            </div>
            <div className="col">
              <p className="m-0">{pickedTrack.title}</p>
            </div>
          </div>
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
