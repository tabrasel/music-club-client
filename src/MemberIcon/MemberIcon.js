import styles from './MemberIcon.module.css';

function MemberIcon({member}) {
  return (
    <div className={`${styles.MemberIcon} rounded-circle d-flex justify-content-center align-items-center`} style={{backgroundColor: member.color}}>
      <p>{member.firstName[0] + member.lastName[0]}</p>
    </div>
  );
}

export default MemberIcon;
