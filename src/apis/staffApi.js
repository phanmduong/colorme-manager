import * as env from '../constants/env';
import axios from 'axios';

export function getStaff(sourceCancel = {}, page, search, token) {
  let url =
    env.MANAGE_API_URL_V3 +
    '/get-staffs?page=' +
    page +
    '&search=' +
    search +
    '&token=' +
    token;
  return axios.get(url, {cancelToken: sourceCancel.token});
}

export function getDepartments(token) {
  let url =
    env.MANAGE_API_URL_V3 +
    '/department/get-all-departments?limit=-1&token=' +
    token;
  return axios.get(url);
}

export function getRoles(token) {
  let url = env.MANAGE_API_URL_V3 + '/get-roles?token=' + token;
  return axios.get(url);
}
