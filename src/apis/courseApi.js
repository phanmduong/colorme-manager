/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadCourseApi(sourceCancel, page, search, token) {
  let url =
    env.MANAGE_API_URL_V3 +
    '/v2/course/get-all?token=' +
    token +
    '&page=' +
    page +
    '&search=' +
    search +
    '&only_children=true&is_parent=0&limit=20';
  return axios.get(url, {cancelToken: sourceCancel.token});
}

export function changeStatus(id, status, token) {
  let url =
    env.MANAGE_API_URL_V3 +
    '/v2/course/' +
    id +
    '/change-status?token=' +
    token;
  return axios.put(url, {
    status: status,
  });
}

export function loadParentCourses(token) {
  let url = env.MANAGE_API_URL_V4 + '/course/parent-courses?token=' + token;
  return axios.get(url);
}

export function createCourse(data, token) {
  let url = env.MANAGE_API_URL_V3 + '/v2/course/create-edit?token=' + token;
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

export function loadCourseDetails(id, token) {
  let url =
    env.MANAGE_API_URL_V3 + '/v2/course/get-detailed/' + id + '?token=' + token;
  return axios.get(url);
}
