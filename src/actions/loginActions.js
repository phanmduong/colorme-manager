/**
 * Created by phanmduong on 4/5/17.
 */
import * as types from '../constants/actionTypes';
import * as loadLoginApi from '../apis/loginApi';

export function updateDataLoginForm(login) {
    return{
        type: types.UPDATE_DATA_LOGIN_FORM,
        login: login,
        token: '',
        isLoading: false,
        error: false
    };
}

export function beginLogin(){
    return {
        type: types.BEGIN_LOGIN,
        token: '',
        isLoading: true,
        error: false
    }
}

export function loginUser(login) {
    return function (dispatch) {
        dispatch(beginLogin());
        loadLoginApi.loadLoginApi(login).then(function (res) {
            dispatch(updatedLoginForm(res));
        }).catch(error => {
            dispatch(loginError());
            throw (error);
        })

    }
}

export function updatedLoginForm(res) {
    console.log(res);
    let token = res.data.token;
    return ({
        type: types.LOGIN_USER,
        token: token,
        user: res.data.user,
        isLoading: false,
        error: false
    })
}

export function loginError() {
    return {type: types.LOGIN_ERROR,
        token: undefined,
        isLoading: false,
        error: true
    }
}