import axios from 'axios';
import * as env from '../constants/env';

export function checkin(device, token) {
    let url = env.MANAGE_API_URL + "/checkincheckout/check-in?token=" + token;
    console.log(url);
    return axios.post(url, {
        'device_id': device.device_id,
        'long': device.long,
        'lat': device.lat,
        'mac': device.mac,
        'wifi_name': device.wifiName,
    });
}

export function checkout(device, token) {
    let url = env.MANAGE_API_URL + "/checkincheckout/check-out?token=" + token;
    return axios.post(url, {
        'device_id': device.device_id,
        'long': device.long,
        'lat': device.lat,
        'mac': device.mac,
        'wifi_name': device.wifiName,
    });
}