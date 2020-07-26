import * as env from '../constants/env';
import axios from 'axios';

export function loadNotifications(page = 1, token, domain) {
  let url =
    env.manageApiUrl(domain) + '/notification/list?page=' + page + '&token=' + token;
  return axios.get(url);
}

export function readAllNotifications(token, domain) {
  let url = env.manageApiUrl(domain) + '/notification/seen?token=' + token;
  return axios.get(url);
}
