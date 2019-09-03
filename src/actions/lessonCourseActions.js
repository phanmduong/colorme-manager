/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as lessonCourseApi from '../apis/lessonCourseApi';

export function beginDataLessonCourseLoad() {
  return {
    type: types.BEGIN_DATA_LESSON_COURSE_LOAD,
    isLoading: true,
    error: false,
  };
}

export function loadDataLessonCourse(courseId, token) {
  return function(dispatch) {
    dispatch(beginDataLessonCourseLoad());
    lessonCourseApi
      .loadLessonCourseApi(courseId, token)
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
    type: types.LOAD_DATA_LESSON_COURSE_SUCCESSFUL,
    lessonCourseData: res.data.lessons,
    isLoading: false,
    error: false,
  };
}

export function loadDataError() {
  return {
    type: types.LOAD_DATA_LESSON_COURSE_ERROR,
    isLoading: false,
    error: false,
  };
}

export function selectedLessonCourseId(id) {
  return {
    type: types.SELECTED_LESSON_COURSE_ID,
    selectedLessonCourseId: id,
  };
}
