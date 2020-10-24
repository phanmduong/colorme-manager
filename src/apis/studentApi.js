/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';
import {isEmptyInput} from '../helper';

export function loadRegisterListApi(
  token,
  page = 1,
  search = '',
  salerId = '',
  sourceCancel,
  genId = '',
  campaignId = '',
  classId = '',
  paid_status = '',
  baseId = '',
  appointmentPayment = '',
  class_status = '',
  search_coupon = '',
  bookmark = '',
  tele_call_status = '',
  start_time = '',
  end_time = '',
  source_id = '',
  status_id = '',
  domain,
) {
  let url =
    env.apiUrl(domain) +
    '/register-list?page=' +
    page +
    '&search=' +
    search +
    '&saler_id=' +
    salerId +
    '&gen_id=' +
    genId +
    '&campaign_id=' +
    campaignId +
    '&class_id=' +
    classId +
    '&status=' +
    paid_status +
    '&base_id=' +
    baseId +
    '&appointment_payment=' +
    appointmentPayment +
    '&type=' +
    class_status +
    '&search_coupon=' +
    search_coupon +
    '&bookmark=' +
    bookmark +
    '&tele_call_status=' +
    tele_call_status +
    '&start_time=' +
    start_time +
    '&end_time=' +
    end_time +
    '&registerStatusId=' +
    status_id +
    '&registerSourceId=' +
    source_id +
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
    env.apiUrl(domain) + '/class/' + classId + '/students?token=' + token;
  return axios.get(url);
}

export function loadListStudentClassLessonsApi(classId, token) {
  let url = env.MANAGE_API_URL_V3 + '/class/' + classId + '?token=' + token;
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
