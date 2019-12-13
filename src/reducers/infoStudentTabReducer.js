import initialState from './initialState';
import {
  INFO_STUDENT_REGISTERS_TAB,
  INFO_STUDENT_HISTORY_CALLS_TAB,
  INFO_STUDENT_PROGRESS_TAB,
  INFO_STUDENT_HISTORY_COLLECT_MONEY_TAB,
} from '../constants/actionTypes';

export function infoStudentTabReducer(
  state = initialState.infoStudentTab,
  action,
) {
  switch (action.type) {
    case INFO_STUDENT_REGISTERS_TAB:
      return action.infoStudentTab;
    case INFO_STUDENT_HISTORY_CALLS_TAB:
      return action.infoStudentTab;
    case INFO_STUDENT_PROGRESS_TAB:
      return action.infoStudentTab;
    case INFO_STUDENT_HISTORY_COLLECT_MONEY_TAB:
      return action.infoStudentTab;
    default:
      return state;
  }
}
