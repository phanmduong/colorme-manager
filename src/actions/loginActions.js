/**
 * Created by phanmduong on 4/5/17.
 */
import * as types from '../constants/actionTypes';
import * as loadLoginApi from '../apis/loginApi';
import {AsyncStorage}from 'react-native';
import {NavigationActions} from 'react-navigation';

export function openSceneLogin() {
    return {
        type: types.OPEN_SCENE_LOGIN,
    };
}
export function updateDataLoginForm(login) {
    return {
        type: types.UPDATE_DATA_LOGIN_FORM,
        login: login,
        token: '',
        isLoading: false,
        error: false
    };
}

export function beginLogin() {
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
            dispatch(loginSuccess(res));
            dispatch(openMainScreen(res));
            dispatch(changeStatusBarColor());
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

export function changeStatusBarColor(res) {
    return ({
        type: types.CHANGE_STATUSBAR_COLOR,
        color: 'light-content'
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

export function beginGetDataLogin() {
    return ({
        type: types.BEGIN_GET_DATA_LOGIN,
        isGettingData: true,
        isGetDataError: false
    })
}

export function getDataLogin() {
    return async function (dispatch) {
        dispatch(beginGetDataLogin());
        try {
            const username = await AsyncStorage.getItem('@ColorME:username');
            const password = await AsyncStorage.getItem('@ColorME:password');
            dispatch(gotDataLogin(username, password));
        } catch (error) {
            getDataLoginError();
        }
    };
}

export function gotDataLogin(username, password) {
    return ({
        type: types.GOT_DATA_LOGIN,
        isGettingData: false,
        isGetDataError: false,
        login: {
            username: username,
            password: password
        }
    })
}

export function getDataLoginError() {
    return ({
        type: types.GET_DATA_LOGIN_ERROR,
        isGettingData: false,
        isGetDataError: true
    })
}

export function beginSetDataLogin() {
    return ({
        type: types.BEGIN_SET_DATA_LOGIN,
        isSettingData: true,
        isSetDataError: false
    })
}

export function setDataLogin(login) {
    return async function (dispatch) {
        dispatch(beginSetDataLogin());
        try {
            await AsyncStorage.setItem('@ColorME:username', login.username);
            await AsyncStorage.setItem('@ColorME:password', login.password);
            dispatch(settedDataLogin());
        } catch (error) {
            setDataLoginError();
        }
    };
}

export function settedDataLogin() {
    return ({
        type: types.SETTED_DATA_LOGIN,
        isSettingData: false,
        isSetDataError: false,
    })
}

export function setDataLoginError() {
    return ({
        type: types.SET_DATA_LOGIN_ERROR,
        isSettingData: false,
        isSetDataError: true
    })
}