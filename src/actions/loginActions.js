/**
 * Created by phanmduong on 4/5/17.
 */
import * as types from '../constants/actionTypes';
import * as loadLoginApi from '../apis/loginApi';
import {AsyncStorage}from 'react-native';

export function updateDataLoginForm(login) {
    return {
        type: types.UPDATE_DATA_LOGIN_FORM,
        login: Object.assign({}, login),
    };
}

export function beginLogin() {
    return {
        type: types.BEGIN_LOGIN,
        token: undefined,
        isLoading: true,
        error: false
    }
}

export function loginUser(login) {
    return function (dispatch) {
        dispatch(beginLogin());
        loadLoginApi.loadLoginApi(login).then(function (res) {
            dispatch(loginSuccess(res));
            dispatch(openMainScreen(res));
            dispatch(changeStatusBarColor('light-content'));
            dispatch(changeStatusTransaction(res.data.user));
        }).catch(error => {
            dispatch(loginError());
            throw (error);
        })

    }
}

export function openMainScreen(res) {
    if (res.data.user.role > 0) {
        return ({
            type: types.LOGIN
        });
    }
}


export function logout() {
        return ({
            type: types.LOGOUT
        });
}

export function changeStatusBarColor(color) {
    return ({
        type: types.CHANGE_STATUSBAR_COLOR,
        color: color
    })
}

export function loginSuccess(res) {
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
    return {
        type: types.LOGIN_ERROR,
        token: undefined,
        isLoading: false,
        error: true
    }
}

export function getDataLogin() {
    return async function (dispatch) {
        try {
            const username = await AsyncStorage.getItem('@ColorME:username');
            const password = await AsyncStorage.getItem('@ColorME:password');
            dispatch(gotDataLogin(username, password));
        } catch (error) {
        }
    };
}

export function gotDataLogin(username, password) {
    return ({
        type: types.GOT_DATA_LOGIN,
        login: {
            username: username,
            password: password
        },
        isGetDataLocalSuccessful: true
    })
}

function changeStatusTransaction(user) {
    let status = (user.status === 2);
    return ({
        type: types.CHANGE_STATUS_TRANSACTION,
        isLoadingTransaction: status,
        currentMoney: user.money
    });
}


export function setDataLogin(login) {
    return async function () {
        try {
            await AsyncStorage.setItem('@ColorME:username', login.username);
            await AsyncStorage.setItem('@ColorME:password', login.password);
        } catch (error) {
        }
    };
}