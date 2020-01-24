import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function taskReducer(state = initialState.task, action) {
  switch (action.type) {
    case types.ON_SELECT_TASK_DATE:
      return Object.assign({}, state, {
        selectedDate: action.selectedDate,
      });
    case types.BEGIN_LOAD_TASK_ANALYTICS:
      return Object.assign({}, state, {
        isLoadingTaskAnalytics: action.isLoadingTaskAnalytics,
        errorLoadingTaskAnalytics: action.errorLoadingTaskAnalytics,
      });
    case types.LOAD_TASK_ANALYTICS_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingTaskAnalytics: action.isLoadingTaskAnalytics,
        errorLoadingTaskAnalytics: action.errorLoadingTaskAnalytics,
        taskAnalytics: action.taskAnalytics,
      });
    case types.LOAD_TASK_ANALYTICS_ERROR:
      return Object.assign({}, state, {
        isLoadingTaskAnalytics: action.isLoadingTaskAnalytics,
        errorLoadingTaskAnalytics: action.errorLoadingTaskAnalytics,
      });
    case types.BEGIN_LOAD_TASK_VIEW:
      return Object.assign({}, state, {
        isLoadingTaskView: action.isLoadingTaskView,
        errorLoadingTaskView: action.errorLoadingTaskView,
      });
    case types.LOAD_TASK_VIEW_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingTaskView: action.isLoadingTaskView,
        errorLoadingTaskView: action.errorLoadingTaskView,
        taskView: action.taskView,
      });
    case types.LOAD_TASK_VIEW_ERROR:
      return Object.assign({}, state, {
        isLoadingTaskView: action.isLoadingTaskView,
        errorLoadingTaskView: action.errorLoadingTaskView,
      });
    case types.BEGIN_LOAD_TASK_EMPLOYEES:
      return Object.assign({}, state, {
        isLoadingTaskEmployees: action.isLoadingTaskEmployees,
        errorLoadingTaskEmployees: action.errorLoadingTaskEmployees,
      });
    case types.LOAD_TASK_EMPLOYEES_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingTaskEmployees: action.isLoadingTaskEmployees,
        errorLoadingTaskEmployees: action.errorLoadingTaskEmployees,
        employees: action.employees,
      });
    case types.LOAD_TASK_EMPLOYEES_ERROR:
      return Object.assign({}, state, {
        isLoadingTaskEmployees: action.isLoadingTaskEmployees,
        errorLoadingTaskEmployees: action.errorLoadingTaskEmployees,
      });
    default:
      return state;
  }
}
