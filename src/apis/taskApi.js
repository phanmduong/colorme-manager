import axios from 'axios';
import * as env from '../constants/env';

export function getTaskAnalytics(user_id, token, domain) {
  let url =
    env.manageApiUrl(domain) +
    '/task/analytics/by-user?user_id=' +
    user_id +
    '&token=' +
    token;
  return axios.get(url);
}

export function getTasks(date, user_id, token, domain) {
  let url =
    env.manageApiUrlV4(domain) +
    '/task/by-date?date=' +
    date +
    '&include=task_list,register.saler&user_id=' +
    user_id +
    '&token=' +
    token;
  return axios.get(url);
}

export function getTaskEmployees(token, domain) {
  let url = env.manageApiUrlV4(domain) + '/task/all-employees?token=' + token;
  return axios.get(url);
}
