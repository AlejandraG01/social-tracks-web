const apiUrl = {
  development: "http://localhost:3000",
  production: "https://social-tracks.herokuapp.com"
};
export const API_URL = apiUrl.development;

// const spotifyLoginUrl = {
//     development: `${API_URL}/users/login_spotify`,
//     production: 'https://social-tracks.herokuapp.com/users/login_spotify',
// };

export const SPOTIFY_CLIENT_ID = "2caaba5cd2d9417bb272957a76ff6970";
export const SPOTIFY_REDIRECT_URL = "http://localhost:3001/login_spotify";

// const mastodonLoginUrl = {
//     development: `${API_URL}/users/login_mastodon`,
//     production: 'https://social-tracks.herokuapp.com/users/login_mastodon',
// };

const MASTODON_CLIENT_ID =
  "d7abf1a2acaa6e8a0893e74557519cc2dad89a0ae74cff7f3d654bd7844411a9";
export const MASTODON_AUTH_URL = `https://socialtracks.masto.host/oauth/authorize?scope=read&response_type=code&redirect_uri=http:%2F%2Flocalhost:3001%2Flogin_mastodon&client_id=${MASTODON_CLIENT_ID}`;
