/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function searchStaffApi(token, search, page = 1, sourceCancel, limit = 20) {
    let url = env.API_URL + "/staffs?q=" + search + "&page=" + page + "&limit=" + limit + "&token=" + token;
    return axios.get(url, {cancelToken: sourceCancel.token});
}

export function getTransactionApi(token, page = 1, limit = 20) {
    let url = env.API_URL + "/transactions?page=" + page + "&limit=" + limit + "&token=" + token;
    return axios.get(url);
}


export function postTransactionApi(receiverId, token) {
    let url = env.MANAGE_API_URL_V3 + "/finance/create-transaction?token=" + token;
    return axios.post(url, {
        receiver_id: receiverId,
    });
}

export function conformTransactionApi(transactionId, status, token) {
    let url = env.MANAGE_API_URL_V3 + "/finance/confirm-transaction?token=" + token;
    return axios.post(url, {
        transaction_id: transactionId,
        status: status
    });
}
