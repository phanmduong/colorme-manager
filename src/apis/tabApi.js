import axios from 'axios';
import * as env from '../constants/env';

export function loadTabs(token) {
  let url = env.MANAGE_API_URL_V3 + '/tabs?token=' + token;
  return axios.get(url);
}
