import axios from 'axios';
import * as env from '../constants/env';

export function loadDetailShifts(baseId, genId, id, week, token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/work-shift/detail-shifts/' +
    id +
    '?baseId=' +
    baseId +
    '&gen_id=' +
    genId +
    '&week=' +
    week +
    '&token=' +
    token;
  return axios.get(url);
}
