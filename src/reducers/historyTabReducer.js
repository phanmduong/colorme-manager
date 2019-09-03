import initialState from './initialState';
import {
  HISTORY_SHIFT_TAB,
  HISTORY_TEACHING_TAB,
  HISTORY_WORK_SHIFT_TAB,
} from '../constants/actionTypes';

export function historyTabReducer(state = initialState.historyTab, action) {
  switch (action.type) {
    case HISTORY_WORK_SHIFT_TAB:
      return action.historyTab;
    case HISTORY_SHIFT_TAB:
      return action.historyTab;
    case HISTORY_TEACHING_TAB:
      return action.historyTab;
    default:
      return state;
  }
}
