/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as studentApi from '../apis/studentApi';
import * as collectMoneyApi from '../apis/collectMoneyApi';
import axios from 'axios';
let CancelToken = axios.CancelToken;
let sourceCancel = CancelToken.source();

export function beginDataStudentListLoad() {
    return {
        type: types.BEGIN_DATA_STUDENT_LIST_COLLECT_MONEY_LOAD,
        isLoading: true,
        error: false,
    }
}

export function loadDataStudentList(token, search, page, limit) {
    return function (dispatch) {
        dispatch(beginDataStudentListLoad());
        studentApi.searchStudentApi(sourceCancel, search, token, page, limit).then(function (res) {
            dispatch(loadDataSuccessful(res));
        }).catch(error => {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            } else {
                dispatch(loadDataError());
                throw (error);
            }

        })
    }
}

export function loadDataSuccessful(res) {
    return ({
        type: types.LOAD_DATA_STUDENT_LIST_COLLECT_MONEY_SUCCESSFUL,
        studentListData: res.data.data,
        currentPage: res.data.paginator.current_page,
        totalPage: res.data.paginator.total_pages,
        newestCode: res.data.newest_code,
        isLoading: false,
        error: false,

    })
}

export function loadDataError() {
    return {
        type: types.LOAD_DATA_STUDENT_LIST_COLLECT_MONEY_ERROR,
        isLoading: false,
        error: true
    }
}

export function updateFormAndLoadDataSearch(search, token) {
    sourceCancel.cancel('Canceled by api student list .');
    sourceCancel = CancelToken.source();
    return (dispatch) => {
        dispatch(updateFormSearch(search));
        dispatch(loadDataStudentList(token, search, 1));
    }

}

export function updateFormSearch(search) {
    return {
        type: types.UPDATE_FORM_SEARCH_STUDENT_LIST_COLLECT_MONEY,
        search: search,
        currentPage: 1,
        totalPage: 1,
        studentListData: []
    }
}