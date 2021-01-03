/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadCourseApi(sourceCancel, page, search, token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/v2/course/get-all?token=' +
    token +
    '&page=' +
    page +
    '&search=' +
    search +
    '&only_children=true&is_parent=0&limit=20';
  return axios.get(url, {cancelToken: sourceCancel.token});
}

export function changeStatus(id, status, token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/v2/course/' +
    id +
    '/change-status?token=' +
    token;
  return axios.put(url, {
    status: status,
  });
}

export function loadParentCourses(token, domain) {
  let url =
    env.manageApiUrlV4(domain) + '/course/parent-courses?token=' + token;
  return axios.get(url);
}

export function createCourse(data, token, domain) {
  let url =
    env.manageApiUrlV3(domain) + '/v2/course/create-edit?token=' + token;
  return axios.post(url, {
    name: data.name,
    description: data.description,
    duration: data.duration,
    price: data.price,
    icon_url: data.icon_url,
    image_url: data.image_url,
    cover_url: data.cover_url,
    front_image: data.front_image,
    back_image: data.back_image,
    linkwindow: data.linkwindow,
    window_how_install: data.window_how_install,
    linkmac: data.linkmac,
    mac_how_install: data.mac_how_install,
    id: data.id,
    categories: JSON.stringify([{}]),
    color: '',
    created_at: '',
    detail: '',
    lessons: [],
    links: [],
    num_classes: '',
    pixels: [],
    terms: [],
    type: '',
    type_id: '',
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

export function changeLessonEvent(id, type, token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/v2/lesson/create-lesson-event?token=' +
    token;
  return axios.post(url, {
    lesson_id: id,
    type: type,
  });
}

export function deleteLesson(id, token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/v2/lesson/delete-lesson/' +
    id +
    '?token=' +
    token;
  return axios.delete(url);
}

export function duplicateLesson(id, token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/v2/lesson/' +
    id +
    '/duplicate?token=' +
    token;
  return axios.post(url);
}

export function createLesson(data, token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/v2/lesson/create-lesson/' +
    data.course_id +
    '?token=' +
    token;
  return axios.post(url, {
    audio_url: data.audio_url,
    course_id: data.course_id,
    description: data.description,
    detail_teacher: data.detail_teacher,
    name: data.name,
    order: data.order,
    term_id: data.term_id,
    video_url: data.video_url,
  });
}

export function editLesson(data, token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/v2/lesson/edit-lesson/' +
    data.id +
    '?token=' +
    token;
  return axios.put(url, {
    audio_url: data.audio_url,
    course_id: data.course_id,
    description: data.description,
    detail_teacher: data.detail_teacher,
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

export function uploadImage(uri, token, domain) {
  let url = env.manageApiUrlV3(domain) + '/file/upload?token=' + token;
  let formData = new FormData();
  formData.append('file', {
    uri: uri,
    type: 'image/jpeg',
    name: 'file',
  });
  return axios({
    method: 'post',
    url: url,
    data: formData,
  });
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
