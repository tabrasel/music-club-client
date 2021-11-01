import 'bootstrap/dist/css/bootstrap.min.css';
import './RoundParticipantsKey.css';

import PickerIcon from '../PickerIcon/PickerIcon';

function RoundParticipantsKey({participants}) {
  return (
    <div className="RoundParticipantsKey d-flex flex-column align-items-end">
    {
      participants.map((participant) => (
        <div className="d-flex align-items-center mb-2" key={participant.id}>
          <p className="fullname my-0 mx-2">{participant.firstName} {participant.lastName}</p>
          <PickerIcon picker={participant} />
        </div>
      ))
    }
    </div>
  );
}

export default RoundParticipantsKey;
