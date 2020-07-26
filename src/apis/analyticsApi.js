/**
 * Created by phanmduong on 5/1/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadDashboard(baseId, genId, token, domain) {
  let url = env.apiUrl(domain) + '/v2/gens/' + genId + '/dashboard/';
  if (baseId === -1) {
    url += '?token=' + token;
  } else {
    url += baseId + '?token=' + token;
  }
  return axios.get(url);
}
