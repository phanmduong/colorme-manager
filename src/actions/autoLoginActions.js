/**
 * Created by phanmduong on 4/5/17.
 */
import * as types from '../constants/actionTypes';

export function setAutoLogin(status) {
    return {
        type: types.SET_AUTO_LOGIN,
        isAutoLogin: status
    };
}