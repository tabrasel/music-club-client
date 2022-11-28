const apiUri = 'https://music-club-service.uw.r.appspot.com/api';

/**
 * Gets a club by its ID.
 * @param id  the club's ID
 */
export async function getClubAsync(id) {
  const response = await fetch(`${apiUri}/club?id=${id}`);
  return response.json();
}
