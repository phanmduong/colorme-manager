/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as studentApi from '../apis/studentApi';

export function beginDataRegisterListLoad() {
    return {
        type: types.BEGIN_DATA_REGISTER_LIST_LOAD,
        isLoading: true,
        error: false,
        pageSearch: 0,
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

export function beginDataSearchRegisterListLoad() {
    return {
        type: types.BEGIN_DATA_SEARCH_REGISTER_LIST_LOAD,
        isSearchLoading: true,
        errorSearch: false,
        page: 0,
        registerListData: []
    }
}

export function loadDataSearchRegisterList(search, page, token) {
    return function (dispatch) {
        dispatch(beginDataSearchRegisterListLoad());
        studentApi.loadSearchRegisterListApi(search, page, token).then(function (res) {
            dispatch(loadDataSearchSuccessful(page, res));
        }).catch(error => {
            dispatch(loadDataSearchError());
            throw (error);
        })

    }
}

export function loadDataSearchSuccessful(page, res) {
    return ({
        type: types.LOAD_DATA_SEARCH_REGISTER_LIST_SUCCESSFUL,
        registerListData: res.data.registers,
        isSearchLoading: false,
        errorSearch: false,
        pageSearch: page
    })
}

export function loadDataSearchError() {
    return {
        type: types.LOAD_DATA_SEARCH_REGISTER_LIST_ERROR,
        isSearchLoading: false,
        errorSearch: true
    }
}

export function updateDateSearchRegisterListFrom(search) {
    return {
        type: types.UPDATE_DATA_SEARCH_REGISTER_LIST_FROM,
        search: search
    }
}

export function changeSegmentRegisterList(segment) {
    return {
        type: types.CHANGE_SEGMENT_REGISTER_LIST,
        segment: segment
    }
}