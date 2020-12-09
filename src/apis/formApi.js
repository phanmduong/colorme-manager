import * as env from '../constants/env';
import axios from 'axios';

export function getForms(sourceCancel, page, search, token) {
  let url =
    env.MANAGE_API_URL_2222 +
    '/v1/register-forms?search=' +
    search +
    '&page=' +
    page +
    '&token=' +
    token;
  return axios.get(url, {cancelToken: sourceCancel.token});
}
