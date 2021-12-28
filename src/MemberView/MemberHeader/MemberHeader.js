import styles from './MemberHeader.module.css';

function MemberHeader({member}) {
  const memberIconSkeleton = (
    <div className={styles.memberIcon} style={{ backgroundColor: '#f3f3f3' }}></div>
  );

  const memberNameSkeleton = (
    <h1 style={{ color: 'transparent' }}>Tate Brasel</h1>
  );

  return (
    <div className={`${styles.memberHeader} mb-3`}>
      {
        (member === null) ? memberIconSkeleton :
        <div className={styles.memberIcon} style={{ backgroundColor: member.color }}>
          <p>{member.firstName[0]}{member.lastName[0]}</p>
        </div>
      }

      {
        (member === null) ? memberNameSkeleton :
        <h1>{member.firstName} {member.lastName}</h1>
      }
    </div>
  );
}

export default MemberHeader;
