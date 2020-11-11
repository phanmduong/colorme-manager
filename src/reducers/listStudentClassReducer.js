/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState';

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
        classInfo: action.classInfo,
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
    case types.LOAD_LIST_STUDENT_CLASS_LESSONS_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingLessons: action.isLoadingLessons,
        refreshingLessons: action.refreshingLessons,
        errorLessons: action.errorLessons,
        lessons: action.lessons,
      });
    case types.LOAD_LIST_STUDENT_CLASS_LESSONS_ERROR:
      return Object.assign({}, state, {
        isLoadingLessons: action.isLoadingLessons,
        refreshingLessons: action.refreshingLessons,
        errorLessons: action.errorLessons,
      });
    case types.RESET_LIST_STUDENT_CLASS:
      return Object.assign({}, state, {
        classInfo: action.classInfo,
        lessons: action.lessons,
        listStudentClassData: action.listStudentClassData,
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
    default:
      return state;
  }
}
