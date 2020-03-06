import axios from 'axios';
import * as env from '../constants/env';

export function loadDocuments(departmentId, token) {
  let url =
    env.MANAGE_API_URL +
    '/v4/document/all?include=creator,department&department_id=' +
    departmentId +
    '&token=' +
    token;
  return axios.get(url);
}
