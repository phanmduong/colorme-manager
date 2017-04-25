/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as classApi from '../apis/classApi';

export function beginDataCurrentClassStudyLoad(){
    return {
        type: types.BEGIN_DATA_CURRENT_CLASS_STUDY_LOAD,
        isLoading: true,
        error: false
    }
}

export function loadDataCurrentClassStudy(token) {
    return function (dispatch) {
        dispatch(beginDataCurrentClassStudyLoad());
        classApi.loadCurrentClassStudyApi(token).then(function (res) {
            dispatch(loadDataSuccessful(res));
        }).catch(error => {
            dispatch(loadDataError());
            throw (error);
        })

    }
}

export function loadDataSuccessful(res) {
    return ({
        type: types.LOAD_DATA_CURRENT_CLASS_STUDY_SUCCESSFUL,
        classData: res.data.data,
        isLoading: false,
        error: false
    })
}

export function loadDataError() {
    return {
        type: types.LOAD_DATA_CURRENT_CLASS_STUDY_ERROR,
        isLoading: false,
        error: false
    }
}

export function selectedCurrentClassStudy(classId, lessonOrder, classOrder) {
    return {
        type: types.SELECTED_CURRENT_CLASS_STUDY,
        selectedCurrentClassStudy: {
            class: {
                id: classId,
                order: classOrder
            },
            lesson: {
                    order: lessonOrder
            }

        }
    }
}