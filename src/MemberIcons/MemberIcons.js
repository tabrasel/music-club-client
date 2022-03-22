// Import stylesheets
import styles from './MemberIcons.module.css';

// Import packages
import { Link } from 'react-router-dom';

function MemberIconSmall({ member }) {
  return <MemberIcon member={member} sizeClass={styles.MemberIconSmall} />
}

function MemberIconMedium({ member }) {
  return <MemberIcon member={member} sizeClass={styles.MemberIconMedium} />
}

function MemberIconLarge({ member }) {
  return <MemberIcon member={member} sizeClass={styles.MemberIconLarge} />
}

function MemberIcon({ member, sizeClass }) {
  return (
    <Link
      to={`/member/${member.id}`}
      className={`${styles.MemberIcon} ${sizeClass}`}
      style={{ textDecoration: 'none', backgroundColor: member.color }}>
      <p>{member.firstName[0].toUpperCase() + member.lastName[0].toUpperCase()}</p>
    </Link>
  );
}

export { MemberIconSmall, MemberIconMedium, MemberIconLarge };
