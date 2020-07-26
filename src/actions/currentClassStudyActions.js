/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as classApi from '../apis/classApi';

export function beginDataCurrentClassStudyLoad() {
  return {
    type: types.BEGIN_DATA_CURRENT_CLASS_STUDY_LOAD,
    isLoading: true,
    error: false,
  };
}

export function beginDataCurrentClassStudyRefresh() {
  return {
    type: types.BEGIN_DATA_CURRENT_CLASS_STUDY_REFRESH,
    refreshing: true,
    error: false,
  };
}

export function loadDataCurrentClassStudy(date, token, domain) {
  return function (dispatch) {
    dispatch(beginDataCurrentClassStudyLoad());
    classApi
      .loadCurrentClassStudyApi(date, token, domain)
      .then(function (res) {
        dispatch(loadDataSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadDataError());
        throw error;
      });
  };
}

export function refreshDataCurrentClassStudy(date, token, domain) {
  return function (dispatch) {
    dispatch(beginDataCurrentClassStudyRefresh());
    classApi
      .loadCurrentClassStudyApi(date, token, domain)
      .then(function (res) {
        dispatch(loadDataSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadDataError());
        throw error;
      });
  };
}

export function loadDataSuccessful(res) {
  return {
    type: types.LOAD_DATA_CURRENT_CLASS_STUDY_SUCCESSFUL,
    classData: res.data.classes,
    isLoading: false,
    refreshing: false,
    error: false,
  };
}

export function loadDataError() {
  return {
    type: types.LOAD_DATA_CURRENT_CLASS_STUDY_ERROR,
    isLoading: false,
    refreshing: false,
    error: true,
  };
}

export function selectedCurrentClassStudy(classItem) {
  return {
    type: types.SELECTED_CURRENT_CLASS_STUDY,
    selectedCurrentClassStudy: {
      ...classItem,
      lesson: classItem.lesson[0],
    },
  };
}

export function onSelectDate(date) {
  return {
    type: types.ON_SELECT_CLASS_DATE,
    selectedDate: date,
  };
}
