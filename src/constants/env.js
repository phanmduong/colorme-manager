/**
 * Created by phanmduong on 4/5/17.
 */
export const API_URL = 'http://api.colorme.vn';
export const MANAGE_API_URL = 'http://manageapi.colorme.vn';
export const BASE_URL = 'https://colorme.vn';
export const MANAGE_API_URL_V3 = BASE_URL + '/manageapi/v3';
export const API_NODE_URL = 'http://colorme.vn:8000';

export function manageApiUrl(domain) {
  return `http://${domain}`;
}

export function apiUrl(domain) {
  let domainParts = domain.split('.');
  return `http://api.${domainParts[1]}.${domainParts[2]}`;
}
