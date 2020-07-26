import axios from 'axios';
import * as env from '../constants/env';

export function loadDocuments(departmentId, token, domain) {
  let url =
    env.manageApiUrl(domain) +
    '/v4/document/all?include=creator,department&department_id=' +
    departmentId +
    '&token=' +
    token;
  return axios.get(url);
}
