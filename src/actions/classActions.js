/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as classApi from '../apis/classApi';

export function beginDataClassLoad(){
    return {
        type: types.BEGIN_DATA_CLASS_LOAD,
        isLoading: true,
        error: false
    }
}

export function loadDataClass(baseId, courseId, genId, token) {
    return function (dispatch) {
        dispatch(beginDataClassLoad());
        classApi.loadClassApi(baseId, courseId, genId, token).then(function (res) {
            dispatch(loadDataSuccessful(res));
        }).catch(error => {
            dispatch(loadDataError());
            throw (error);
        })

    }
}

export function loadDataSuccessful(res) {
    return ({
        type: types.LOAD_DATA_CLASS_SUCCESSFUL,
        classData: res.data.classes,
        isLoading: false,
        error: false
    })
}

export function loadDataError() {
    return {
        type: types.LOAD_DATA_CLASS_ERROR,
        isLoading: false,
        error: false
    }
}

export function selectedClassId(id) {
    return {
        type: types.SELECTED_CLASS_ID,
        selectedClassId: id
    }
}