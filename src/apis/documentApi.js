import axios from 'axios';
import * as env from '../constants/env';

export function loadDocuments(token) {
  let url =
    env.MANAGE_API_URL + '/v4/document/all?include=creator&token=' + token;
  return axios.get(url);
}
