// Import stylesheets
import styles from './MembersList.module.css';

// Import packages
import { useState, useEffect } from 'react';

// Import components
import { MemberIconSmall } from '../../MemberIcons/MemberIcons';

function MembersList({memberIds}) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (memberIds === null) return;
    const fetchMembers = async () => {
      const memberPromises = memberIds.map((memberId) => {
        return fetch('https://tb-music-club.herokuapp.com/api/member?id=' + memberId)
          .then((res) => res.json());
      });
      const members = await Promise.all(memberPromises);
      setMembers(members);
    };
    fetchMembers();
  }, [memberIds]);

  return (
    <div className={styles.MembersList}>
    {
      members.map((member) => <MemberIconSmall key={member.id} member={member} />)
    }
    </div>
  );
}

export default MembersList;
