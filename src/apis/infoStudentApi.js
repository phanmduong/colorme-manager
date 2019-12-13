import axios from 'axios';
import * as env from '../constants/env';

export function loadInfoStudent(studentId, token) {
  let url = env.MANAGE_API_URL + '/student/' + studentId + '?token=' + token;
  return axios.get(url);
}

export function loadRegisters(studentId, token) {
  let url =
    env.MANAGE_API_URL + '/student/' + studentId + '/registers?token=' + token;
  return axios.get(url);
}

export function loadHistoryCalls(studentId, token) {
  let url =
    env.MANAGE_API_URL +
    '/student/' +
    studentId +
    '/history-calls?token=' +
    token;
  return axios.get(url);
}

export function loadProgress(studentId, token) {
  let url =
    env.MANAGE_API_URL + '/student/' + studentId + '/progress?token=' + token;
  return axios.get(url);
}

export function loadHistoryCollect(studentId, token) {
  let url =
    env.MANAGE_API_URL +
    '/student/' +
    studentId +
    '/history-collect-money?token=' +
    token;
  return axios.get(url);
}
