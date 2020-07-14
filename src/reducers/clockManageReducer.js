import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function clockManageReducer(
  state = initialState.clockManage,
  action,
) {
  switch (action.type) {
    case types.BEGIN_LOAD_SHIFT_CLOCK:
      return Object.assign({}, state, {
        isLoadingShifts: action.isLoadingShifts,
        errorShifts: action.errorShifts,
      });
    case types.LOAD_SHIFT_CLOCK_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingShifts: action.isLoadingShifts,
        errorShifts: action.errorShifts,
        shifts: action.shifts,
      });
    case types.LOAD_SHIFT_CLOCK_ERROR:
      return Object.assign({}, state, {
        isLoadingShifts: action.isLoadingShifts,
        errorShifts: action.errorShifts,
      });
    case types.ON_SELECT_CLOCK_MANAGE_DATE:
      return Object.assign({}, state, {
        selectedDate: action.selectedDate,
      });
    case types.BEGIN_LOAD_TEACHING_CLOCK:
      return Object.assign({}, state, {
        isLoadingClasses: action.isLoadingClasses,
        errorClasses: action.errorClasses,
      });
    case types.LOAD_TEACHING_CLOCK_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingClasses: action.isLoadingClasses,
        errorClasses: action.errorClasses,
        classes: action.classes,
      });
    case types.LOAD_TEACHING_CLOCK_ERROR:
      return Object.assign({}, state, {
        isLoadingClasses: action.isLoadingClasses,
        errorClasses: action.errorClasses,
      });
    default:
      return state;
  }
}
