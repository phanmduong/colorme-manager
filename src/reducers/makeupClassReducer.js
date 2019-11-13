import initialState from './initialState';
import * as type from '../constants/actionTypes';

export function makeupClassReducer(state = initialState.makeupClasses, action) {
  switch (action.type) {
    case type.BEGIN_LOAD_ALL_COURSES:
      return Object.assign({}, state, {
        isLoadingAllCourses: action.isLoadingAllCourses,
        errorLoadingAllCourses: action.errorLoadingAllCourses,
      });
    case type.LOAD_ALL_COURSES_SUCCESSFUL:
      return Object.assign({}, state, {
        courses: action.courses,
        isLoadingAllCourses: action.isLoadingAllCourses,
        errorLoadingAllCourses: action.errorLoadingAllCourses,
      });
    case type.LOAD_ALL_COURSES_ERROR:
      return Object.assign({}, state, {
        isLoadingAllCourses: action.isLoadingAllCourses,
        errorLoadingAllCourses: action.errorLoadingAllCourses,
      });
    case type.BEGIN_LOAD_SCHEDULE_CLASSES:
      return Object.assign({}, state, {
        isLoadingScheduleClasses: action.isLoadingScheduleClasses,
        errorScheduleClasses: action.errorScheduleClasses,
      });
    case type.LOAD_SCHEDULE_CLASSES_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingScheduleClasses: action.isLoadingScheduleClasses,
        errorScheduleClasses: action.errorScheduleClasses,
        schedule: action.schedule,
      });
    case type.LOAD_SCHEDULE_CLASSES_ERROR:
      return Object.assign({}, state, {
        isLoadingScheduleClasses: action.isLoadingScheduleClasses,
        errorScheduleClasses: action.errorScheduleClasses,
      });
    case type.RESET_SCHEDULE_CLASSES:
      return Object.assign({}, state, {
        isLoadingScheduleClasses: action.isLoadingScheduleClasses,
        errorScheduleClasses: action.errorScheduleClasses,
        schedule: action.schedule,
        courses: action.courses,
        isLoadingAllCourses: action.isLoadingAllCourses,
        errorLoadingAllCourses: action.errorLoadingAllCourses,
      });
    default:
      return state;
  }
}
