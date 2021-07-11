import * as env from '../constants/env';
import axios from 'axios';
import {isEmptyInput} from '../helper';

export function loadClassApi(
  search,
  startTime,
  endTime,
  courseId,
  type,
  baseId,
  provinceId,
  roomId,
  employeeId,
  enrollStartDate,
  enrollEndDate,
  token,
  domain,
) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/class-lessons?include=study_class.course&search=' +
    search +
    '&start_time=' +
    startTime +
    '&end_time=' +
    endTime +
    (!isEmptyInput(courseId) ? '&course_ids[]=' + courseId : '') +
    (!isEmptyInput(type) ? '&types[]=' + type : '') +
    (!isEmptyInput(baseId) ? '&base_ids[]=' + baseId : '') +
    (!isEmptyInput(provinceId) ? '&province_ids[]=' + provinceId : '') +
    (!isEmptyInput(roomId) ? '&room_ids[]=' + roomId : '') +
    (!isEmptyInput(employeeId) ? '&employee_ids[]=' + employeeId : '') +
    '&enroll_start_date=' +
    enrollStartDate +
    '&enroll_end_date=' +
    enrollEndDate +
    '&token=' +
    token;
  return axios.get(url);
}
