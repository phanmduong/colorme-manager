import axios from 'axios';
import * as env from '../constants/env';

export function saveRegisterApi(token, register, domain) {
  let url = env.manageApiUrl(domain) + '/v2/register?token=' + token;
  return axios.post(url, {
    name: register.name,
    phone: register.phone,
    email: register.email,
    class_id: register.class_id,
    coupon: register.coupon,
    dob: register.dob,
    address: register.address,
    facebook: register.facebook,
    gender: register.gender,
    how_know: register.how_know,
    university: register.university,
    work: register.work,
    campaign_id: register.campaign_id,
    description: register.description,
    father_name: register.father_name,
    saler_id: register.saler_id,
    course_id: register.course_id,
    status_id: register.status_id,
    source_id: register.source_id,
    base_id: register.base_id,
  });
}

export function loadCoursesApi(token, domain) {
  let url = env.apiUrl(domain) + '/paid-courses?token=' + token;
  return axios.get(url);
}

export function loadClassesApi(token, course_id, domain) {
  let url =
    env.manageApiUrl(domain) + '/v2/course/' + course_id + '/class?token=' + token;
  return axios.get(url);
}

export function loadCampaigns(token, domain) {
  let url =
    env.manageApiUrl(domain) + '/marketing-campaign/all?limit=34&token=' + token;
  return axios.get(url);
}

export function loadProvinces(token, domain) {
  let url = env.manageApiUrl(domain) + '/province/all?token=' + token;
  return axios.get(url);
}

export function loadSources(token, domain) {
  let url = env.manageApiUrl(domain) + '/source/all?token=' + token;
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
    env.manageApiUrlV4(domain) +
    '/class/find-by-name?include=course&search=' +
    search +
    '&token=' +
    token;
  return axios.get(url);
}
