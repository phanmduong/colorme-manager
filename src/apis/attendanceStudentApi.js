/**
 * Created by phanmduong on 4/7/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function getInfoStudentApi(studentCode, token, domain) {
  let url =
    env.apiUrl(domain) + '/studentcode/' + studentCode + '?token=' + token;
  return axios.get(url);
}

export function postAttendanceStudentApi(attendanceId, token, domain) {
  let url =
    env.apiUrl(domain) + '/attendances/' + attendanceId + '?token=' + token;
  return axios.post(url, {
    status: 1,
    hw_status: 1,
  });
}

export function studentChangeStatusBlock(studentId, token, status, domain) {
  let url =
    env.apiUrl(domain) +
    '/student-change-status-block/' +
    studentId +
    '?token=' +
    token;
  return axios.put(url, {status});
}

export function changeAttendances(attendances, token, domain) {
  let url =
    env.manageApiUrlV3(domain) + '/v2/course/change-attendances?token=' + token;
  return axios.post(url, {
    attendances: attendances,
  });
}
