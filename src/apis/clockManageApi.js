import * as env from '../constants/env';
import axios from 'axios';
import {isEmptyInput} from '../helper';

export function getShiftClock(time, token, domain) {
  let url =
    env.manageApiUrlV3(domain) + '/gens/0/attendance-shifts?token=' + token;
  return axios.post(url, {
    time: time,
  });
}

export function getTeachingClock(time, token, domain) {
  let url =
    env.manageApiUrlV3(domain) + '/gens/0/attendance-classes?token=' + token;
  return axios.post(url, {
    time: time,
  });
}

export function getWorkShiftClock(time, token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/gens/0/attendance-work-shifts?token=' +
    token +
    '&time=' +
    time;
  return axios.get(url);
}

export function historyShiftsApi(
  search,
  type,
  employee_id,
  start_time,
  end_time,
  token,
  domain,
) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/check-in-check-outs?search=' +
    search +
    '&type=' +
    type +
    (!isEmptyInput(employee_id) ? '&employee_ids[]=' + employee_id : '') +
    '&start_time=' +
    start_time +
    '&end_time=' +
    end_time +
    '&token=' +
    token;
  return axios.get(url);
}
