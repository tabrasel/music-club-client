const apiUri = 'https://music-club-service.uw.r.appspot.com/api';

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
