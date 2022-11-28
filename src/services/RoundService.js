const apiUri = process.env.REACT_APP_MUSIC_CLUB_API_URI;

/**
 * Gets a round by its ID.
 * @param id  the round's ID
 */
export async function getRoundAsync(id) {
  const response = await fetch(`${apiUri}/round?id=${id}`);
  return response.json();
}

/**
* Gets all rounds.
*/
export async function getRoundsAsync() {
  const response = await fetch(`${apiUri}/rounds`);
  return response.json();
}
