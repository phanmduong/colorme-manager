import axios from 'axios';
import * as env from '../constants/env';

export function loadScheduleClasses(token, lessonId, domain) {
  let url =
    env.manageApiUrl(domain) +
    '/class/schedule-class-future/' +
    lessonId +
    '?token=' +
    token;
  return axios.get(url);
}

export function loadAllCourses(token, domain) {
  let url = env.manageApiUrl(domain) + '/class/course-lessons?token=' + token;
  return axios.get(url);
}
