/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as courseApi from '../apis/courseApi';

import axios from 'axios';
import {Alert} from 'react-native';
let CancelToken = axios.CancelToken;
let sourceCancel = CancelToken.source();

export function beginDataCourseLoad() {
  return {
    type: types.BEGIN_DATA_COURSE_LOAD,
    isLoading: true,
    error: false,
  };
}

export function beginDataCourseRefresh() {
  return {
    type: types.BEGIN_DATA_COURSE_REFRESH,
    refreshing: true,
    error: false,
  };
}

export function loadDataCourse(refreshing, page, search, token) {
  return function (dispatch) {
    if (!refreshing) {
      dispatch(beginDataCourseLoad());
    } else {
      dispatch(beginDataCourseRefresh());
    }
    courseApi
      .loadCourseApi(sourceCancel, page, search, token)
      .then(function (res) {
        dispatch(loadDataSuccessful(res));
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          dispatch(loadDataError());
          throw error;
        }
      });
  };
}

export function loadDataSuccessful(res) {
  return {
    type: types.LOAD_DATA_COURSE_SUCCESSFUL,
    courseData: res.data.courses,
    isLoading: false,
    error: false,
    currentPage: res.data.paginator.current_page,
    refreshing: false,
  };
}

export function loadDataError() {
  return {
    type: types.LOAD_DATA_COURSE_ERROR,
    isLoading: false,
    error: false,
    refreshing: false,
  };
}

export function selectedCourseId(id) {
  return {
    type: types.SELECTED_COURSE_ID,
    selectedCourseId: id,
  };
}

function beginCourseSearch(search) {
  return {
    type: types.BEGIN_DATA_COURSE_SEARCH,
    currentPage: 1,
    courseData: [],
    search: search,
  };
}

export function onRefresh(search, token) {
  return function (dispatch) {
    dispatch(beginCourseSearch(search));
    dispatch(loadDataCourse(true, 1, search, token));
  };
}

export function onSearch(search, token) {
  sourceCancel.cancel('Canceled by course api.');
  sourceCancel = CancelToken.source();
  return function (dispatch) {
    dispatch(beginCourseSearch(search));
    dispatch(loadDataCourse(false, 1, search, token));
  };
}

export function onStatusChange(id, status, token) {
  return function (dispatch) {
    dispatch(beginCourseStatusChange());
    courseApi
      .changeStatus(id, status, token)
      .then((res) => {
        Alert.alert('Thông báo', 'Thay đổi trạng thái thành công');
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        throw error;
      })
      .finally(() => {
        dispatch(courseStatusChangeComplete());
      });
  };
}

function beginCourseStatusChange() {
  return {
    type: types.BEGIN_COURSE_STATUS_CHANGE,
    statusChanging: true,
  };
}

function courseStatusChangeComplete() {
  return {
    type: types.COURSE_STATUS_CHANGE_COMPLETE,
    statusChanging: false,
  };
}

export function loadParentCourses(token) {
  return function (dispatch) {
    dispatch(beginLoadParentCourses());
    courseApi
      .loadParentCourses(token)
      .then((res) => {
        dispatch(loadParentCoursesSuccess(res));
      })
      .catch((error) => {
        dispatch(loadParentCoursesError());
        throw error;
      });
  };
}

function beginLoadParentCourses() {
  return {
    type: types.BEGIN_LOAD_PARENT_COURSES,
    loadingParentCourses: true,
    errorParentCourses: false,
  };
}

function loadParentCoursesSuccess(res) {
  return {
    type: types.LOAD_PARENT_COURSES_SUCCESS,
    loadingParentCourses: false,
    errorParentCourses: false,
    parentCourses: res.data.courses,
  };
}

function loadParentCoursesError() {
  return {
    type: types.LOAD_PARENT_COURSES_ERROR,
    loadingParentCourses: true,
    errorParentCourses: false,
  };
}

export function createCourse(editMode, data, token) {
  return function (dispatch) {
    dispatch(beginCreateCourse());
    courseApi
      .createCourse(data, token)
      .then((res) => {
        dispatch(createCourseSuccess(res, editMode));
        Alert.alert('Thông báo', 'Thêm môn học thành công');
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        throw error;
      })
      .finally(() => {
        dispatch(createCourseComplete());
      });
  };
}

function beginCreateCourse() {
  return {
    type: types.BEGIN_CREATE_COURSE,
    creating: true,
  };
}

function createCourseSuccess(res, editMode) {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course: res.data.data.course,
    editMode: editMode,
  };
}

function createCourseComplete() {
  return {
    type: types.CREATE_COURSE_COMPLETE,
    creating: false,
  };
}

export function loadCourseDetails(refreshing, id, token) {
  return function (dispatch) {
    if (!refreshing) {
      dispatch(beginLoadCourseDetails());
    } else {
      dispatch(beginRefreshCourseDetails());
    }
    courseApi
      .loadCourseDetails(id, token)
      .then((res) => dispatch(loadCourseDetailsSuccess(res)))
      .catch((error) => {
        dispatch(loadCourseDetailsError());
        throw error;
      });
  };
}

function beginLoadCourseDetails() {
  return {
    type: types.BEGIN_LOAD_COURSE_DETAILS,
    loadingCourseDetails: true,
    errorCourseDetails: false,
  };
}

