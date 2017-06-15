/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadRegisterListApi(token, page = 1, search = '', salerId = '', sourceCancel) {
    let url = env.API_URL + "/register-list?page=" + page + "&search=" + search + "&saler_id=" + salerId + "&token=" + token;
    return axios.get(url, {cancelToken: sourceCancel.token});
}

export function loadListStudentClassApi(classId, token) {
    let url = env.API_URL + "/class/" + classId + "/students?token=" + token;
    return axios.get(url);
}

export function searchStudentApi(sourceCancel, search, token, page, limit = 20) {
    let url = env.API_URL + "/students?search=" + search + "&page=" + page + "&limit=" + limit + "&token=" + token;
    console.log(url);
    return axios.get(url, {cancelToken: sourceCancel.token});
}

export function searchStudentRegisterApi(sourceCancel, search, token) {
    let url = env.API_URL + "/v2/search-registers?search=" + search + "&token=" + token;
    console.log(url);
    return axios.get(url, {cancelToken: sourceCancel.token});
}



