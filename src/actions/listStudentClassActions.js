/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as studentApi from '../apis/studentApi';

export function beginDataListStudentClassLoad() {
  return {
    type: types.BEGIN_DATA_LIST_STUDENT_CLASS_LOAD,
    isLoading: true,
    error: false,
  };
}

export function beginDataListStudentClassRefresh() {
  return {
    type: types.BEGIN_DATA_LIST_STUDENT_CLASS_REFRESH,
    refreshing: true,
    error: false,
  };
}

export function loadDataListStudentClass(classId, token) {
  return function (dispatch) {
    dispatch(beginDataListStudentClassLoad());
    studentApi
      .loadListStudentClassApi(classId, token)
      .then(function (res) {
        dispatch(loadDataSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadDataError());
        throw error;
      });
  };
}

export function refreshDataListStudentClass(classId, token) {
  return function (dispatch) {
    dispatch(beginDataListStudentClassRefresh());
    studentApi
      .loadListStudentClassApi(classId, token)
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
    type: types.LOAD_DATA_LIST_STUDENT_CLASS_SUCCESSFUL,
    classInfo: res.data.class,
    listStudentClassData: res.data.students,
    isLoading: false,
    refreshing: false,
    error: false,
  };
}

export function loadDataError() {
  return {
    type: types.LOAD_DATA_LIST_STUDENT_CLASS_ERROR,
    isLoading: false,
    refreshing: false,
    error: true,
  };
}

export function loadListStudentClassLessons(refreshing, classId, token) {
  return function (dispatch) {
    if (refreshing) {
      dispatch(beginRefreshClassLessons());
    } else {
      dispatch(beginLoadClassLessons());
    }
    studentApi
      .loadListStudentClassLessonsApi(classId, token)
      .then((res) => dispatch(loadClassLessonsSuccess(res)))
      .catch((error) => {
        dispatch(loadClassLessonsError());
        throw error;
      });
  };
}

function beginLoadClassLessons() {
  return {
    type: types.BEGIN_LOAD_LIST_STUDENT_CLASS_LESSONS,
    isLoadingLessons: true,
    errorLessons: false,
  };
}

function beginRefreshClassLessons() {
  return {
    type: types.BEGIN_REFRESH_LIST_STUDENT_CLASS_LESSONS,
    refreshingLessons: true,
    errorLessons: false,
  };
}

function loadClassLessonsSuccess(res) {
  return {
    type: types.LOAD_LIST_STUDENT_CLASS_LESSONS_SUCCESSFUL,
    isLoadingLessons: false,
    errorLessons: false,
    refreshingLessons: false,
    lessons: res.data.data.class.lessons,
  };
}

function loadClassLessonsError() {
  return {
    type: types.LOAD_LIST_STUDENT_CLASS_LESSONS_ERROR,
    isLoadingLessons: false,
    errorLessons: true,
    refreshingLessons: false,
  };
}

export function changeClassLessons(classLessons, token) {
  return function (dispatch) {
    dispatch(beginChangeClassLessons());
    studentApi
      .changeClassLessons(classLessons, token)
      .then((res) => dispatch(changeClassLessonsSuccess()))
      .catch((error) => {
        changeClassLessonsError();
        throw error;
      });
  };
}

function beginChangeClassLessons() {
  return {
    type: types.BEGIN_CHANGE_CLASS_LESSONS,
    changingClassLessons: true,
    errorChangeClassLessons: false,
  };
}

function changeClassLessonsSuccess() {
  return {
    type: types.BEGIN_CHANGE_CLASS_LESSONS,
    changingClassLessons: false,
    errorChangeClassLessons: false,
  };
}

function changeClassLessonsError() {
  return {
    type: types.BEGIN_CHANGE_CLASS_LESSONS,
    changingClassLessons: false,
    errorChangeClassLessons: true,
  };
}

export function changeClassLesson(lesson, token) {
  return function (dispatch) {
    dispatch(beginChangeClassLesson());
    studentApi
      .changeClassLesson(lesson, token)
      .then((res) => {
        dispatch(changeClassLessonSuccess());
      })
      .catch((error) => {
        dispatch(changeClassLessonError());
        throw error;
      });
  };
}

function beginChangeClassLesson() {
  return {
    type: types.BEGIN_CHANGE_CLASS_LESSON,
    changingClassLesson: true,
    errorChangeClassLesson: false,
  };
}

function changeClassLessonSuccess() {
  return {
    type: types.CHANGE_CLASS_LESSON_SUCCESS,
    changingClassLesson: false,
    errorChangeClassLesson: false,
  };
}

function changeClassLessonError() {
  return {
    type: types.CHANGE_CLASS_LESSON_ERROR,
    changingClassLesson: false,
    errorChangeClassLesson: true,
  };
}
