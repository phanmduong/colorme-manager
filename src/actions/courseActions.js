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

export function loadDataCourse(refreshing, page, search, token, domain) {
  return function (dispatch) {
    if (!refreshing) {
      dispatch(beginDataCourseLoad());
    } else {
      dispatch(beginDataCourseRefresh());
    }
    courseApi
      .loadCourseApi(sourceCancel, page, search, token, domain)
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
    courseData: res.data.courses.items,
    isLoading: false,
    error: false,
    currentPage: res.data.courses.meta.current_page,
    refreshing: false,
    totalPage: res.data.courses.meta.total_pages,
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

export function onRefresh(search, token, domain) {
  return function (dispatch) {
    dispatch(beginCourseSearch(search));
    dispatch(loadDataCourse(true, 1, search, token, domain));
  };
}

export function onSearch(search, token, domain) {
  sourceCancel.cancel('Canceled by course api.');
  sourceCancel = CancelToken.source();
  return function (dispatch) {
    dispatch(beginCourseSearch(search));
    dispatch(loadDataCourse(false, 1, search, token, domain));
  };
}

export function onStatusChange(id, status, token, domain) {
  return function (dispatch) {
    dispatch(beginCourseStatusChange());
    courseApi
      .changeStatus(id, status, token, domain)
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

export function loadParentCourses(token, domain) {
  return function (dispatch) {
    dispatch(beginLoadParentCourses());
    courseApi
      .loadParentCourses(token, domain)
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

export function createCourse(editMode, data, token, domain) {
  return function (dispatch) {
    dispatch(beginCreateCourse());
    courseApi
      .createCourse(data, token, domain)
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

export function loadCourseDetails(refreshing, id, token, domain) {
  return function (dispatch) {
    if (!refreshing) {
      dispatch(beginLoadCourseDetails());
    } else {
      dispatch(beginRefreshCourseDetails());
    }
    courseApi
      .loadCourseDetails(id, token, domain)
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

export function changeLessonEvent(id, type, token, domain) {
  return function (dispatch) {
    dispatch(beginChangeLessonEvent());
    courseApi
      .changeLessonEvent(id, type, token, domain)
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

export function deleteLesson(id, token, domain) {
  return function (dispatch) {
    dispatch(beginDeleteLesson());
    courseApi
      .deleteLesson(id, token, domain)
      .then((res) => {
        {
          dispatch(deleteLessonSuccess(id));
          Alert.alert('Thông báo', 'Xóa buổi học thành công');
        }
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

export function duplicateLesson(id, token, domain) {
  return function (dispatch) {
    dispatch(beginDuplicateLesson());
    courseApi
      .duplicateLesson(id, token, domain)
      .then((res) => {
        dispatch(duplicateLessonSuccess(id));
        Alert.alert('Thông báo', 'Nhân bản buổi học thành công');
      })
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

export function createLesson(data, token, domain) {
  return function (dispatch) {
    dispatch(beginCreateLesson());
    courseApi
      .createLesson(data, token, domain)
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

export function editLesson(data, token, domain) {
  return function (dispatch) {
    dispatch(beginEditLesson());
    courseApi
      .editLesson(data, token, domain)
      .then((res) => {
        Alert.alert('Thông báo', 'Sửa buổi học thành công');
        dispatch(loadCourseDetails(true, data.course_id, token, domain));
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

export function createExam(data, token, domain) {
  return function (dispatch) {
    dispatch(beginCreateExam());
    courseApi
      .createExam(data, token, domain)
      .then((res) => {
        dispatch(createExamSuccess(res));
        Alert.alert('Thông báo', 'Tạo bài kiểm tra thành công');
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        throw error;
      })
      .finally(() => {
        dispatch(createExamComplete());
      });
  };
}

function beginCreateExam() {
  return {
    type: types.BEGIN_ADD_COURSE_DETAILS_EXAM,
    creatingExam: true,
  };
}

function createExamSuccess(res) {
  return {
    type: types.ADD_COURSE_DETAILS_EXAM_SUCCESS,
    exam: res.data.exam_template,
  };
}

function createExamComplete() {
  return {
    type: types.ADD_COURSE_DETAILS_EXAM_COMPLETE,
    creatingExam: false,
  };
}

export function createLink(data, token, domain) {
  return function (dispatch) {
    dispatch(beginCreateLink());
    courseApi
      .createLink(data, token, domain)
      .then((res) => {
        dispatch(createLinkSuccess(res));
        Alert.alert('Thông báo', 'Tạo tài liệu thành công');
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        throw error;
      })
      .finally(() => {
        dispatch(createLinkComplete());
      });
  };
}

function beginCreateLink() {
  return {
    type: types.BEGIN_ADD_COURSE_DETAILS_LINK,
    creatingLink: true,
  };
}

function createLinkSuccess(res) {
  return {
    type: types.ADD_COURSE_DETAILS_LINK_SUCCESS,
    link: res.data.data.link,
  };
}

function createLinkComplete() {
  return {
    type: types.ADD_COURSE_DETAILS_LINK_COMPLETE,
    creatingLink: false,
  };
}

export function deleteLink(id, token, domain) {
  return function (dispatch) {
    dispatch(beginDeleteLink());
    courseApi
      .deleteLink(id, token, domain)
      .then((res) => {
        dispatch(deleteLinkSuccess(id));
        Alert.alert('Thông báo', 'Xóa tài liệu thành công');
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        throw error;
      })
      .finally(() => {
        dispatch(deleteLinkComplete());
      });
  };
}

function beginDeleteLink() {
  return {
    type: types.BEGIN_DELETE_COURSE_DETAILS_LINK,
    deletingLink: true,
  };
}

function deleteLinkSuccess(id) {
  return {
    type: types.DELETE_COURSE_DETAILS_LINK_SUCCESS,
    linkId: id,
  };
}

function deleteLinkComplete() {
  return {
    type: types.DELETE_COURSE_DETAILS_LINK_COMPLETE,
    deletingLink: false,
  };
}
