/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadGenApi(token, domain) {
  let url = env.manageApiUrl(domain) + '/gen/all?token=' + token;
  // let url = env.API_URL + "/gens?token=" + token;
  return axios.get(url);
}