function beginRefreshCourseDetails() {
  return {
    type: types.BEGIN_REFRESH_COURSE_DETAILS,
    refreshingCourseDetails: true,
    errorCourseDetails: false,
  };
}

function loadCourseDetailsSuccess(res) {
  return {
    type: types.LOAD_COURSE_DETAILS_SUCCESS,
    loadingCourseDetails: false,
    errorCourseDetails: false,
    course: res.data.data.course,
    refreshingCourseDetails: false,
  };
}

function loadCourseDetailsError() {
  return {
    type: types.LOAD_COURSE_DETAILS_ERROR,
    loadingCourseDetails: false,
    errorCourseDetails: true,
    refreshingCourseDetails: false,
  };
}

export function changeLessonEvent(id, type, token) {
  return function (dispatch) {
    dispatch(beginChangeLessonEvent());
    courseApi
      .changeLessonEvent(id, type, token)
      .then((res) => {
        dispatch(changeLessonEventSuccess(res));
        Alert.alert('Thông báo', 'Thay đổi sự kiện thành công');
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        throw error;
      })
      .finally(() => {
        dispatch(changeLessonEventComplete());
      });
  };
}

function beginChangeLessonEvent() {
  return {
    type: types.BEGIN_CHANGE_LESSON_EVENT,
    changingEvent: true,
  };
}

function changeLessonEventSuccess(res) {
  return {
    type: types.CHANGE_LESSON_EVENT_SUCCESS,
    lesson: res.data.data.lesson,
  };
}

function changeLessonEventComplete() {
  return {
    type: types.CHANGE_LESSON_EVENT_COMPLETE,
    changingEvent: false,
  };
}

export function deleteLesson(id, token) {
  return function (dispatch) {
    dispatch(beginDeleteLesson());
    courseApi
      .deleteLesson(id, token)
      .then((res) => {
        dispatch(deleteLessonSuccess(id));
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        throw error;
      })
      .finally(() => dispatch(deleteLessonComplete()));
  };
}

function beginDeleteLesson() {
  return {
    type: types.BEGIN_DELETE_COURSE_DETAILS_LESSON,
    deletingLesson: true,
  };
}

function deleteLessonSuccess(id) {
  return {
    type: types.DELETE_COURSE_DETAILS_LESSON_SUCCESS,
    lessonId: id,
  };
}

function deleteLessonComplete() {
  return {
    type: types.DELETE_COURSE_DETAILS_LESSON_COMPLETE,
    deletingLesson: false,
  };
}

export function reset() {
  return {
    type: types.RESET_DATA_COURSE,
    courseData: [],
    currentPage: 0,
    search: '',
    parentCourses: [],
    courseDetails: {},
  };
}

export function duplicateLesson(id, token) {
  return function (dispatch) {
    dispatch(beginDuplicateLesson());
    courseApi
      .duplicateLesson(id, token)
      .then((res) => dispatch(duplicateLessonSuccess(id)))
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        throw error;
      })
      .finally(() => {
        dispatch(duplicateLessonComplete());
      });
  };
}

function beginDuplicateLesson() {
  return {
    type: types.BEGIN_DUPLICATE_COURSE_DETAILS_LESSON,
    duplicatingLesson: true,
  };
}

function duplicateLessonSuccess(id) {
  return {
    type: types.DUPLICATE_COURSE_DETAILS_LESSON_SUCCESS,
    lessonId: id,
  };
}

function duplicateLessonComplete() {
  return {
    type: types.DUPLICATE_COURSE_DETAILS_LESSON_COMPLETE,
    duplicatingLesson: false,
  };
}

export function createLesson(data, token) {
  return function (dispatch) {
    dispatch(beginCreateLesson());
    courseApi
      .createLesson(data, token)
      .then((res) => {
        dispatch(createLessonSuccess(res));
        Alert.alert('Thông báo', 'Thêm buổi học thành công');
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        throw error;
      })
      .finally(() => {
        dispatch(createLessonComplete());
      });
  };
}

function beginCreateLesson() {
  return {
    type: types.BEGIN_ADD_COURSE_DETAILS_LESSON,
    addingLesson: true,
  };
}

function createLessonSuccess(res) {
  return {
    type: types.ADD_COURSE_DETAILS_LESSON_SUCCESS,
    lesson: res.data.data.lesson,
  };
}

function createLessonComplete() {
  return {type: types.ADD_COURSE_DETAILS_LESSON_COMPLETE, addingLesson: false};
}

export function resetCourseDetails() {
  return {
    type: types.RESET_COURSE_DETAILS,
    courseDetails: {},
  };
}

export function editLesson(data, token) {
  return function (dispatch) {
    dispatch(beginEditLesson());
    courseApi
      .editLesson(data, token)
      .then((res) => {
        Alert.alert('Thông báo', 'Sửa buổi học thành công');
        dispatch(loadCourseDetails(true, data.course_id, token));
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        throw error;
      })
      .finally(() => {
        dispatch(editLessonComplete());
      });
  };
}

function beginEditLesson() {
  return {
    type: types.BEGIN_EDIT_COURSE_DETAILS_LESSON,
    editingLesson: true,
  };
}

function editLessonComplete() {
  return {
    type: types.EDIT_COURSE_DETAILS_LESSON_COMPLETE,
    editingLesson: false,
  };
}
