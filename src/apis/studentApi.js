/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadRegisterListApi(page, token) {
    let url = env.API_URL + "/register-list?page=" + page + "&token=" + token;
    console.log(url);
    return axios.get(url);
}

export function loadSearchRegisterListApi(search, page, token) {
    let url = env.API_URL + "/register-list?page=" + page + "&search=" + search + "&token=" + token;
    console.log(url);
    return axios.get(url);
}

export function loadListStudentClassApi(classId, token) {
    let url = env.API_URL + "/class/" + classId + "/students?token=" + token;
    return axios.get(url);
}



