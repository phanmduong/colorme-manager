import axios from 'axios';
import * as env from '../constants/env';
import {isEmptyInput} from '../helper';

export function saveRegisterApi(token, register, domain) {
  let url = env.manageApiUrlAuth(domain) + '/v1/registers?token=' + token;
  return axios.post(url, {
    name: register.name,
    phone: register.phone,
    email: register.email,
    class_id: register.class_id,
    dob: register.dob,
    facebook: register.facebook,
    gender: register.gender,
    how_know: register.how_know,
    university: register.university,
    work: register.work,
    campaign_id: register.campaign_id,
    father_name: register.father_name,
    saler_id: register.saler_id,
    status_id: register.status_id,
    source_id: register.source_id,
    coupon_ids: register.coupon_ids,
    identity_code: register.identity_code,
    mother_name: register.mother_name,
    nationality: register.nationality,
  });
}

export function loadCoursesApi(token, domain) {
  let url = env.apiUrl(domain) + '/paid-courses?token=' + token;
  return axios.get(url);
}

export function loadClassesApi(course_id, base_id, search, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/study-classes?limit=15&orderBy=created_at&sortedBy=desc' +
    (!isEmptyInput(course_id) ? '&course_ids[]=' + course_id : '') +
    (!isEmptyInput(base_id) ? '&base_ids[]=' + base_id : '') +
    '&search=' +
    search +
    '&token=' +
    token;
  return axios.get(url);
}

export function loadCampaigns(token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/marketing-campaigns?orderBy=name&sortedBy=asc&token=' +
    token;
  return axios.get(url);
}

export function loadProvinces(token, domain) {
  let url = env.manageApiUrl(domain) + '/province/all?token=' + token;
  return axios.get(url);
}

export function loadSources(token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/sources?orderBy=name&sortedBy=asc&token=' +
    token;
  return axios.get(url);
}

export function loadStatuses(ref, token, domain) {
  let url =
    env.manageApiUrlV4(domain) + '/statuses/all?ref=' + ref + '&token=' + token;
  return axios.get(url);
}

export function loadSalers(token, domain) {
  let url = env.apiUrl(domain) + '/all-saler?token=' + token;
  return axios.get(url);
}

export function loadFilterClasses(search, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/study-classes?limit=15&orderBy=created_at&sortedBy=desc&search=' +
    search +
    '&token=' +
    token;
  return axios.get(url);
}

export function loadCoupons(token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/coupons?limit=25&orderBy=created_at&sortedBy=desc&token=' +
    token;
  return axios.get(url);
}
