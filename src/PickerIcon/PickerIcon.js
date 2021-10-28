import './PickerIcon.css';

function PickerIcon({picker}) {
  return (
    <div className="PickerIcon rounded-circle d-flex justify-content-center align-items-center">
      <p>{picker.firstName[0] + picker.lastName[0]}</p>
    </div>
  );
}

export default PickerIcon;
