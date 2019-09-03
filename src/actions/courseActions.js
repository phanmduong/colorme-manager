/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as courseApi from '../apis/courseApi';

export function beginDataCourseLoad() {
  return {
    type: types.BEGIN_DATA_COURSE_LOAD,
    isLoading: true,
    error: false,
  };
}

export function loadDataCourse(token) {
  return function(dispatch) {
    dispatch(beginDataCourseLoad());
    courseApi
      .loadCourseApi(token)
      .then(function(res) {
        dispatch(loadDataSuccessful(res));
      })
      .catch(error => {
        dispatch(loadDataError());
        throw error;
      });
  };
}

export function loadDataSuccessful(res) {
  return {
    type: types.LOAD_DATA_COURSE_SUCCESSFUL,
    courseData: res.data.courses,
    isLoading: false,
    error: false,
  };
}

export function loadDataError() {
  return {
    type: types.LOAD_DATA_COURSE_ERROR,
    isLoading: false,
    error: false,
  };
}

export function selectedCourseId(id) {
  return {
    type: types.SELECTED_COURSE_ID,
    selectedCourseId: id,
  };
}
