// Import stylesheets
import styles from './MembersList.module.css';

// Import packages
import { useState, useEffect } from 'react';

// Import services
import { getMemberAsync } from '../../services/MemberService';

// Import components
import { MemberIconSmall } from '../../MemberIcons/MemberIcons';

function MembersList({memberIds}) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (memberIds === null) return;

    const fetchMembers = async () => {
      const promises = memberIds.map((memberId) => getMemberAsync(memberId));
      const members = await Promise.all(promises);
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
