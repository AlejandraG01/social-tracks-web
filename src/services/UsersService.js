import { request, GET } from './NetworkService';
import { API_URL } from '../config';

export async function loginSpotify(accessToken) {
  // Setting params
  const params = {
    access_token: accessToken,
  };
  // Fetching API
  const response = await request(API_URL, GET, 'users/login_spotify', params);
  if (response.error) throw new Error(response.error);

  return response.result;
}


export async function loginMastodon(authCode, userId){
//setting params
const params = {
  authorization_code: authCode,
  user_id: userId,

};
//fetching API
const response =  await request(API_URL, GET, 'users/login_mastodon', params);
if (response.error) throw new Error('Error sendingmastodon credentials to API');

return response.result;
};
