import styles from './MemberHeader.module.css';

function MemberHeader({member}) {
  if (member === null) return null;

  return (
    <div className={`${styles.memberHeader} mb-3`}>
      <div className={styles.memberIcon} style={{ backgroundColor: member.color }}>
        <p>{member.firstName[0]}{member.lastName[0]}</p>
      </div>

      <h1>{member.firstName} {member.lastName}</h1>
    </div>
  );
}

export default MemberHeader;
