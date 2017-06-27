/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function searchStaffApi(token, search, page = 1, sourceCancel, limit = 20) {
    let url = env.API_URL + "/staffs?q=" + search + "&page=" + page + "&limit=" + limit + "&token=" + token;
    return axios.get(url, {cancelToken: sourceCancel.token});
}
