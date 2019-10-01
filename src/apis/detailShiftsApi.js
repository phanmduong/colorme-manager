import axios from 'axios';
import * as env from '../constants/env';

export function loadDetailShifts(baseId, genId, id, week, token) {
  let url =
    env.MANAGE_API_URL_V3 +
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
