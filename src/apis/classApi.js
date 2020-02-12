/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadClassApi(baseId, courseId, genId, token) {
  let url =
    env.API_URL +
    '/gens/' +
    genId +
    '/bases/' +
    baseId +
    '/courses/' +
    courseId +
    '/class?token=' +
    token;
  return axios.get(url);
}

export function loadCourseApi(token) {
  let url = env.API_URL + '/paid-courses?token=' + token;
  return axios.get(url);
}

export function loadCurrentClassStudyApi(token) {
  let url = env.API_URL + '/current-study-class?token=' + token;
  return axios.get(url);
}
