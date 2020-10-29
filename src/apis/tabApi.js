import axios from 'axios';
import * as env from '../constants/env';

export function loadTabs(token, domain) {
  let url = env.manageApiUrlV3(domain) + '/tabs?token=' + token;
  return axios.get(url);
}
