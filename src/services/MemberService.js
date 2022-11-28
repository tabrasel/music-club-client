const apiUri = 'https://music-club-service.uw.r.appspot.com/api';

/**
 * Gets a member by their ID.
 * @param id  the member's ID
 */
export async function getMemberAsync(id) {
  const response = await fetch(`${apiUri}/member?id=${id}`);
  return response.json();
}

/**
* Gets all members.
*/
export async function getMembersAsync() {
  const response = await fetch(`${apiUri}/members`);
  return response.json();
}

/**
 * Gets a member's posted genres.
 * @param id  the member's ID
 */
export async function getMemberGenresAsync(id) {
  const response = await fetch(`${apiUri}/member-genres?memberId=${id}`);
  return response.json();
}

/**
 * Gets a member's shared vote count with other members in a club.
 * @param memberID  the member's ID
 * @param clubID    the club's ID
 */
export async function getMemberSharedVotes(memberId, clubId) {
  const response = await fetch(`${apiUri}/shared-votes?memberId=${memberId}&clubId=${clubId}`);
  return response.json();
}

/**
 * Get's a member's posted albums by release date.
 * @param id        the member's ID
 * @param byDecade  whether or not to group posts by decade
 */
export async function getMemberReleases(id, byDecade) {
  const response = await fetch(`${apiUri}/member-release?memberId=${id}&byDecade=${byDecade}`);
  return response.json();
}
