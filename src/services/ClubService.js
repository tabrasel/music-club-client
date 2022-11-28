const apiUri = process.env.REACT_APP_MUSIC_CLUB_API_URI;

/**
 * Gets a club by its ID.
 * @param id  the club's ID
 */
export async function getClubAsync(id) {
  const response = await fetch(`${apiUri}/club?id=${id}`);
  return response.json();
}
