/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as studentApi from '../apis/studentApi';

export function beginDataListStudentClassLoad() {
    return {
        type: types.BEGIN_DATA_LIST_STUDENT_CLASS_LOAD,
        isLoading: true,
        error: false
    }
}

export function loadDataListStudentClass(classId, token) {
    return function (dispatch) {
        dispatch(beginDataListStudentClassLoad());
        studentApi.loadListStudentClassApi(classId, token).then(function (res) {
            dispatch(loadDataSuccessful(res));
        }).catch(error => {
            dispatch(loadDataError());
            throw (error);
        })

    }
}

export function loadDataSuccessful(res) {
    console.log(JSON.stringify(res.data));
    return ({
        type: types.LOAD_DATA_LIST_STUDENT_CLASS_SUCCESSFUL,
        listStudentClassData: res.data.students,
        isLoading: false,
        error: false
    })
}

export function loadDataError() {
    return {
        type: types.LOAD_DATA_LIST_STUDENT_CLASS_ERROR,
        isLoading: false,
        error: true
    }
}