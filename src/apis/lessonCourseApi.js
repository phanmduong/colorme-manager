/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadLessonCourseApi(courseId, token) {
  let url = env.API_URL + '/courses/' + courseId + '/lessons?token=' + token;
  return axios.get(url);
}

export function loadListStudentAttendanceByLessonApi(
  classID,
  lessonID,
  token,
  domain,
) {
  let url =
    env.manageApiUrlV3(domain) +
    `/v2/course/get-attendance-lesson/${classID}/${lessonID}?c=${
      Math.random() * 10000000000
    }&token=` +
    token;
  return axios.get(url);
}
