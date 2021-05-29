/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState';

let lessons;

export default function listStudentClassReducer(
  state = initialState.listStudentClass,
  action,
) {
  switch (action.type) {
    case types.BEGIN_DATA_LIST_STUDENT_CLASS_LOAD:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
      });
    case types.BEGIN_DATA_LIST_STUDENT_CLASS_REFRESH:
      return Object.assign({}, state, {
        refreshing: action.refreshing,
        error: action.error,
      });
    case types.LOAD_DATA_LIST_STUDENT_CLASS_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        refreshing: action.refreshing,
        error: action.error,
        listStudentClassData: action.listStudentClassData,
      });
    case types.LOAD_DATA_LIST_STUDENT_CLASS_ERROR:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        refreshing: action.refreshing,
        error: action.error,
      });
    case types.BEGIN_LOAD_LIST_STUDENT_CLASS_LESSONS:
      return Object.assign({}, state, {
        isLoadingLessons: action.isLoadingLessons,
        errorLessons: action.errorLessons,
      });
    case types.BEGIN_REFRESH_LIST_STUDENT_CLASS_LESSONS:
      return Object.assign({}, state, {
        refreshingLessons: action.refreshingLessons,
        errorLessons: action.errorLessons,
        currentPageLessons: action.currentPage,
        totalPageLessons: action.totalPage,
        lessons: action.lessons,
      });
    case types.LOAD_LIST_STUDENT_CLASS_LESSONS_SUCCESSFUL:
      lessons =
        action.currentPage === 1
          ? action.lessons
          : [...state.lessons, ...action.lessons];
      return Object.assign({}, state, {
        isLoadingLessons: action.isLoadingLessons,
        refreshingLessons: action.refreshingLessons,
        errorLessons: action.errorLessons,
        lessons: lessons,
        currentPageLessons: action.currentPage,
        totalPageLessons: action.totalPage,
      });
    case types.LOAD_LIST_STUDENT_CLASS_LESSONS_ERROR:
      return Object.assign({}, state, {
        isLoadingLessons: action.isLoadingLessons,
        refreshingLessons: action.refreshingLessons,
        errorLessons: action.errorLessons,
      });
    case types.RESET_LIST_STUDENT_CLASS:
      return Object.assign({}, state, {
        lessons: action.lessons,
        listStudentClassData: action.listStudentClassData,
        currentPageLessons: action.currentPage,
        totalPageLessons: action.totalPage,
      });
    case types.BEGIN_CHANGE_CLASS_LESSONS:
      return Object.assign({}, state, {
        changingClassLessons: action.changingClassLessons,
        errorChangeClassLessons: action.errorChangeClassLessons,
      });
    case types.CHANGE_CLASS_LESSONS_SUCCESS:
      return Object.assign({}, state, {
        changingClassLessons: action.changingClassLessons,
        errorChangeClassLessons: action.errorChangeClassLessons,
      });
    case types.CHANGE_CLASS_LESSONS_ERROR:
      return Object.assign({}, state, {
        changingClassLessons: action.changingClassLessons,
        errorChangeClassLessons: action.errorChangeClassLessons,
      });
    case types.BEGIN_CHANGE_CLASS_LESSON:
      return Object.assign({}, state, {
        changingClassLesson: action.changingClassLesson,
        errorChangeClassLesson: action.errorChangeClassLesson,
      });
    case types.CHANGE_CLASS_LESSON_SUCCESS:
      return Object.assign({}, state, {
        changingClassLesson: action.changingClassLesson,
        errorChangeClassLesson: action.errorChangeClassLesson,
      });
    case types.CHANGE_CLASS_LESSON_ERROR:
      return Object.assign({}, state, {
        changingClassLesson: action.changingClassLesson,
        errorChangeClassLesson: action.errorChangeClassLesson,
      });
    case types.BEGIN_CHANGE_CLASS_TEACHER:
      return Object.assign({}, state, {
        changingClassTeach: action.changingClassTeach,
        errorChangeClassTeach: action.errorChangeClassTeach,
      });
    case types.CHANGE_CLASS_TEACHER_SUCCESS:
      return Object.assign({}, state, {
        changingClassTeach: action.changingClassTeach,
        errorChangeClassTeach: action.errorChangeClassTeach,
      });
    case types.CHANGE_CLASS_TEACHER_ERROR:
      return Object.assign({}, state, {
        changingClassTeach: action.changingClassTeach,
        errorChangeClassTeach: action.errorChangeClassTeach,
      });
    case types.BEGIN_CHANGE_CLASS_ASSIST:
      return Object.assign({}, state, {
        changingClassAssist: action.changingClassAssist,
        errorChangeClassAssist: action.errorChangeClassAssist,
      });
    case types.CHANGE_CLASS_ASSIST_SUCCESS:
      return Object.assign({}, state, {
        changingClassAssist: action.changingClassAssist,
        errorChangeClassAssist: action.errorChangeClassAssist,
      });
    case types.CHANGE_CLASS_ASSIST_ERROR:
      return Object.assign({}, state, {
        changingClassAssist: action.changingClassAssist,
        errorChangeClassAssist: action.errorChangeClassAssist,
      });
    default:
      return state;
  }
}
