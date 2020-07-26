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
  if (domain.toLowerCase().includes('colorme')) {
    return `http://api.${domainParts[1]}.${domainParts[2]}`;
  }
}

export function manageApiUrl(domain) {
  if (domain.toLowerCase().includes('colorme')) {
    return `http://${domain}`;
  }
}

export function baseUrl(domain) {
  let domainParts = domain.split('.');
  if (domain.toLowerCase().includes('colorme')) {
    return `https://${domainParts[1]}.${domainParts[2]}`;
  }
}

export function manageApiUrlV3(domain) {
  if (domain.toLowerCase().includes('colorme')) {
    return baseUrl(domain) + '/manageapi/v3';
  }
}

export function apiNodeUrl(domain) {
  let domainParts = domain.split('.');
  if (domain.toLowerCase().includes('colorme')) {
    return `http://${domainParts[1]}.${domainParts[2]}:8000`;
  }
}
