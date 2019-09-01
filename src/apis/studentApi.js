/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadRegisterListApi(
  token,
  page = 1,
  search = '',
  salerId = '',
  sourceCancel,
) {
  let url =
    env.API_URL +
    '/register-list?page=' +
    page +
    '&search=' +
    search +
    '&saler_id=' +
    salerId +
    '&token=' +
    token;
  return axios.get(url, {cancelToken: sourceCancel.token});
}

export function loadStudentListByFilterApi(genId, baseId, filter) {
  let url =
    baseId >= 0
      ? `${env.API_NODE_URL}/students/${genId}/${filter}?base_id=${baseId}`
      : `${env.API_NODE_URL}/students/${genId}/${filter}`;
  return axios.get(url);
}

export function loadListStudentClassApi(classId, token) {
  let url = env.API_URL + '/class/' + classId + '/students?token=' + token;
  return axios.get(url);
}

export function searchStudentApi(
  sourceCancel,
  search,
  token,
  page,
  limit = 20,
) {
  let url =
    env.API_URL +
    '/students?search=' +
    search +
    '&page=' +
    page +
    '&limit=' +
    limit +
    '&token=' +
    token;
  return axios.get(url, {cancelToken: sourceCancel.token});
}

export function searchStudentRegisterApi(sourceCancel = {}, search, token) {
  let url =
    env.API_URL + '/v2/search-registers?search=' + search + '&token=' + token;
  return axios.get(url, {cancelToken: sourceCancel.token});
}

export function uploadImage(file, completeHandler, id, imageField, token) {
  let url = env.MANAGE_API_URL + '/upload-image-user';
  if (token) {
    url += '?token=' + token;
  }
  let formdata = new FormData();
  formdata.append(imageField, file);
  formdata.append('id', id);
  formdata.append('image', imageField);
  let ajax = new XMLHttpRequest();
  ajax.addEventListener('load', completeHandler, false);
  ajax.open('POST', url);
  ajax.send(formdata);
}
