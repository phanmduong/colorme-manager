/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';
import {isEmptyInput} from '../helper';

export function loadClassApi(
  sourceCancel,
  page,
  course_id,
  base_id,
  province_id,
  room_id,
  employee_id,
  type,
  enroll_start_date,
  enroll_end_date,
  start_date,
  end_date,
  search,
  token,
  domain,
) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/study-classes?include=course.parent,room,base.district.province,teachers,teaching_assistants,schedule,class_status&limit=20&orderBy=created_at&sortedBy=desc&page=' +
    page +
    (!isEmptyInput(course_id) ? '&course_ids[]=' + course_id : '') +
    (!isEmptyInput(base_id) ? '&base_ids[]=' + base_id : '') +
    (!isEmptyInput(province_id) ? '&province_ids[]=' + province_id : '') +
    (!isEmptyInput(room_id) ? '&room_ids[]=' + room_id : '') +
    (!isEmptyInput(employee_id) ? '&employee_ids[]=' + employee_id : '') +
    (!isEmptyInput(type) ? '&types[]=' + type : '') +
    '&enroll_start_date=' +
    enroll_start_date +
    '&enroll_end_date=' +
    enroll_end_date +
    '&start_date=' +
    start_date +
    '&end_date' +
    end_date +
    '&search=' +
    search +
    '&token=' +
    token;
  return axios.get(url, {cancelToken: sourceCancel.token});
}

export function loadCourseApi(token, domain) {
  let url = env.apiUrl(domain) + '/paid-courses?token=' + token;
  return axios.get(url);
}

export function loadCurrentClassStudyApi(date, token, domain) {
  let url =
    env.baseUrl(domain) +
    '/manageapi/v4/class/by-date-teaching?date=' +
    date +
    '&include=class_lesson.analytics_attendance,class_lesson.lesson,base.district.province,room,course,teacher,teacher_assistant,schedule&token=' +
    token;
  return axios.get(url);
}

export function loadBaseData(token, domain) {
  let url =
    env.baseUrl(domain) +
    '/manageapi/v4/base/all?include=district.province&token=' +
    token;
  return axios.get(url);
}

export function addClass(isEdit, classData, token, domain) {
  if (isEdit) {
    let addUrl =
      env.manageApiUrlAuth(domain) +
      '/v1/study-classes/' +
      classData.id +
      '?include=course.parent,room,base.district.province,teachers,teaching_assistants,schedule,target,register_target,permissions&token=' +
      token;
    return axios.put(addUrl, {
      course_id: classData.course_id,
      datestart: classData.datestart,
      description: classData.description,
      enroll_end_date: classData.enroll_end_date,
      enroll_start_date: classData.enroll_start_date,
      link_drive: classData.link_drive,
      name: classData.name,
      regis_target: classData.regis_target,
      room_id: classData.room_id,
      schedule_id: classData.schedule_id,
      study_time: classData.study_time,
      target: classData.target,
      teacher_ids: classData.teacher_ids,
      teaching_assistant_ids: classData.teaching_assistant_ids,
      type: classData.type,
    });
  } else {
    let addUrl =
      env.manageApiUrlAuth(domain) +
      '/v1/study-classes?include=course.parent,room,base.district.province,teachers,teaching_assistants,schedule,target,register_target,permissions&token=' +
      token;
    return axios.post(addUrl, {
      course_id: classData.course_id,
      datestart: classData.datestart,
      description: classData.description,
      enroll_end_date: classData.enroll_end_date,
      enroll_start_date: classData.enroll_start_date,
      link_drive: classData.link_drive,
      name: classData.name,
      regis_target: classData.regis_target,
      room_id: classData.room_id,
      schedule_id: classData.schedule_id,
      study_time: classData.study_time,
      target: classData.target,
      teacher_ids: classData.teacher_ids,
      teaching_assistant_ids: classData.teaching_assistant_ids,
      type: classData.type,
    });
  }
}

export function loadClassInfo(classId, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/study-classes/' +
    classId +
    '?token=' +
    token;
  return axios.get(url);
}

export function changeClassStatus(classId, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/study-classes/' +
    classId +
    '/change-form-status?include=course.parent,room,base.district.province,teachers,teaching_assistants,schedule,target,register_target,class_status&token=' +
    token;
  return axios.put(url);
}

export function createClassSchedule(name, study_sessions, token, domain) {
  let url = env.manageApiUrlAuth(domain) + '/v1/schedules?token=' + token;
  return axios.post(url, {
    name: name,
    study_sessions: study_sessions,
  });
}

export function loadRooms(token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/rooms?limit=0&orderBy=base_id&sortedBy=asc&token=' +
    token;
  return axios.get(url);
}

export function loadSchedules(search, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/schedules?search=' +
    search +
    '&limit=20&orderBy=name&sortedBy=asc&token=' +
    token;
  return axios.get(url);
}
