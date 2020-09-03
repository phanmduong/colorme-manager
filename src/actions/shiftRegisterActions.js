/**
 * Created by phanmduong on 5/1/17.
 */
import * as types from '../constants/actionTypes';
import * as shiftRegisterApi from '../apis/shiftRegisterApi';
import {Alert} from 'react-native';

export function beginDataShiftRegisterLoad() {
  return {
    type: types.BEGIN_DATA_SHIFT_REGISTER_LOAD,
    isLoading: true,
    error: false,
  };
}

export function loadDataShiftRegister(baseId, genId, token) {
  return function (dispatch) {
    dispatch(beginDataShiftRegisterLoad());
    shiftRegisterApi
      .loadShiftRegister(baseId, genId, token)
      .then(function (res) {
        dispatch(loadDataShiftRegisterSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadDataShiftRegisterError());
        throw error;
      });
  };
}

export function loadDataShiftRegisterSuccessful(res) {
  return {
    type: types.LOAD_DATA_SHIFT_REGISTER_SUCCESSFUL,
    shiftRegisterData: res.data.data,
    isLoading: false,
    error: false,
  };
}

export function loadDataShiftRegisterError() {
  return {
    type: types.LOAD_DATA_SHIFT_REGISTER_ERROR,
    isLoading: false,
    error: true,
  };
}

export function updateDataRegister(shift) {
  return {
    type: types.UPDATE_DATA_SHIFT_REGISTER,
    shift: JSON.parse(shift),
  };
}

export function selectedBaseId(baseId) {
  return {
    type: types.SELECTED_BASE_ID_SHIFT_REGISTER,
    selectedBaseId: baseId,
  };
}

export function selectedGenId(genId) {
  return {
    type: types.SELECTED_GEN_ID_SHIFT_REGISTER,
    selectedGenId: genId,
  };
}

export function register(registerId, token) {
  return function (dispatch) {
    dispatch(postShiftRegister(registerId));
    shiftRegisterApi
      .register(registerId, token)
      .then(function (res) {
        if (res.data.status === 1) {
          dispatch(
            updateDataRegister(
              JSON.stringify({
                id: registerId,
                user: res.data.data.user,
              }),
            ),
          );
          dispatch(shiftRegisterSuccessful(registerId, res));
        } else {
          dispatch(
            updateDataRegister(
              JSON.stringify({
                id: registerId,
              }),
            ),
          );
          dispatch(ShiftRegisterError());
          Alert.alert('Thông báo', res.data.message);
        }
      })
      .catch((error) => {
        dispatch(ShiftRegisterError());
        throw error;
      });
  };
}

export function postShiftRegister(registerId) {
  return {
    type: types.POST_SHIFT_REGISTER,
    registerId: registerId,
    isLoadingRegister: true,
    isLoadingRegisterError: false,
  };
}

export function shiftRegisterSuccessful(registerId, res) {
  return {
    type: types.SHIFT_REGISTER_SUCCESSFUL,
    registerId: registerId,
    isLoadingRegister: false,
    isLoadingRegisterError: false,
  };
}

export function ShiftRegisterError(registerId) {
  return {
    type: types.SHIFT_REGISTER_ERROR,
    registerId: registerId,
    isLoadingRegister: false,
    isLoadingRegisterError: true,
  };
}

export function unRegister(registerId, token) {
  return function (dispatch) {
    dispatch(postShiftUnRegister(registerId));
    shiftRegisterApi
      .unregister(registerId, token)
      .then(function (res) {
        dispatch(
          updateDataRegister(
            JSON.stringify({
              id: registerId,
            }),
          ),
        );
        dispatch(shiftUnRegisterSuccessful(registerId, res));
      })
      .catch((error) => {
        dispatch(ShiftUnRegisterError());
        throw error;
      });
  };
}

export function postShiftUnRegister(registerId) {
  return {
    type: types.POST_SHIFT_UNREGISTER,
    registerId: registerId,
    isLoadingUnRegister: true,
    isLoadingUnRegisterError: false,
  };
}

export function shiftUnRegisterSuccessful(registerId, res) {
  return {
    type: types.SHIFT_UNREGISTER_SUCCESSFUL,
    registerId: registerId,
    isLoadingUnRegister: false,
    isLoadingUnRegisterError: false,
  };
}

export function ShiftUnRegisterError(registerId) {
  return {
    type: types.SHIFT_UNREGISTER_ERROR,
    registerId: registerId,
    isLoadingUnRegister: false,
    isLoadingUnRegisterError: true,
  };
}
