import * as env from '../constants/env';
import axios from 'axios';

export function getShiftClock(time, token) {
  let url = env.MANAGE_API_URL_V3 + '/gens/0/attendance-shifts?token=' + token;
  return axios.post(url, {
    time: time,
  });
}

export function getTeachingClock(time, token) {
  let url = env.MANAGE_API_URL_V3 + '/gens/0/attendance-classes?token=' + token;
  return axios.post(url, {
    time: time,
  });
}
