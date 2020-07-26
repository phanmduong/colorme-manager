import * as type from '../constants/actionTypes';
import * as makeupClassApi from '../apis/makeupClassApi';

export function loadScheduleClasses(token, lessonId, domain) {
  return function(dispatch) {
    dispatch(beginLoadingScheduleClasses());
    makeupClassApi
      .loadScheduleClasses(token, lessonId, domain)
      .then(function(res) {
        dispatch(loadScheduleClassesSuccessful(res));
      })
      .catch(error => {
        dispatch(loadScheduleClassesError());
        throw error;
      });
  };
}

function beginLoadingScheduleClasses() {
  return {
    type: type.BEGIN_LOAD_SCHEDULE_CLASSES,
    isLoadingScheduleClasses: true,
    errorScheduleClasses: false,
  };
}

function loadScheduleClassesSuccessful(res) {
  return {
    type: type.LOAD_SCHEDULE_CLASSES_SUCCESSFUL,
    isLoadingScheduleClasses: false,
    errorScheduleClasses: false,
    schedule: res.data.data.schedule,
  };
}

function loadScheduleClassesError() {
  return {
    type: type.LOAD_SCHEDULE_CLASSES_ERROR,
    isLoadingScheduleClasses: false,
    errorScheduleClasses: true,
  };
}

export function loadAllCourses(token, domain) {
  return function(dispatch) {
    dispatch(beginLoadingAllCourses());
    makeupClassApi
      .loadAllCourses(token, domain)
      .then(function(res) {
        dispatch(loadAllCoursesSuccessful(res));
      })
      .catch(error => {
        dispatch(loadAllCoursesError());
        throw error;
      });
  };
}

export function beginLoadingAllCourses() {
  return {
    type: type.BEGIN_LOAD_ALL_COURSES,
    isLoadingAllCourses: true,
    errorLoadingAllCourses: false,
  };
}

export function loadAllCoursesSuccessful(res) {
  return {
    type: type.LOAD_ALL_COURSES_SUCCESSFUL,
    isLoadingAllCourses: false,
    errorLoadingAllCourses: false,
    courses: res.data.data.courses,
  };
}

export function loadAllCoursesError() {
  return {
    type: type.LOAD_ALL_COURSES_ERROR,
    isLoadingAllCourses: false,
    errorLoadingAllCourses: true,
  };
}

export function resetData() {
  return function(dispatch) {
    dispatch(reset());
  };
}

function reset() {
  return {
    type: type.RESET_SCHEDULE_CLASSES,
    isLoadingScheduleClasses: false,
    errorScheduleClasses: false,
    schedule: [],
    isLoadingAllCourses: false,
    errorLoadingAllCourses: false,
    courses: [],
  };
}
