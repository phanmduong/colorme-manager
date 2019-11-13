import axios from 'axios';
import * as env from '../constants/env';

export function loadScheduleClasses(token, lessonId) {
  let url =
    env.MANAGE_API_URL +
    '/class/schedule-class-future/' +
    lessonId +
    '?token=' +
    token;
  return axios.get(url);
}

export function loadAllCourses(token) {
  let url = env.MANAGE_API_URL + '/class/course-lessons?token=' + token;
  return axios.get(url);
}
