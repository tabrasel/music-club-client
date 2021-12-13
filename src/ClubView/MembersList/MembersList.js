import styles from './MembersList.module.css';

import { useState, useEffect } from 'react';

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
        members.map((member) => {
          return (
            <div className={styles.memberIcon} key={member.id} style={{backgroundColor: member.color}}>
              <p>{member.firstName[0] + member.lastName[0]}</p>
            </div>
          );
        })
      }
    </div>
  );
}

export default MembersList;
