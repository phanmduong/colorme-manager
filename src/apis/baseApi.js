/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadBaseApi(token, domain) {
  let url = env.apiUrl(domain) + '/bases?token=' + token;
  return axios.get(url);
}
