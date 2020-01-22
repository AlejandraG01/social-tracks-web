import { getLoggedUser } from "../utils/LoginHandler";
import { request, GET, POST } from "./NetworkService";
import { API_URL } from "../config";

export async function getRatings() {
  const user = getLoggedUser();
  // Setting params
  const params = {
    user_id: user._id
  };
  // Fetching API
  const response = await request(API_URL, GET, "ratings", params);
  if (response.error) throw new Error("Error getting ratings from API");

  return formatRatingsObj(response.result.ratings);
}

export async function createRating(spotifyTrackId, ratingValue) {
  const user = getLoggedUser();
  // Setting params
  const params = {
    user_id: user._id,
    value: ratingValue,
    spotify_track_id: spotifyTrackId
  };
  // Fetching API
  const response = await request(API_URL, POST, "ratings", params);
  if (response.error) throw new Error("Error creating rating from API");

  return response.result;
}

function formatRatingsObj(ratingsArr) {
  let ratings = {};
  ratingsArr.forEach(rating => {
    ratings = {
      ...ratings,
      [rating.spotify_track_id]: rating.value
    };
  });

  return ratings;
}
