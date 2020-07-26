import axios from 'axios';
import * as env from '../constants/env';

export function loadWorkShift(baseId, genId, token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/work-shift/current-shifts?base_id=' +
    baseId +
    '&gen_id=' +
    genId +
    '&token=' +
    token;
  return axios.get(url);
}

export function registerWorkShift(workShiftId, token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/work-shift/register-shift/' +
    workShiftId +
    '?token=' +
    token;
  return axios.put(url);
}

export function removeWorkShift(workShiftId, token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/work-shift/remove-register-shift/' +
    workShiftId +
    '?token=' +
    token;
  return axios.put(url);
}
