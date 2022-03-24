// Import stylesheets
import styles from './MemberIcons.module.css';

// Import packages
import chroma from 'chroma-js';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Define Link style
const StyledLink = styled(Link)`
  text-decoration: none;
	background-color: ${(props) => props.defaultColor};
  transition-duration: 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
	:hover {
		background-color: ${(props) => props.hoverColor};
		cursor: pointer;
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

function MemberIcon({ member, sizeClass }) {
  const defaultColor = member.color;
  const hoverColor = chroma(defaultColor).darken();

  return (
    <StyledLink
      to={`/member/${member.id}`}
      className={`${styles.MemberIcon} ${sizeClass}`}
      defaultColor={defaultColor}
      hoverColor={hoverColor}
      >
      <p>{member.firstName[0].toUpperCase() + member.lastName[0].toUpperCase()}</p>
    </StyledLink>
  );
}

export { MemberIconSmall, MemberIconMedium, MemberIconLarge };
