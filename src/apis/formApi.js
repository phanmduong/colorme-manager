import * as env from '../constants/env';
import axios from 'axios';

export function getForms(sourceCancel, page, search, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/register-forms?search=' +
    search +
    '&page=' +
    page +
    '&limit=20&token=' +
    token;
  return axios.get(url, {cancelToken: sourceCancel.token});
}

export function createForm(data, token, domain) {
  let url = env.manageApiUrlAuth(domain) + '/v1/register-forms?token=' + token;
  return axios.post(url, {
    base_id: data.base_id,
    course_id: data.course_id,
    data_fields: data.data_fields,
    description: data.description,
    slug: data.slug,
    title: data.title,
  });
}

export function updateForm(data, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/register-forms/' +
    data.id +
    '?token=' +
    token;
  return axios.put(url, {
    base_id: data.base_id,
    course_id: data.course_id,
    data_fields: data.data_fields,
    description: data.description,
    slug: data.slug,
    title: data.title,
    status: 'public',
  });
}

export function duplicateForm(id, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/register-forms/' +
    id +
    '/duplicate?token=' +
    token;
  return axios.post(url);
}

export function deleteForm(id, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/register-forms/' +
    id +
    '?token=' +
    token;
  return axios.delete(url);
}
