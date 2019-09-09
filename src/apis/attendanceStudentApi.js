/**
 * Created by phanmduong on 4/7/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function getInfoStudentApi(studentCode, token) {
  let url = env.API_URL + '/studentcode/' + studentCode + '?token=' + token;
  return axios.get(url);
}

export function postAttendanceStudentApi(attendanceId, token) {
  let url = env.API_URL + '/attendances/' + attendanceId + '?token=' + token;
  return axios.post(url, {
    status: 1,
    hw_status: 1,
  });
}

export function studentChangeStatusBlock(studentId, token, status) {
  let url = env.API_URL + '/student-change-status-block/' + studentId + '?token=' + token;
  return axios.put(url, {status});
}
