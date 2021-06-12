import axios from 'axios';
import * as env from '../constants/env';
import {isEmptyInput} from '../helper';

export function loadWorkShift(startTime, endTime, baseId, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/work-shifts?start_time=' +
    startTime +
    '&end_time=' +
    endTime +
    (!isEmptyInput(baseId) ? '&base_ids[]=' + baseId : '') +
    '&token=' +
    token;
  return axios.get(url);
}

export function registerWorkShift(workShiftId, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/work-shifts/' +
    workShiftId +
    '/subscribe?token=' +
    token;
  return axios.put(url);
}

export function removeWorkShift(workShiftId, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/work-shifts/' +
    workShiftId +
    '/unsubscribe?token=' +
    token;
  return axios.put(url);
}
