import * as env from '../constants/env';
import axios from 'axios';

export function evaluateTeacher(token) {
  let url =
    env.MANAGE_API_URL_V3 + '/teaching/evaluate-person-teacher?token=' + token;
  return axios.get(url);
}

export function evaluateAssistant(token) {
  let url =
    env.MANAGE_API_URL_V3 +
    '/teaching/evaluate-person-teaching-assistant?token=' +
    token;
  return axios.get(url);
}

export function getFeedback(token, genId) {
  let url =
    env.MANAGE_API_URL_V3 +
    '/teaching/feedback?token=' +
    token +
    '&gen_id=' +
    genId;
  return axios.get(url);
}
