/**
 * Created by phanmduong on 4/5/17.
 */
import * as types from '../constants/actionTypes';

export function updateDataLoginForm(login) {
    return{
        type: types.UPDATE_DATA_LOGIN_FORM,
        login: login
    };
}