/**
 * Created by phanmduong on 4/5/17.
 */
import * as types from '../constants/actionTypes';
import * as loadLoginApi from '../apis/loginApi';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import OneSignal from 'react-native-onesignal';

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
    error: false,
  };
}

export function loginUser(login, domain, openMainScreen, logout) {
  let device = {
    device_id: DeviceInfo.getUniqueID(),
    name: DeviceInfo.getModel(),
    os: DeviceInfo.getBrand() + ' - ' + DeviceInfo.getSystemVersion(),
  };
  return function (dispatch) {
    dispatch(beginLogin());
    loadLoginApi
      .loadLoginApi(login)
      .then(function (res) {
        loadLoginApi
          .loadCheckDevice(device, res.data.token, domain)
          .then(function (resCheckDevice) {
            if (resCheckDevice.data.status === 0) {
              dispatch(
                loginSuccess(
                  res,
                  false,
                  resCheckDevice.data.message.device_user,
                ),
              );
            } else {
              dispatch(loginSuccess(res, true));
            }
            if (res.data.user.role > 0) {
              openMainScreen();
            }
            // dispatch(openMainScreen(res));
            // dispatch(changeStatusBarColor('default'));
            dispatch(changeStatusTransaction(res.data.user));
          });
      })
      .catch((error) => {
        if (logout) {
          logout();
        }
        dispatch(loginError());
      });
  };
}

export function openMainScreen(res) {
  if (res.data.user.role > 0) {
    return {
      type: types.LOGIN,
    };
  }
}

export function logout() {
  return {
    type: types.LOGOUT,
  };
}

export function changeStatusBarColor(color) {
  return {
    type: types.CHANGE_STATUSBAR_COLOR,
    color: color,
  };
}

export function loginSuccess(res, isCheckIn = true, deviceUser = {}) {
  let token = res.data.token;
  OneSignal.sendTags({user_id: res.data.user ? res.data.user.id : 0});
  return {
    type: types.LOGIN_USER,
    token: token,
    user: res.data.user,
    isCheckIn: isCheckIn,
    deviceUser: deviceUser,
    isLoading: false,
    error: false,
  };
}

export function loginError() {
  return {
    type: types.LOGIN_ERROR,
    token: undefined,
    isLoading: false,
    error: true,
  };
}

export function getDataLogin() {
  return async function (dispatch) {
    try {
      const username = await AsyncStorage.getItem('@ColorME:username');
      const password = await AsyncStorage.getItem('@ColorME:password');
      const domain = await AsyncStorage.getItem('@ColorME:domain');
      dispatch(gotDataLogin(username, password, domain));
    } catch (error) {}
  };
}

export function gotDataLogin(username, password, domain) {
  return {
    type: types.GOT_DATA_LOGIN,
    login: {
      username: username,
      password: password,
    },
    domain: {
      manageApiUrl: domain,
    },
    isGetDataLocalSuccessful: true,
  };
}

function changeStatusTransaction(user) {
  let status = user.status === 2;
  return {
    type: types.CHANGE_STATUS_TRANSACTION,
    isLoadingTransaction: status,
    currentMoney: user.money,
  };
}

export function setDataLogin(login, domain) {
  return async function () {
    try {
      await AsyncStorage.setItem('@ColorME:username', login.username);
      await AsyncStorage.setItem('@ColorME:password', login.password);
      await AsyncStorage.setItem('@ColorME:domain', domain);
    } catch (error) {}
  };
}
