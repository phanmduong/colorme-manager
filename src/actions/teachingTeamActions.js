import * as teachingRatingApi from '../apis/teachingRatingApi';
import * as type from '../constants/actionTypes';

export function loadTeacherList(token, genId) {
  return function(dispatch) {
    dispatch(beginLoadTeacherList());
    teachingRatingApi
      .getTeacherList(token, genId)
      .then(function(res) {
        dispatch(loadTeacherListSuccessful(res));
      })
      .catch(error => {
        dispatch(loadTeacherListError());
        throw error;
      });
  };
}

function beginLoadTeacherList() {
  return {
    type: type.BEGIN_LOAD_TEACHER_LIST,
    isLoadingTeacherList: true,
    errorLoadingTeacherList: false,
  };
}

function loadTeacherListSuccessful(res) {
  return {
    type: type.LOAD_TEACHER_LIST_SUCCESSFUL,
    isLoadingTeacherList: false,
    errorLoadingTeacherList: false,
    teacherList: res.data,
  };
}

function loadTeacherListError() {
  return {
    type: type.LOAD_TEACHER_LIST_ERROR,
    isLoadingTeacherList: false,
    errorLoadingTeacherList: false,
  };
}

export function loadAssistantList(token, genId) {
  return function(dispatch) {
    dispatch(beginLoadAssistantList());
    teachingRatingApi
      .getAssistantList(token, genId)
      .then(function(res) {
        dispatch(loadAssistantListSuccessful(res));
      })
      .catch(error => {
        dispatch(loadAssistantListError());
        throw error;
      });
  };
}

function beginLoadAssistantList() {
  return {
    type: type.BEGIN_LOAD_ASSISTANT_LIST,
    isLoadingAssistantList: true,
    errorLoadingAssistantList: false,
  };
}

function loadAssistantListSuccessful(res) {
  return {
    type: type.LOAD_ASSISTANT_LIST_SUCCESSFUL,
    isLoadingAssistantList: false,
    errorLoadingAssistantList: false,
    assistantList: res.data,
  };
}

function loadAssistantListError() {
  return {
    type: type.LOAD_ASSISTANT_LIST_ERROR,
    isLoadingAssistantList: false,
    errorLoadingAssistantList: false,
  };
}

export function selectedGenId(genId) {
  return {
    type: type.SELECTED_GEN_ID_TEACHING_TEAM_LIST,
    selectedGenId: genId,
  };
}
