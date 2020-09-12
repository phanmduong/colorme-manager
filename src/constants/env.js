/**
 * Created by phanmduong on 4/5/17.
 */
export const API_URL = 'http://api.colorme.vn';
export const MANAGE_API_URL = 'http://manageapi.colorme.vn';
export const BASE_URL = 'https://colorme.vn';
export const MANAGE_API_URL_V3 = BASE_URL + '/manageapi/v3';
export const API_NODE_URL = 'http://colorme.vn:8000';

export function apiUrl(domain) {
  let domainParts = domain.split('.');
  return `http://${domainParts[0]}.eduto.net/api/v3`;
}

export function manageApiUrl(domain) {
  let domainParts = domain.split('.');
  return `http://${domainParts[0]}.eduto.net/manageapi/v3`;
}

export function baseUrl(domain) {
  let domainParts = domain.split('.');
  return `http://${domainParts[0]}.eduto.net`;
}

export function manageApiUrlV3(domain) {
  return baseUrl(domain) + '/manageapi/v3';
}

export function apiNodeUrl(domain) {
  let domainParts = domain.split('.');
  return `http://${domainParts[0]}.eduto.net:8000`;
}

export function manageApiUrlV4(domain) {
  return baseUrl(domain) + '/manageapi/v4';
}
