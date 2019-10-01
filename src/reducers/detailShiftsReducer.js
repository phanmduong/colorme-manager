import initialState from './initialState';
import * as type from '../constants/actionTypes';

export function detailShiftsReducer(state = initialState, action) {
  switch (action.type) {
    case type.BEGIN_LOAD_DETAIL_SHIFTS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
      });
    case type.LOAD_DETAIL_SHIFTS_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
        detailShifts: action.detailShifts,
      });
    case type.LOAD_DETAIL_SHIFTS_ERROR:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
      });
    default:
      return state;
  }
}
