import * as env from '../constants/env';
import axios from 'axios';

export function getStaff(sourceCancel = {}, page, search, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/employees?limit=20&orderBy=created_at&sortedBy=desc&page=' +
    page +
    '&search=' +
    search +
    '&token=' +
    token;
  return axios.get(url, {cancelToken: sourceCancel.token});
}

export function getDepartments(token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/department/get-all-departments?limit=-1&token=' +
    token;
  return axios.get(url);
}

export function getRoles(token, domain) {
  let url = env.manageApiUrlV3(domain) + '/get-roles?token=' + token;
  return axios.get(url);
}
