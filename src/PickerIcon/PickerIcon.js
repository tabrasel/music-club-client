import styles from './PickerIcon.module.css';

function PickerIcon({picker}) {
  return (
    <div className={`${styles.PickerIcon} rounded-circle d-flex justify-content-center align-items-center`} style={{backgroundColor: picker.color}}>
      <p>{picker.firstName[0] + picker.lastName[0]}</p>
    </div>
  );
}

export default PickerIcon;
