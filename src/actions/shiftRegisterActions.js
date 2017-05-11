/**
 * Created by phanmduong on 5/1/17.
 */
import * as types from '../constants/actionTypes';
import * as shiftRegisterApi from '../apis/shiftRegisterApi';

export function beginDataShiftRegisterLoad() {
    return {
        type: types.BEGIN_DATA_SHIFT_REGISTER_LOAD,
        isLoading: true,
        error: false
    }
}

export function loadDataShiftRegister(baseId, genId, token) {
    return function (dispatch) {
        dispatch(beginDataShiftRegisterLoad());
        shiftRegisterApi.loadShiftRegister(baseId, genId, token).then(function (res) {
            dispatch(loadDataShiftRegisterSuccessful(res));
        }).catch(error => {
            dispatch(loadDataShiftRegisterError());
            throw (error);
        })
    }
}

export function loadDataShiftRegisterSuccessful(res) {
    return ({
        type: types.LOAD_DATA_SHIFT_REGISTER_SUCCESSFUL,
        shiftRegisterData: res.data.data,
        isLoading: false,
        error: false
    })
}

export function loadDataShiftRegisterError() {
    return {
        type: types.LOAD_DATA_SHIFT_REGISTER_ERROR,
        isLoading: false,
        error: false
    }
}

export function selectedBaseId(baseId) {
    return {
        type: types.SELECTED_BASE_ID_SHIFT_REGISTER,
        selectedBaseId: baseId
    }
}

export function selectedGenId(genId) {
    return {
        type: types.SELECTED_GEN_ID_SHIFT_REGISTER,
        selectedGenId: genId
    }
}