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

export function infoCreateClass(token, domain) {
  let url =
    env.manageApiUrl(domain) + '/class/info-create-class?token=' + token;
  return axios.get(url);
}

export function addClass(classData, token, domain) {
  let url = env.manageApiUrl(domain) + '/class/store-class?token=' + token;
  return axios.post(url, {
    id: classData.id,
    datestart: classData.datestart,
    name: classData.name,
    schedule_id: classData.schedule_id,
    room_id: classData.room_id,
    description: classData.description,
    link_drive: classData.link_drive,
    gen_id: classData.gen_id,
    target: classData.target,
    regis_target: classData.regis_target,
    course_id: classData.course_id,
    teaching_assistant_id: classData.teaching_assistant_id,
    teacher_id: classData.teacher_id,
    study_time: classData.study_time,
    type: classData.type,
    status: classData.status,
    teachers: classData.teachers,
    teaching_assistants: classData.teaching_assistants,
    enroll_start_date: classData.enroll_start_date,
    enroll_end_date: classData.enroll_end_date,
    date_end: classData.date_end,
  });
}

export function loadClassInfo(classId, token, domain) {
  let url =
    env.manageApiUrlV3(domain) + '/class/' + classId + '?token=' + token;
  console.log(url);
  return axios.get(url);
}

export function changeClassStatus(classId, token, domain) {
  let url = env.manageApiUrl(domain) + '/class/change-status?token=' + token;
  return axios.post(url, {
    class_id: classId,
  });
}

export function createClassSchedule(name, study_sessions, token) {
  let url = env.MANAGE_API_URL_V4 + '/schedule/create?token=' + token;
  return axios.post(url, {
    name: name,
    study_sessions: study_sessions,
  });
}
