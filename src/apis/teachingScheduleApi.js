import * as env from '../constants/env';
import axios from 'axios';

export function loadClassApi(
  baseId,
  courseId,
  teacherId,
  provinceId,
  type,
  startTime,
  endTime,
  token,
  domain,
) {
  let url =
    env.manageApiUrlV3(domain) +
    '/class/all?teacher_id=' +
    teacherId +
    '&course_id=' +
    courseId +
    '&base_id=' +
    baseId +
    '&province_id=' +
    provinceId +
    '&type=' +
    type +
    '&start_time=' +
    startTime +
    '&end_time=' +
    endTime +
    '&limit=-1' +
    '&token=' +
    token;
  return axios.get(url);
}
