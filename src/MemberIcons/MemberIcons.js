// Import stylesheets
import styles from './MemberIcons.module.css';

// Import packages
import chroma from 'chroma-js';
import { Link } from 'react-router-dom';

function MemberIcon({ member, sizeClass, isLoading = false, defaultFontColor = 'white', loadingFontColor = 'black' }) {
  const initials = member.firstName[0].toUpperCase() + member.lastName[0].toUpperCase();

  let defaultColor = member.color;
  let hoverColor = chroma(defaultColor).darken();

  const defaultIcon = (
    <Link
      to={`/member/${member.id}`}
      className={`${styles.link} ${sizeClass}`}
      style={{ textDecoration: 'none', '--defaultColor': defaultColor, '--hoverColor': hoverColor }}>
      <p style={{ color: defaultFontColor }}>{initials}</p>
    </Link>
  );

  const loadingIcon = (
    <Link
      to={`/member/${member.id}`}
      className={`${styles.link} ${sizeClass}`}
      style={{ textDecoration: 'none', '--defaultColor': 'transparent', '--hoverColor':'transparent' }}>
      <div className={styles.spinner} style={{ '--c': defaultColor }}></div>
      <p style={{ color: loadingFontColor }}>{initials}</p>
    </Link>
  );

  return isLoading ? loadingIcon : defaultIcon;
}

function MemberIconSmall({ member, isLoading, defaultFontColor, loadingFontColor }) {
  return <MemberIcon member={member}
    sizeClass={styles.MemberIconSmall}
    isLoading={isLoading}
    defaultFontColor={defaultFontColor}
    loadingFontColor={loadingFontColor} />
}

function MemberIconMedium({ member, isLoading, defaultFontColor, loadingFontColor}) {
  return <MemberIcon member={member}
    sizeClass={styles.MemberIconMedium}
    isLoading={isLoading}
    defaultFontColor={defaultFontColor}
    loadingFontColor={loadingFontColor} />
}

function MemberIconLarge({ member, isLoading, defaultFontColor, loadingFontColor }) {
  return <MemberIcon member={member}
    sizeClass={styles.MemberIconLarge}
    isLoading={isLoading}
    defaultFontColor={defaultFontColor}
    loadingFontColor={loadingFontColor} />
}

export { MemberIconSmall, MemberIconMedium, MemberIconLarge };
