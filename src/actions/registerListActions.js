/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as studentApi from '../apis/studentApi';

export function beginDataRegisterListLoad() {
    return {
        type: types.BEGIN_DATA_REGISTER_LIST_LOAD,
        isLoading: true,
        error: false
    }
}

export function loadDataRegisterList(page, token) {
    return function (dispatch) {
        dispatch(beginDataRegisterListLoad());
        studentApi.loadRegisterListApi(page, token).then(function (res) {
            dispatch(loadDataSuccessful(page, res));
        }).catch(error => {
            dispatch(loadDataError());
            throw (error);
        })

    }
}

export function loadDataSuccessful(page, res) {
    return ({
        type: types.LOAD_DATA_REGISTER_LIST_SUCCESSFUL,
        registerListData: res.data.registers,
        isLoading: false,
        error: false,
        page: page
    })
}

export function loadDataError() {
    return {
        type: types.LOAD_DATA_REGISTER_LIST_ERROR,
        isLoading: false,
        error: true
    }
}