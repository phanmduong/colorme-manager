/**
 * Created by phanmduong on 5/1/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadShiftRegister(baseId, genId, token) {
    let url = env.API_URL + "/current-shifts?base_id=" + baseId + "&gen_id=" + genId + "&token=" + token;
    return axios.get(url);
}

export function register(shiftRegisterId, token) {
    let url = env.API_URL + "/register-shift/" + shiftRegisterId + "?token=" + token;
    return axios.post(url);
}

export function unregister(shiftRegisterId, token) {
    let url = env.API_URL + "/remove-shift-regis/" + shiftRegisterId + "?token=" + token;
    return axios.post(url);
}
