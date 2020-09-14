/**
 * Created by phanmduong on 4/5/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadLoginApi(login, domain) {
  let url = env.apiUrl(domain) + '/login';
  return axios.post(url, {
    email: login.username,
    password: login.password,
  });
}

export function loadCheckDevice(device, token, domain) {
  let url =
    env.manageApiUrl(domain) + '/checkincheckout/check-device?token=' + token;
  return axios.post(url, {
    device_id: device.device_id,
    device_name: device.name,
    device_os: device.os,
  });
}

export function loadDomains() {
  let url = 'http://manage.eduto.net/api/auth/merchant/list';
  return axios.get(url);
}
