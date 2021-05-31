/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as studentApi from '../apis/studentApi';
import {Alert} from 'react-native';

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

export function loadDataListStudentClass(refreshing, classId, token, domain) {
  return function (dispatch) {
    if (!refreshing) {
      dispatch(beginDataListStudentClassLoad());
    } else {
      dispatch(beginDataListStudentClassRefresh());
    }
    studentApi
      .loadListStudentClassApi(classId, token, domain)
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
    listStudentClassData: res.data.registers.items,
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

export function loadListStudentClassLessons(
  refreshing,
  page,
  classId,
  token,
  domain,
) {
  return function (dispatch) {
    if (refreshing) {
      dispatch(beginRefreshClassLessons());
    } else {
      dispatch(beginLoadClassLessons());
    }
    studentApi
      .loadListStudentClassLessonsApi(page, classId, token, domain)
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
    currentPage: 1,
    totalPage: 1,
    lessons: [],
  };
}

function loadClassLessonsSuccess(res) {
  return {
    type: types.LOAD_LIST_STUDENT_CLASS_LESSONS_SUCCESSFUL,
    isLoadingLessons: false,
    errorLessons: false,
    refreshingLessons: false,
    lessons: res.data.class_lessons.items,
    currentPage: res.data.class_lessons.meta.current_page,
    totalPage: res.data.class_lessons.meta.total_pages,
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

export function reset() {
  return {
    type: types.RESET_LIST_STUDENT_CLASS,
    lessons: [],
    listStudentClassData: [],
    currentPage: 0,
    totalPage: 1,
  };
}

export function changeClassLessons(payload, token, domain, callback) {
  return function (dispatch) {
    dispatch(beginChangeClassLessons());
    studentApi
      .changeClassLessons(payload, token, domain)
      .then((res) => {
        Alert.alert('Thông báo', 'Dời lịch thành công', [
          {
            text: 'OK',
            onPress: () => {
              if (callback) {
                callback();
              }
            },
          },
        ]);
        dispatch(changeClassLessonsSuccess());
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
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

export function previewClassLessons(payload, token, domain) {
  return function (dispatch) {
    dispatch(beginPreviewClassLessons());
    studentApi
      .previewClassLessons(payload, token, domain)
      .then((res) => {
        dispatch(previewClassLessonsSuccess(res));
      })
      .catch((error) => {
        dispatch(previewClassLessonsError());
        throw error;
      });
  };
}
function beginPreviewClassLessons() {
  return {
    type: types.BEGIN_PREVIEW_CLASS_LESSONS,
    previewingClassLessons: true,
    errorPreviewClassLessons: false,
  };
}

function previewClassLessonsSuccess(res) {
  return {
    type: types.PREVIEW_CLASS_LESSONS_SUCCESS,
    previewingClassLessons: false,
    errorPreviewClassLessons: false,
    previews: res.data.preview_times,
  };
}

function previewClassLessonsError() {
  return {
    type: types.PREVIEW_CLASS_LESSONS_ERROR,
    previewingClassLessons: false,
    errorPreviewClassLessons: true,
  };
}

export function resetPreview() {
  return {
    type: types.RESET_PREVIEW,
    previews: [],
  };
}

export function changeClassLesson(lesson, token, domain, callback) {
  return function (dispatch) {
    dispatch(beginChangeClassLesson());
    studentApi
      .changeClassLesson(lesson, token, domain, callback)
      .then((res) => {
        Alert.alert('Thông báo', 'Đổi lịch dạy thành công', [
          {
            text: 'OK',
            onPress: () => {
              if (callback) {
                callback();
              }
            },
          },
        ]);
        dispatch(changeClassLessonSuccess());
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
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

export function changeClassTeach(data, token, domain, callback) {
  return function (dispatch) {
    dispatch(beginChangeClassTeach());
    studentApi
      .changeTeacherAndAssistant(data, token, domain)
      .then((res) => {
        Alert.alert('Thông báo', 'Đổi giảng viên thành công', [
          {
            text: 'OK',
            onPress: () => {
              if (callback) {
                callback();
              }
            },
          },
        ]);
        dispatch(changeClassTeachSuccess());
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        dispatch(changeClassTeachError());
        throw error;
      });
  };
}

function beginChangeClassTeach() {
  return {
    type: types.BEGIN_CHANGE_CLASS_TEACHER,
    changingClassTeach: true,
    errorChangeClassTeach: false,
  };
}

function changeClassTeachSuccess() {
  return {
    type: types.CHANGE_CLASS_TEACHER_SUCCESS,
    changingClassTeach: false,
    errorChangeClassTeach: false,
  };
}

function changeClassTeachError() {
  return {
    type: types.CHANGE_CLASS_TEACHER_ERROR,
    changingClassTeach: false,
    errorChangeClassTeach: true,
  };
}

export function changeClassAssist(data, token, domain, callback) {
  return function (dispatch) {
    dispatch(beginChangeClassAssist());
    studentApi
      .changeTeacherAndAssistant(data, token, domain)
      .then((res) => {
        Alert.alert('Thông báo', 'Đổi trợ giảng thành công', [
          {
            text: 'OK',
            onPress: () => {
              if (callback) {
                callback();
              }
            },
          },
        ]);
        dispatch(changeClassAssistSuccess());
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        dispatch(changeClassAssistError());
        throw error;
      });
  };
}

function beginChangeClassAssist() {
  return {
    type: types.BEGIN_CHANGE_CLASS_ASSIST,
    changingClassAssist: true,
    errorChangeClassAssist: false,
  };
}

function changeClassAssistSuccess() {
  return {
    type: types.CHANGE_CLASS_ASSIST_SUCCESS,
    changingClassAssist: false,
    errorChangeClassAssist: false,
  };
}

function changeClassAssistError() {
  return {
    type: types.CHANGE_CLASS_ASSIST_ERROR,
    changingClassAssist: false,
    errorChangeClassAssist: true,
  };
}
