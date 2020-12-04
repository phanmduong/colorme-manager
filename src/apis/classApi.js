/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadClassApi(
  sourceCancel,
  search,
  enroll_start_time,
  enroll_end_time,
  lesson_start_time,
  lesson_end_time,
  start_time,
  end_time,
  teacher_id,
  courseId,
  province_id,
  page,
  type,
  status,
  class_status,
  genId,
  baseId,
  token,
) {
  let url =
    env.manageApiUrlV3(domain) +
    '/class/all?search=' +
    search +
    '&enroll_start_time=' +
    enroll_start_time +
    '&enroll_end_time=' +
    enroll_end_time +
    '&lesson_start_time=' +
    lesson_start_time +
    '&lesson_end_time=' +
    lesson_end_time +
    '&start_time=' +
    start_time +
    '&end_time=' +
    end_time +
    '&teacher_id=' +
    teacher_id +
    '&course_id=' +
    courseId +
    '&province_id=' +
    province_id +
    '&page=' +
    page +
    '&type=' +
    type +
    '&status=' +
    status +
    '&class_status=' +
    class_status +
    '&gen_id=' +
    genId +
    '&base_id=' +
    baseId +
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
  let url = env.manageApiUrlV3(domain) + '/class/' + classId + '?token=' + token;
  console.log(url);
  return axios.get(url);
}

export function changeClassStatus(classId, token, domain) {
  let url = env.manageApiUrl(domain) + '/class/change-status?token=' + token;
  return axios.post(url, {
    class_id: classId,
  });
}
