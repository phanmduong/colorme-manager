import * as type from '../constants/actionTypes';
import * as teachingRatingApi from '../apis/teachingRatingApi';

export function loadTeacherRating(token, userId) {
  return function(dispatch) {
    dispatch(beginLoadingTeacherRating());
    teachingRatingApi
      .evaluateTeacher(token, userId)
      .then(function(res) {
        dispatch(loadTeacherRatingSuccessful(res));
      })
      .catch(error => {
        dispatch(loadTeacherRatingError());
        throw error;
      });
  };
}

function beginLoadingTeacherRating() {
  return {
    type: type.BEGIN_LOAD_TEACHER_RATING,
    isLoadingTeacherRating: true,
    errorTeacherRating: false,
  };
}

function loadTeacherRatingSuccessful(res) {
  return {
    type: type.LOAD_TEACHER_RATING_SUCCESSFUL,
    teacherRatingData: res.data,
    isLoadingTeacherRating: false,
    errorTeacherRating: false,
  };
}

function loadTeacherRatingError() {
  return {
    type: type.LOAD_TEACHER_RATING_ERROR,
    isLoadingTeacherRating: false,
    errorTeacherRating: true,
  };
}

export function loadAssistantRating(token, userId) {
  return function(dispatch) {
    dispatch(beginLoadingAssistantRating());
    teachingRatingApi
      .evaluateAssistant(token, userId)
      .then(function(res) {
        dispatch(loadAssistantRatingSuccessful(res));
      })
      .catch(error => {
        dispatch(loadAssistantRatingError());
        throw error;
      });
  };
}

function beginLoadingAssistantRating() {
  return {
    type: type.BEGIN_LOAD_ASSISTANT_RATING,
    isLoadingAssistantRating: true,
    errorAssistantRating: false,
  };
}

function loadAssistantRatingSuccessful(res) {
  return {
    type: type.LOAD_ASSISTANT_RATING_SUCCESSFUL,
    isLoadingAssistantRating: false,
    errorAssistantRating: false,
    assistantRatingData: res.data,
  };
}

function loadAssistantRatingError() {
  return {
    type: type.LOAD_ASSISTANT_RATING_ERROR,
    isLoadingAssistantRating: false,
    errorAssistantRating: true,
  };
}

export function selectedGenId(genId) {
  return {
    type: type.SELECTED_GEN_ID_RATING,
    selectedGenId: genId,
  };
}

export function loadTeacherFeedback(token, genId, userId) {
  return function(dispatch) {
    dispatch(beginLoadTeacherFeedback());
    teachingRatingApi
      .getTeacherFeedback(token, genId, userId)
      .then(function(res) {
        dispatch(loadTeacherFeedbackSuccessful(res));
      })
      .catch(error => {
        dispatch(loadTeacherFeedbackError());
        throw error;
      });
  };
}

function beginLoadTeacherFeedback() {
  return {
    type: type.BEGIN_LOAD_TEACHER_FEEDBACK,
    isLoadingTeacherFeedback: true,
    errorLoadingTeacherFeedback: false,
  };
}

function loadTeacherFeedbackSuccessful(res) {
  return {
    type: type.LOAD_TEACHER_FEEDBACK_SUCCESSFUL,
    isLoadingTeacherFeedback: false,
    errorLoadingTeacherFeedback: false,
    teacherFeedback: res.data.data,
  };
}

function loadTeacherFeedbackError() {
  return {
    type: type.LOAD_TEACHER_FEEDBACK_ERROR,
    isLoadingTeacherFeedback: false,
    errorLoadingTeacherFeedback: false,
  };
}

export function loadAssistantFeedback(token, genId, userId) {
  return function(dispatch) {
    dispatch(beginLoadAssistantFeedback());
    teachingRatingApi
      .getAssistantFeedback(token, genId, userId)
      .then(function(res) {
        dispatch(loadAssistantFeedbackSuccessful(res));
      })
      .catch(error => {
        dispatch(loadAssistantFeedbackError());
        throw error;
      });
  };
}

function beginLoadAssistantFeedback() {
  return {
    type: type.BEGIN_LOAD_ASSISTANT_FEEDBACK,
    isLoadingAssistantFeedback: true,
    errorLoadingAssistantFeedback: false,
  };
}

function loadAssistantFeedbackSuccessful(res) {
  return {
    type: type.LOAD_ASSISTANT_FEEDBACK_SUCCESSFUL,
    isLoadingAssistantFeedback: false,
    errorLoadingAssistantFeedback: false,
    assistantFeedback: res.data.data,
  };
}

function loadAssistantFeedbackError() {
  return {
    type: type.LOAD_ASSISTANT_FEEDBACK_ERROR,
    isLoadingAssistantFeedback: false,
    errorLoadingAssistantFeedback: false,
  };
}
