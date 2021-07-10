import * as env from '../constants/env';
import axios from 'axios';

export function loadClassApi(search, startTime, endTime, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/class-lessons?include=study_class.course&search=' +
    search +
    '&start_time=' +
    startTime +
    '&end_time=' +
    endTime +
    '&token=' +
    token;
  return axios.get(url);
}
