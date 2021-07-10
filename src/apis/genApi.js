/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadGenApi(token, domain) {
  let url = env.manageApiUrl(domain) + '/gen/all?token=' + token;
  return axios.get(url);
}

export function loadGenV2Api(token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/gens?limit=0&orderBy=created_at&sortedBy=desc&token=' +
    token;
  return axios.get(url);
}
