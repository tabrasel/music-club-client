const apiUri = process.env.REACT_APP_MUSIC_CLUB_API_URI;

/**
 * Gets an album by its ID.
 * @param id  the album's ID
 */
export async function getAlbumAsync(id) {
  const response = await fetch(`${apiUri}/album?id=${id}`);
  return response.json();
}

/**
* Gets all albums.
*/
export async function getAlbumsAsync() {
  const response = await fetch(`${apiUri}/albums`);
  return response.json();
}
