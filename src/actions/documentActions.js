import * as types from '../constants/actionTypes';
import * as documentApi from '../apis/documentApi';
import * as meetingApi from '../apis/meetingApi';

export function loadDocuments(departmentId, token, domain) {
  return function(dispatch) {
    dispatch(beginLoadDocuments());
    documentApi
      .loadDocuments(departmentId, token, domain)
      .then(function(res) {
        dispatch(loadDocumentsSuccessful(res));
      })
      .catch(error => {
        dispatch(loadDocumentsError());
        throw error;
      });
  };
}

export function refreshDocuments(departmentId, token, domain) {
  return function(dispatch) {
    dispatch(beginRefreshDocuments());
    documentApi
      .loadDocuments(departmentId, token, domain)
      .then(function(res) {
        dispatch(loadDocumentsSuccessful(res));
      })
      .catch(error => {
        dispatch(loadDocumentsError());
        throw error;
      });
  };
}

function beginRefreshDocuments() {
  return {
    type: types.BEGIN_LOAD_DOCUMENTS,
    refreshingDoc: true,
    errorDoc: false,
  };
}

function beginLoadDocuments() {
  return {
    type: types.BEGIN_LOAD_DOCUMENTS,
    isLoadingDoc: true,
    errorDoc: false,
  };
}

function loadDocumentsSuccessful(res) {
  return {
    type: types.LOAD_DOCUMENTS_SUCCESSFUL,
    isLoadingDoc: false,
    errorDoc: false,
    refreshingDoc: false,
    documents: res.data.documents,
  };
}

function loadDocumentsError() {
  return {
    type: types.LOAD_DOCUMENTS_ERROR,
    isLoadingDoc: false,
    refreshingDoc: false,
    errorDoc: true,
  };
}

export function loadDepartmentFilter(token, domain) {
  return function(dispatch) {
    dispatch(beginLoadDepartmentFilter());
    meetingApi
      .loadFilterMeeting(token, domain)
      .then(function(res) {
        dispatch(loadDepartmentFilterSuccessful(res));
      })
      .catch(error => {
        dispatch(loadDepartmentFilterError());
        throw error;
      });
  };
}

function beginLoadDepartmentFilter() {
  return {
    type: types.BEGIN_LOAD_DEPARTMENT_FILTER,
    isLoadingDepartments: true,
    errorDepartments: false,
  };
}

function loadDepartmentFilterSuccessful(res) {
  return {
    type: types.LOAD_DEPARTMENT_FILTER_SUCCESSFUL,
    isLoadingDepartments: false,
    errorDepartments: false,
    departments: res.data.data.filter.departments,
  };
}

function loadDepartmentFilterError() {
  return {
    type: types.LOAD_DEPARTMENT_FILTER_ERROR,
    isLoadingDepartments: false,
    errorDepartments: true,
  };
}
