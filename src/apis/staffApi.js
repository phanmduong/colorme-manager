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
