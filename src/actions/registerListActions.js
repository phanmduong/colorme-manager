/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as studentApi from '../apis/studentApi';
import axios from 'axios';
let CancelToken = axios.CancelToken;
let sourceCancelAll = CancelToken.source();
let sourceCancelMy = CancelToken.source();

export function beginDataRegisterListLoadAll() {
    return {
        type: types.BEGIN_DATA_REGISTER_LIST_LOAD_ALL,
        isLoadingAll: true,
        errorAll: false,
    }
}

export function loadDataRegisterListAll(token, page, search) {
    return function (dispatch) {
        dispatch(beginDataRegisterListLoadAll());
        studentApi.loadRegisterListApi(token, page, search, '', sourceCancelAll).then(function (res) {
            dispatch(loadDataSuccessfulAll(res));
        }).catch(error => {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            } else {
                dispatch(loadDataErrorAll());
                throw (error);
            }

        })
    }
}

export function loadDataSuccessfulAll(res) {
    return ({
        type: types.LOAD_DATA_REGISTER_LIST_SUCCESSFUL_ALL,
        registerListDataAll: res.data.registers,
        currentPageAll: res.data.paginator.current_page,
        totalPageAll: res.data.paginator.total_pages,
        isLoadingAll: false,
        errorAll: false,
    })
}

export function loadDataErrorAll() {
    return {
        type: types.LOAD_DATA_REGISTER_LIST_ERROR_ALL,
        isLoadingAll: false,
        errorAll: true
    }
}

export function updateFormAndLoadDataSearchAll(searchAll, token) {
    sourceCancelAll.cancel('Canceled by api register list (all).');
    sourceCancelAll = CancelToken.source();
    return (dispatch) => {
        dispatch(updateFormSearchAll(searchAll));
        dispatch(loadDataRegisterListAll(token, 1, searchAll));
    }

}

export function updateFormSearchAll(searchAll) {
    return {
        type: types.UPDATE_FORM_SEARCH_REGISTER_LIST_ALL,
        searchAll: searchAll,
        currentPageAll: 1,
        totalPageAll: 1,
        registerListDataAll: []
    }
}

export function beginDataRegisterListLoadMy() {
    return {
        type: types.BEGIN_DATA_REGISTER_LIST_LOAD_MY,
        isLoadingMy: true,
        errorMy: false,
    }
}

export function loadDataRegisterListMy(token, page, search, salerId) {
    return function (dispatch) {
        dispatch(beginDataRegisterListLoadMy());
        studentApi.loadRegisterListApi(token, page, search, salerId, sourceCancelMy).then(function (res) {
            dispatch(loadDataSuccessfulMy(res));
        }).catch(error => {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            } else {
                dispatch(loadDataErrorMy());
                throw (error);
            }
        })
    }
}

export function loadDataSuccessfulMy(res) {
    return ({
        type: types.LOAD_DATA_REGISTER_LIST_SUCCESSFUL_MY,
        registerListDataMy: res.data.registers,
        currentPageMy: res.data.paginator.current_page,
        totalPageMy: res.data.paginator.total_pages,
        isLoadingMy: false,
        errorMy: false,
    })
}

export function loadDataErrorMy() {
    return {
        type: types.LOAD_DATA_REGISTER_LIST_ERROR_MY,
        isLoadingMy: false,
        errorMy: true
    }
}

export function updateFormAndLoadDataSearchMy(searchMy, salerId, token) {
    sourceCancelMy.cancel('Canceled by api register list (my).');
    sourceCancelMy = CancelToken.source();
    return (dispatch) => {
        dispatch(updateFormSearchMy(searchMy));
        dispatch(loadDataRegisterListMy(token, 1, searchMy, salerId));
    }

}

export function updateFormSearchMy(searchMy) {
    return {
        type: types.UPDATE_FORM_SEARCH_REGISTER_LIST_MY,
        searchMy: searchMy,
        currentPageMy: 1,
        totalPageMy: 1,
        registerListDataMy: []
    }
}

export function changeSegmentRegisterList(segment) {
    return {
        type: types.CHANGE_SEGMENT_REGISTER_LIST,
        segment: segment
    }
}