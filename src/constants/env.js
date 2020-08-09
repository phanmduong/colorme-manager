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
  } else if (domain.toLowerCase().includes('ieg')) {
    return `http://api.${domainParts[1]}.${domainParts[2]}`;
  } else if (domain.toLowerCase().includes('eduto')) {
    return `http://${domainParts[0]}.${domainParts[1]}.${domainParts[2]}/api/v3`;
  }
}

export function manageApiUrl(domain) {
  let domainParts = domain.split('.');
  if (domain.toLowerCase().includes('colorme')) {
    return `http://manageapi.${domainParts[1]}.${domainParts[2]}`;
  } else if (domain.toLowerCase().includes('ieg')) {
    return `http://manageapi.${domainParts[1]}.${domainParts[2]}`;
  } else if (domain.toLowerCase().includes('eduto')) {
    return `http://${domainParts[0]}.${domainParts[1]}.${domainParts[2]}/manageapi/v3`;
  }
}

export function baseUrl(domain) {
  let domainParts = domain.split('.');
  if (domain.toLowerCase().includes('colorme')) {
    return `https://${domainParts[1]}.${domainParts[2]}`;
  } else if (domain.toLowerCase().includes('ieg')) {
    return `https://${domainParts[1]}.${domainParts[2]}`;
  } else if (domain.toLowerCase().includes('eduto')) {
    return `http://${domainParts[0]}.${domainParts[1]}.${domainParts[2]}`;
  }
}

export function manageApiUrlV3(domain) {
  if (domain.toLowerCase().includes('colorme')) {
    return baseUrl(domain) + '/manageapi/v3';
  } else if (domain.toLowerCase().includes('ieg')) {
    return baseUrl(domain) + '/manageapi/v3';
  } else if (domain.toLowerCase().includes('eduto')) {
    return baseUrl(domain) + '/manageapi/v3';
  }
}

export function apiNodeUrl(domain) {
  let domainParts = domain.split('.');
  if (domain.toLowerCase().includes('colorme')) {
    return `http://${domainParts[1]}.${domainParts[2]}:8000`;
  } else if (domain.toLowerCase().includes('ieg')) {
    return `http://${domainParts[1]}.${domainParts[2]}:8000`;
  } else if (domain.toLowerCase().includes('eduto')) {
    return `http://${domainParts[0]}.${domainParts[1]}.${domainParts[2]}:8000`;
  }
}

export function manageApiUrlV4(domain) {
  if (domain.toLowerCase().includes('colorme')) {
    return baseUrl(domain) + '/manageapi/v4';
  } else if (domain.toLowerCase().includes('ieg')) {
    return baseUrl(domain) + '/manageapi/v4';
  } else if (domain.toLowerCase().includes('eduto')) {
    return baseUrl(domain) + '/manageapi/v4';
  }
}
