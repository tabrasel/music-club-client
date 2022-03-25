// Import stylesheets
import styles from './MemberIcons.module.css';

// Import packages
import chroma from 'chroma-js';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Define Link style
const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-decoration: none;
	background-color: ${(props) => props.defaultColor};
  transition-duration: 0.15s;
	:hover {
		cursor: pointer;
    transform: translateY(-2px);
	}
  :active {
    background-color: ${(props) => props.hoverColor};
  }
`;

function MemberIconSmall({ member }) {
  return <MemberIcon member={member} sizeClass={styles.MemberIconSmall} />
}

function MemberIconMedium({ member }) {
  return <MemberIcon member={member} sizeClass={styles.MemberIconMedium} />
}

function MemberIconLarge({ member }) {
  return <MemberIcon member={member} sizeClass={styles.MemberIconLarge} />
}

function MemberIcon({ member, sizeClass, isLoading = false }) {
  const defaultColor = member.color;
  const hoverColor = chroma(defaultColor).darken();

  const initials = member.firstName[0].toUpperCase() + member.lastName[0].toUpperCase();

  const defaultType = (
    <StyledLink
      to={`/member/${member.id}`}
      className={`${styles.MemberIcon} ${sizeClass}`}
      defaultColor={defaultColor}
      hoverColor={hoverColor}>
      <p>{initials}</p>
    </StyledLink>
  );

  const loadingType = (
    <div className={`${styles.unfinishedIcon} ${sizeClass}`}>
      <div className={styles.spinner} style={{'--c': defaultColor}}></div>
      <p>{initials}</p>
    </div>
  );

  return (isLoading ? loadingType : defaultType);
}

export { MemberIconSmall, MemberIconMedium, MemberIconLarge };
