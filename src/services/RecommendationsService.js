import { getSpotifyToken } from "../utils/LoginHandler";
import { request, GET } from "./NetworkService";
import { API_URL } from "../config";

export async function getRecommendations(loggedUser) {
  // Getting Spotify access token
  const accessToken = await getSpotifyToken();
  // Setting params
  const params = {
    user_id: loggedUser._id,
    spotify_access_token: accessToken
  };
  // Fetching API
  const response = await request(API_URL, GET, "recommendations", params);
  if (response.error) throw new Error("Error getting recommendations from API");

  return response.result;
}
