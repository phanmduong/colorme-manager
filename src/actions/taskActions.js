import * as types from '../constants/actionTypes';
import * as taskApi from '../apis/taskApi';

export function onSelectDate(date) {
  return {
    type: types.ON_SELECT_TASK_DATE,
    selectedDate: date,
  };
}

export function loadTaskAnalytics(user_id, token, domain) {
  return function(dispatch) {
    dispatch(beginLoadTaskAnalytics());
    taskApi
      .getTaskAnalytics(user_id, token, domain)
      .then(function(res) {
        dispatch(loadTaskAnalyticsSuccessful(res));
      })
      .catch(error => {
        dispatch(loadTaskAnalyticsError());
        throw error;
      });
  };
}

function beginLoadTaskAnalytics() {
  return {
    type: types.BEGIN_LOAD_TASK_ANALYTICS,
    isLoadingTaskAnalytics: true,
    errorLoadingTaskAnalytics: false,
  };
}

function loadTaskAnalyticsSuccessful(res) {
  return {
    type: types.LOAD_TASK_ANALYTICS_SUCCESSFUL,
    isLoadingTaskAnalytics: false,
    errorLoadingTaskAnalytics: false,
    taskAnalytics: res.data.data.tasks,
  };
}

function loadTaskAnalyticsError() {
  return {
    type: types.LOAD_TASK_ANALYTICS_ERROR,
    isLoadingTaskAnalytics: false,
    errorLoadingTaskAnalytics: true,
  };
}

export function loadTaskView(date, user_id, token, domain) {
  return function(dispatch) {
    dispatch(beginLoadTaskView());
    taskApi
      .getTasks(date, user_id, token, domain)
      .then(function(res) {
        dispatch(loadTaskViewSuccessful(res));
      })
      .catch(error => {
        dispatch(loadTaskViewError());
        throw error;
      });
  };
}

function beginLoadTaskView() {
  return {
    type: types.BEGIN_LOAD_TASK_VIEW,
    isLoadingTaskView: true,
    errorLoadingTaskView: false,
  };
}

function loadTaskViewSuccessful(res) {
  return {
    type: types.LOAD_TASK_VIEW_SUCCESSFUL,
    isLoadingTaskView: false,
    errorLoadingTaskView: false,
    taskView: res.data.tasks,
  };
}

function loadTaskViewError() {
  return {
    type: types.LOAD_TASK_VIEW_ERROR,
    isLoadingTaskView: false,
    errorLoadingTaskView: true,
  };
}

export function loadTaskEmployees(token, domain) {
  return function(dispatch) {
    dispatch(beginLoadTaskEmployees());
    taskApi
      .getTaskEmployees(token, domain)
      .then(function(res) {
        dispatch(loadTaskEmployeesSuccessful(res));
      })
      .catch(error => {
        dispatch(loadTaskEmployeesError());
        throw error;
      });
  };
}

function beginLoadTaskEmployees() {
  return {
    type: types.BEGIN_LOAD_TASK_EMPLOYEES,
    isLoadingTaskEmployees: true,
    errorLoadingTaskEmployees: false,
  };
}

function loadTaskEmployeesSuccessful(res) {
  return {
    type: types.LOAD_TASK_EMPLOYEES_SUCCESSFUL,
    isLoadingTaskEmployees: false,
    errorLoadingTaskEmployees: false,
    employees: res.data.employees,
  };
}

function loadTaskEmployeesError() {
  return {
    type: types.LOAD_TASK_EMPLOYEES_ERROR,
    isLoadingTaskEmployees: false,
    errorLoadingTaskEmployees: true,
  };
}
