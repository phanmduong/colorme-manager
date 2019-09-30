import * as type from '../constants/actionTypes';
import * as teachingRatingApi from '../apis/teachingRatingApi';

export function loadTeacherRating(token) {
  return function(dispatch) {
    dispatch(beginLoadingTeacherRating());
    teachingRatingApi
      .evaluateTeacher(token)
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

export function loadAssistantRating(token) {
  return function(dispatch) {
    dispatch(beginLoadingAssistantRating());
    teachingRatingApi
      .evaluateAssistant(token)
      .then(function(res) {
        dispatch(loadAssistantRatingSuccessful(res));
      })
      .catch(error => {
        dispatch(loadAssistantRatingError());
        throw error;
      });
  };
}

export function beginLoadingAssistantRating() {
  return {
    type: type.BEGIN_LOAD_ASSISTANT_RATING,
    isLoadingAssistantRating: true,
    errorAssistantRating: false,
  };
}

export function loadAssistantRatingSuccessful(res) {
  return {
    type: type.LOAD_ASSISTANT_RATING_SUCCESSFUL,
    isLoadingAssistantRating: false,
    errorAssistantRating: false,
    assistantRatingData: res.data,
  };
}

export function loadAssistantRatingError() {
  return {
    type: type.LOAD_ASSISTANT_RATING_ERROR,
    isLoadingAssistantRating: false,
    errorAssistantRating: true,
  };
}

export function loadFeedback(token, genId) {
  return function(dispatch) {
    dispatch(beginLoadingFeedback());
    teachingRatingApi
      .getFeedback(token, genId)
      .then(function(res) {
        dispatch(loadFeedbackSuccessful(res));
      })
      .catch(error => {
        dispatch(loadFeedbackError());
        throw error;
      });
  };
}

export function beginLoadingFeedback() {
  return {
    type: type.BEGIN_LOAD_TEACHING_FEEDBACK,
    isLoadingFeedback: true,
    errorLoadingFeedback: false,
  };
}

export function loadFeedbackSuccessful(res) {
  return {
    type: type.LOAD_TEACHING_FEEDBACK_SUCCESSFUL,
    isLoadingFeedback: false,
    errorLoadingFeedback: false,
    feedback: res.data.data,
  };
}

export function loadFeedbackError() {
  return {
    type: type.LOAD_TEACHING_FEEDBACK_ERROR,
    isLoadingFeedback: false,
    errorLoadingFeedback: false,
  };
}

export function selectedGenId(genId) {
  return {
    type: type.SELECTED_GEN_ID_RATING,
    selectedGenId: genId,
  };
}
