/**
 * Created by phanmduong on 4/5/17.
 */
// export const API_URL = 'http://api.colorme.vn';
// export const MANAGE_API_URL = 'http://manageapi.colorme.vn';
// export const BASE_URL = 'https://colorme.vn';
// export const MANAGE_API_URL_V3 = BASE_URL + '/manageapi/v3';
// export const API_NODE_URL = 'http://colorme.vn:8000';

export function apiUrl(domain) {
  return `http://${domain.toLowerCase()}.eduto.net/api/v3`;
}

export function manageApiUrl(domain) {
  return `http://${domain.toLowerCase()}.eduto.net/manageapi/v3`;
}

export function baseUrl(domain) {
  return `http://${domain.toLowerCase()}.eduto.net`;
}

export function manageApiUrlV3(domain) {
  return baseUrl(domain) + '/manageapi/v3';
}

export function apiNodeUrl(domain) {
  return `http://${domain.toLowerCase()}.eduto.net:8000`;
}

export function manageApiUrlV4(domain) {
  return baseUrl(domain) + '/manageapi/v4';
}
// export const API_URL = 'http://api.colorme.vn';
// export const MANAGE_API_URL = 'http://manageapi.colorme.vn';
// export const BASE_URL = 'https://colorme.vn';
// export const MANAGE_API_URL_V3 = BASE_URL + '/manageapi/v3';
// export const API_NODE_URL = 'http://colorme.vn:8000';

export const API_URL = 'http://manage.colorme.vn/api/v3';
export const MANAGE_API_URL = 'http://manage.colorme.vn/manageapi/v3';
export const BASE_URL = 'http://manage.colorme.vn';
export const MANAGE_API_URL_V3 = BASE_URL + '/manageapi/v3';
export const API_NODE_URL = 'http://manage.colorme.vn:8000';
export const MANAGE_API_URL_V4 = BASE_URL + '/manageapi/v4';
export const MANAGE_API_URL_2222 = BASE_URL + ':2222/api/auth';
