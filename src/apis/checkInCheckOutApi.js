import axios from 'axios';
import * as env from '../constants/env';
import {isEmptyInput} from '../helper';

export function checkin(device, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) + '/v1/check-in-check-outs?token=' + token;
  return axios.post(url, {
    type: 'checkin',
    longtitude: device.long,
    latitude: device.lat,
    device_name: device.device_name,
    device_os: device.device_os,
    device_id: device.device_id,
    wifi_name: device.wifiName,
    wifi_mac: device.mac,
  });
}

export function checkout(device, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) + '/v1/check-in-check-outs?token=' + token;
  return axios.post(url, {
    type: 'checkout',
    longtitude: device.long,
    latitude: device.lat,
    device_name: device.device_name,
    device_os: device.device_os,
    device_id: device.device_id,
    wifi_name: device.wifiName,
    wifi_mac: device.mac,
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

export function historyShiftsApi(
  type,
  employee_id,
  start_time,
  end_time,
  token,
  domain,
) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/check-in-check-outs?type=' +
    type +
    (!isEmptyInput(employee_id) ? '&employee_ids[]=' + employee_id : '') +
    '&start_time=' +
    start_time +
    '&end_time=' +
    end_time +
    '&token=' +
    token;
  return axios.get(url);
}
