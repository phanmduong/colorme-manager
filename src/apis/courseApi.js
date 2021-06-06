/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';
import {isEmptyInput} from '../helper';

export function loadCourseApi(sourceCancel, page, search, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/courses?token=' +
    token +
    '&page=' +
    page +
    '&search=' +
    search +
    '&is_parent=0&limit=20&orderBy=created_at&sortedBy=desc&include=analytics';
  return axios.get(url, {cancelToken: sourceCancel.token});
}

export function changeStatus(id, payload, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) + '/v1/courses/' + id + '?token=' + token;
  return axios.put(url, {
    status: payload.status,
    name: payload.name,
  });
}

export function loadParentCourses(token, domain) {
  let url =
    env.manageApiUrlV4(domain) + '/course/parent-courses?token=' + token;
  return axios.get(url);
}

export function createCourse(data, token, domain) {
  let url = env.manageApiUrlAuth(domain) + '/v1/courses?token=' + token;
  return axios.post(url, {
    color: data.color,
    cover_url: data.cover_url,
    description: data.description,
    duration: data.duration,
    icon_url: data.icon_url,
    linkmac: data.linkmac,
    linkwindow: data.linkwindow,
    mac_how_install: data.mac_how_install,
    name: data.name,
    price: data.price,
    window_how_install: data.window_how_install,
  });
}

export function updateCourse(data, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) + '/v1/courses/' + data.id + '?token=' + token;
  return axios.put(url, {
    color: data.color,
    cover_url: data.cover_url,
    description: data.description,
    duration: data.duration,
    icon_url: data.icon_url,
    linkmac: data.linkmac,
    linkwindow: data.linkwindow,
    mac_how_install: data.mac_how_install,
    name: data.name,
    price: data.price,
    window_how_install: data.window_how_install,
  });
}

export function loadCourseDetails(id, token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/v2/course/get-detailed/' +
    id +
    '?token=' +
    token;
  return axios.get(url);
}

export function addLessonEvent(id, type, token, domain) {
  let url = env.manageApiUrlAuth(domain) + '/v1/lesson-events?token=' + token;
  return axios.post(url, {
    lesson_id: id,
    event_type: type,
  });
}

export function deleteLessonEvent(id, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/lesson-events/' +
    id +
    '?token=' +
    token;
  return axios.delete(url);
}

export function deleteLesson(id, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) + '/v1/lessons/' + id + '?token=' + token;
  return axios.delete(url);
}

export function duplicateLesson(id, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/lessons/' +
    id +
    '/duplicate?token=' +
    token;
  return axios.post(url);
}

export function createLesson(data, token, domain) {
  let url = env.manageApiUrlAuth(domain) + '/v1/lessons?token=' + token;
  return axios.post(url, {
    audio_url: data.audio_url,
    course_id: data.course_id,
    description: data.description,
    detail_teacher: data.detail_teacher,
    image_url: data.image_url,
    name: data.name,
    order: data.order,
    term_id: data.term_id,
    video_url: data.video_url,
  });
}

export function editLesson(data, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) + '/v1/lessons/' + data.id + '?token=' + token;
  return axios.put(url, {
    audio_url: data.audio_url,
    course_id: data.course_id,
    description: data.description,
    detail_teacher: data.detail_teacher,
    image_url: data.image_url,
    name: data.name,
    order: data.order,
    term_id: data.term_id,
    video_url: data.video_url,
  });
}

export function createExam(data, token, domain) {
  let url = env.manageApiUrlV4(domain) + '/exam/template/create?token=' + token;
  return axios.post(url, {
    avatar_url: data.avatar_url,
    course_id: data.course_id,
    deadline: data.deadline,
    description: data.description,
    group_exam_id: data.group_exam_id,
    lesson_id: data.lesson_id,
    title: data.title,
    weight: data.weight,
  });
}

export function uploadImage(
  file,
  completeHandler,
  progressHandler,
  error,
  token,
) {
  let url = env.IMAGE_UPLOAD_URL + '?token=' + token;
  let formData = new FormData();
  formData.append('image', file);
  let ajax = new XMLHttpRequest();
  ajax.addEventListener('load', completeHandler, false);
  ajax.upload.onprogress = progressHandler;
  ajax.addEventListener('error', error, false);
  ajax.open('POST', url);
  ajax.send(formData);
}

export function createLink(data, token, domain) {
  let url =
    env.manageApiUrlV3(domain) + '/v2/course/create-link?token=' + token;
  return axios.post(url, {
    course_id: data.course_id,
    link_description: data.link_description,
    link_name: data.link_name,
    link_url: data.link_url,
  });
}

export function deleteLink(id, token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/v2/course/delete-link/' +
    id +
    '?token=' +
    token;
  return axios.delete(url);
}

export function loadLessons(search, page, course_id, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/lessons?token=' +
    token +
    '&search=' +
    search +
    '&page=' +
    page +
    (!isEmptyInput(course_id) ? '&course_ids[]=' + course_id : '') +
    '&limit=10&orderBy=order&sortedBy=asc';
  return axios.get(url);
}
