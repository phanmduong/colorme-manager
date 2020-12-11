import * as env from '../constants/env';
import axios from 'axios';

export function getForms(sourceCancel, page, search, token) {
  let url =
    env.MANAGE_API_URL_2222 +
    '/v1/register-forms?search=' +
    search +
    '&page=' +
    page +
    '&token=' +
    token;
  return axios.get(url, {cancelToken: sourceCancel.token});
}

export function createForm(data, token) {
  let url = env.MANAGE_API_URL_2222 + '/v1/register-forms?token=' + token;
  return axios.post(url, {
    base_id: data.base_id,
    course_id: data.course_id,
    data_fields: data.data_fields,
    description: data.description,
    slug: data.slug,
    title: data.title,
  });
}

export function updateForm(data, token) {
  let url =
    env.MANAGE_API_URL_2222 +
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
