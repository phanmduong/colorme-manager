/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as studentApi from '../apis/studentApi';

export function beginDataListStudentZeroLoad() {
    return {
        type: types.BEGIN_DATA_LIST_STUDENT_ZERO_LOAD,
        isLoading: true,
        error: false
    }
}
export function loadDataListStudentZero(genId, baseId) {
    return function (dispatch) {
        dispatch(beginDataListStudentZeroLoad());
        studentApi.loadStudentListByFilterApi(genId, baseId, 'zero').then(function (res) {
            dispatch(loadDataSuccessful(res));
        }).catch(error => {
            dispatch(loadDataError());
            throw (error);
        })

    }
}

export function loadDataSuccessful(res) {
    return ({
        type: types.LOAD_DATA_LIST_STUDENT_ZERO_SUCCESSFUL,
        listStudentZeroData: res.data.students,
        isLoading: false,
        error: false
    })
}

export function loadDataError() {
    return {
        type: types.LOAD_DATA_LIST_STUDENT_ZERO_ERROR,
        isLoading: false,
        error: true
    }
}