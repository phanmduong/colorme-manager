/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';
import {isEmptyInput} from '../helper';

export function loadRegisterListApi(
  sourceCancel,
  page = 1,
  search = '',
  note = '',
  employee_ids = '',
  course_ids = '',
  base_ids = '',
  province_ids = '',
  status_ids = '',
  class_ids = '',
  source_ids = '',
  campaign_ids = '',
  coupon_ids = '',
  class_types = '',
  call_statuses = '',
  tuition_status = '',
  bookmark = '',
  call_back_time_start_time = '',
  call_back_time_end_time = '',
  appointment_payment_start_time = '',
  appointment_payment_end_time = '',
  start_time = '',
  end_time = '',
  orderBy = 'registers.created_at',
  sortedBy = 'desc',
  token,
  domain,
) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/registers?page=' +
    page +
    '&search=' +
    search +
    '&note=' +
    note +
    (!isEmptyInput(employee_ids) ? '&employee_ids[]=' + employee_ids : '') +
    (!isEmptyInput(course_ids) ? '&course_ids[]=' + course_ids : '') +
    (!isEmptyInput(base_ids) ? '&base_ids[]=' + base_ids : '') +
    (!isEmptyInput(province_ids) ? '&province_ids[]=' + province_ids : '') +
    (!isEmptyInput(status_ids) ? '&status_ids[]=' + status_ids : '') +
    (!isEmptyInput(class_ids) ? '&class_ids[]=' + class_ids : '') +
    (!isEmptyInput(source_ids) ? '&source_ids[]=' + source_ids : '') +
    (!isEmptyInput(campaign_ids) ? '&campaign_ids[]=' + campaign_ids : '') +
    (!isEmptyInput(coupon_ids) ? '&coupon_ids[]=' + coupon_ids : '') +
    (!isEmptyInput(class_types) ? '&class_types[]=' + class_types : '') +
    (!isEmptyInput(call_statuses) ? '&call_statuses[]=' + call_statuses : '') +
    '&tuition_status=' +
    tuition_status +
    '&bookmark=' +
    bookmark +
    '&call_back_time_start_time=' +
    call_back_time_start_time +
    '&call_back_time_end_time=' +
    call_back_time_end_time +
    '&appointment_payment_start_time=' +
    appointment_payment_start_time +
    '&appointment_payment_end_time=' +
    appointment_payment_end_time +
    '&start_time=' +
    start_time +
    '&end_time=' +
    end_time +
    '&orderBy=' +
    orderBy +
    '&sortedBy=' +
    sortedBy +
    '&limit=15' +
    '&token=' +
    token;
  return axios.get(url, {cancelToken: sourceCancel.token});
}

export function loadStudentListByFilterApi(genId, baseId, filter, domain) {
  let url =
    baseId >= 0
      ? `${env.apiNodeUrl(
          domain,
        )}/students/${genId}/${filter}?base_id=${baseId}`
      : `${env.apiNodeUrl(domain)}/students/${genId}/${filter}`;
  return axios.get(url);
}

export function loadListStudentClassApi(classId, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/registers?include=attendances&limit=0&orderBy=registers.created_at&sortedBy=desc&token=' +
    token +
    '&class_ids[]=' +
    classId;
  return axios.get(url);
}

export function loadListStudentClassLessonsApi(page, classId, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/class-lessons?include=lesson.exam_templates&orderBy=order&sortedBy=asc&limit=100&class_ids[]=' +
    classId +
    '&page=' +
    page +
    '&token=' +
    token;
  return axios.get(url);
}

export function searchStudentRegisterApi(
  sourceCancel = {},
  search,
  token,
  domain,
) {
  let url =
    env.apiUrl(domain) +
    '/v2/search-registers?search=' +
    search +
    '&token=' +
    token;
  return axios.get(url, {cancelToken: sourceCancel.token});
}

export function uploadImage(
  file,
  completeHandler,
  id,
  imageField,
  token,
  error,
  domain,
) {
  let url = env.manageApiUrl(domain) + '/upload-image-user';
  if (token) {
    url += '?token=' + token;
  }
  let formdata = new FormData();
  formdata.append(imageField, file);
  formdata.append('id', id);
  formdata.append('image', imageField);
  let ajax = new XMLHttpRequest();
  ajax.addEventListener('load', completeHandler, false);
  ajax.addEventListener('error', error);
  ajax.open('POST', url);
  ajax.send(formdata);
}

export function loadStatuses(ref, token, domain) {
  let url =
    env.manageApiUrlV4(domain) + '/statuses/all?token=' + token + '&ref=' + ref;
  return axios.get(url);
}

export function loadAvailableClasses(registerId, search, token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/register-student/' +
    registerId +
    '/classes_without_waiting?search=' +
    search +
    '&token=' +
    token;
  return axios.get(url);
}

export function changeClass(classId, registerId, token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/register-student/confirm-change-class?token=' +
    token;
  return axios.post(url, {
    class_id: classId,
    register_id: registerId,
  });
}

export function loadCourses(token, domain) {
  let url = env.manageApiUrlV3(domain) + '/v2/course/all?token=' + token;
  return axios.get(url);
}

export function changeClassLessons(classLessons, token, domain) {
  let url =
    env.manageApiUrlV3(domain) + '/class/change-class-lessons?token=' + token;
  return axios.put(url, {
    classLessons,
  });
}

export function changeClassLesson(lesson, token, domain) {
  let url =
    env.manageApiUrlV3(domain) + '/class/change-class-lesson?token=' + token;
  return axios.put(url, {
    id: lesson.id,
    note: lesson.note,
    time: lesson.time,
  });
}

export function changeTeacher(changedData, token, domain) {
  let url = env.manageApiUrlV3(domain) + '/class/change-teacher?token=' + token;
  return axios.put(url, {
    id: changedData.id,
    is_teacher_replace: changedData.is_teacher_replace,
    note: changedData.note,
    staff_id: changedData.staff_id,
  });
}

export function changeAssist(changedData, token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/class/change-teaching-assistant?token=' +
    token;
  return axios.put(url, {
    id: changedData.id,
    is_teaching_assistant_replace: changedData.is_teaching_assistant_replace,
    note: changedData.note,
    staff_id: changedData.staff_id,
  });
}
