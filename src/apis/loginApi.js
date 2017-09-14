/**
 * Created by phanmduong on 4/5/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadLoginApi(login) {
    let url = env.API_URL + "/login";
    return axios.post(url, {
        email: login.username,
        password: login.password
    });
}

export function loadCheckDevice(device, token) {
    let url = env.MANAGE_API_URL + "/checkincheckout/check-device?token=" + token;
    return axios.post(url, {
        'device_id': device.device_id,
        'device_name': device.name,
        'device_os': device.os,
    });
}