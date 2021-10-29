import 'bootstrap/dist/css/bootstrap.min.css';
import './RoundParticipantsKey.css';

import PickerIcon from '../PickerIcon/PickerIcon';

function RoundParticipantsKey({participants}) {
  return (
    <div className="RoundParticipantsKey d-flex flex-column align-items-end">
    {
      participants.map((participant) => (
        <div className="d-flex align-items-center mb-2">
          <p className="fullname ml-1 mb-1" key={participant.id}>{participant.firstName + ' ' + participant.lastName}</p>
          <PickerIcon picker={participant} />
        </div>
      ))
    }
    </div>
  );
}

export default RoundParticipantsKey;
