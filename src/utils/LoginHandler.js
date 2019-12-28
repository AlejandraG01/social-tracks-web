export const saveUser = user => {
  sessionStorage.setItem("user", JSON.stringify(user));

  return user;
};

export const saveSpotifyToken = spotifyToken => {
  sessionStorage.setItem("spotifyToken", spotifyToken);

  return spotifyToken;
};

export const getLoggedUser = () => JSON.parse(sessionStorage.getItem("user"));

export const isLoggedIn = () => getLoggedUser() !== null;

export const getUserTopTracks = user => {
  if (!user) return [];

  return user.spotify_top_tracks.items.filter(track => track.type === "track");
};

export const logoutUser = () => {
  sessionStorage.setItem("user", null);
};
