import axios from 'axios';
import * as env from '../constants/env';

export function checkin(device, token, domain) {
  let url = env.manageApiUrl(domain) + '/checkincheckout/check-in?token=' + token;
  console.log(url);
  return axios.post(url, {
    device_id: device.device_id,
    long: device.long,
    lat: device.lat,
    mac: device.mac,
    wifi_name: device.wifiName,
  });
}

export function checkout(device, token, domain) {
  let url = env.manageApiUrl(domain) + '/checkincheckout/check-out?token=' + token;
  return axios.post(url, {
    device_id: device.device_id,
    long: device.long,
    lat: device.lat,
    mac: device.mac,
    wifi_name: device.wifiName,
  });
}

export function historyAttendanceShiftApi(baseID, genID, token, domain) {
  let url =
    env.manageApiUrl(domain) +
    '/checkincheckout/history-checkin-checkout-shifts?token=' +
    token;
  return axios.get(url, {
    params: {
      gen_id: genID,
      base_id: baseID,
    },
  });
}

export function historyAttendanceWorkShiftApi(baseID, genID, token, domain) {
  let url =
    env.manageApiUrl(domain) +
    '/checkincheckout/history-checkin-checkout-work-shifts?token=' +
    token;
  return axios.get(url, {
    params: {
      gen_id: genID,
      base_id: baseID,
    },
  });
}

export function historyAttendanceTeacherApi(genID, token, domain) {
  let url =
    env.manageApiUrl(domain) +
    '/checkincheckout/history-checkin-checkout-teachers?token=' +
    token;
  return axios.get(url, {
    params: {
      gen_id: genID,
    },
  });
}
