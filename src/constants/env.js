/**
 * Created by phanmduong on 4/5/17.
 */

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

export function manageApiUrlAuth(domain) {
  return `https://${domain.toLowerCase()}.eduto.net/api/auth`;
}
