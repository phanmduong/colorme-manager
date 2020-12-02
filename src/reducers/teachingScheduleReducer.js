import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function teachingScheduleReducer(
  state = initialState.teachingSchedule,
  action,
) {
  switch (action.type) {
    case types.BEGIN_LOAD_SCHEDULES:
      return Object.assign({}, state, {
        loading: action.loading,
        error: action.error,
      });
    case types.LOAD_SCHEDULES_SUCCESS:
      return Object.assign({}, state, {
        loading: action.loading,
        error: action.error,
        classes: action.classes,
      });
    case types.LOAD_SCHEDULES_ERROR:
      return Object.assign({}, state, {
        loading: action.loading,
        error: action.error,
      });
    case types.ON_SELECT_START_DATE_SCHEDULES:
      return Object.assign({}, state, {
        startTime: action.startTime,
      });
    case types.ON_SELECT_END_DATE_SCHEDULES:
      return Object.assign({}, state, {
        endTime: action.endTime,
      });
    case types.ON_SELECT_PROVINCE_SCHEDULES:
      return Object.assign({}, state, {
        provinceId: action.provinceId,
      });
    case types.ON_SELECT_BASE_SCHEDULES:
      return Object.assign({}, state, {
        baseId: action.baseId,
      });
    case types.ON_SELECT_COURSE_SCHEDULES:
      return Object.assign({}, state, {
        courseId: action.courseId,
      });
    default:
      return state;
  }
}
