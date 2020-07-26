/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as lessonCourseApi from '../apis/lessonCourseApi';

export function beginDataListStudentAttendanceLoad() {
  return {
    type: types.BEGIN_DATA_LIST_STUDENT_ATTENDANCE_LOAD,
    isLoading: true,
    error: false,
  };
}

export function loadDataListStudentAttendance(classID, lessonID, token, domain) {
  return function(dispatch) {
    dispatch(beginDataListStudentAttendanceLoad());
    lessonCourseApi
      .loadListStudentAttendanceByLessonApi(classID, lessonID, token, domain)
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
    type: types.LOAD_DATA_LIST_STUDENT_ATTENDANCE_SUCCESSFUL,
    listStudentAttendanceData: res.data.data.data.attendances,
    isLoading: false,
    error: false,
  };
}

export function loadDataError() {
  return {
    type: types.LOAD_DATA_LIST_STUDENT_ATTENDANCE_ERROR,
    isLoading: false,
    error: true,
  };
}
