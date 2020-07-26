import * as env from '../constants/env';
import axios from 'axios';

export function evaluateTeacher(token, userId, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/teaching/evaluate-person-teacher?token=' +
    token +
    '&user_id=' +
    userId;
  return axios.get(url);
}

export function evaluateAssistant(token, userId, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/teaching/evaluate-person-teaching-assistant?token=' +
    token +
    '&user_id=' +
    userId;
  return axios.get(url);
}

export function getTeacherFeedback(token, genId, userId, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/teaching/evaluate-teacher-detail-student-rating?token=' +
    token +
    '&gen_id=' +
    genId +
    '&user_id=' +
    userId;
  return axios.get(url);
}

export function getAssistantFeedback(token, genId, userId, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/teaching/evaluate-teaching-assistant-detail-student-rating?gen_id=' +
    genId +
    '&user_id=' +
    userId +
    '&token=' +
    token;
  return axios.get(url);
}

export function getTeacherList(token, genId, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/teaching/evaluate-teacher?gen_id=' +
    genId +
    '&token=' +
    token;
  return axios.get(url);
}

export function getAssistantList(token, genId, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/teaching/evaluate-teaching-assistant?gen_id=' +
    genId +
    '&token=' +
    token;
  return axios.get(url);
}
