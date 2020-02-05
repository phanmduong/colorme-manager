import * as env from '../constants/env';
import axios from 'axios';

export function loadNotifications(page = 1, token) {
  let url =
    env.MANAGE_API_URL + '/notification/list?page=' + page + '&token=' + token;
  return axios.get(url);
}

export function readAllNotifications(token) {
  let url = env.MANAGE_API_URL + '/notification/seen?token=' + token;
  return axios.get(url);
}
