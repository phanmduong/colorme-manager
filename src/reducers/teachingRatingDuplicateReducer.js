import initialState from './initialState';
import * as type from '../constants/actionTypes';

export function teachingRatingDuplicateReducer(
  state = initialState.teachingRatingDuplicate,
  action,
) {
  switch (action.type) {
    case type.BEGIN_LOAD_TEACHER_RATING_DUPLICATE:
      return Object.assign({}, state, {
        isLoadingTeacherRating: action.isLoadingTeacherRating,
        errorTeacherRating: action.errorTeacherRating,
      });
    case type.LOAD_TEACHER_RATING_SUCCESSFUL_DUPLICATE:
      return Object.assign({}, state, {
        isLoadingTeacherRating: action.isLoadingTeacherRating,
        errorTeacherRating: action.errorTeacherRating,
        teacherRatingData: action.teacherRatingData,
      });
    case type.LOAD_TEACHER_RATING_ERROR_DUPLICATE:
      return Object.assign({}, state, {
        isLoadingTeacherRating: action.isLoadingTeacherRating,
        errorTeacherRating: action.errorTeacherRating,
      });
    case type.BEGIN_LOAD_ASSISTANT_RATING_DUPLICATE:
      return Object.assign({}, state, {
        isLoadingAssistantRating: action.isLoadingAssistantRating,
        errorAssistantRating: action.errorAssistantRating,
      });
    case type.LOAD_ASSISTANT_RATING_SUCCESSFUL_DUPLICATE:
      return Object.assign({}, state, {
        isLoadingAssistantRating: action.isLoadingAssistantRating,
        errorAssistantRating: action.errorAssistantRating,
        assistantRatingData: action.assistantRatingData,
      });
    case type.LOAD_ASSISTANT_RATING_ERROR_DUPLICATE:
      return Object.assign({}, state, {
        isLoadingAssistantRating: action.isLoadingAssistantRating,
        errorAssistantRating: action.errorAssistantRating,
      });
    case type.SELECTED_GEN_ID_RATING_DUPLICATE:
      return Object.assign({}, state, {
        selectedGenId: action.selectedGenId,
      });
    case type.BEGIN_LOAD_TEACHER_FEEDBACK_DUPLICATE:
      return Object.assign({}, state, {
        isLoadingTeacherFeedback: action.isLoadingTeacherFeedback,
        errorLoadingTeacherFeedback: action.errorLoadingTeacherFeedback,
      });
    case type.LOAD_TEACHER_FEEDBACK_SUCCESSFUL_DUPLICATE:
      return Object.assign({}, state, {
        isLoadingTeacherFeedback: action.isLoadingTeacherFeedback,
        errorLoadingTeacherFeedback: action.errorLoadingTeacherFeedback,
        teacherFeedback: action.teacherFeedback,
      });
    case type.LOAD_TEACHER_FEEDBACK_ERROR_DUPLICATE:
      return Object.assign({}, state, {
        isLoadingTeacherFeedback: action.isLoadingTeacherFeedback,
        errorLoadingTeacherFeedback: action.errorLoadingTeacherFeedback,
      });
    case type.BEGIN_LOAD_ASSISTANT_FEEDBACK_DUPLICATE:
      return Object.assign({}, state, {
        isLoadingAssistantFeedback: action.isLoadingAssistantFeedback,
        errorLoadingAssistantFeedback: action.errorLoadingAssistantFeedback,
      });
    case type.LOAD_ASSISTANT_FEEDBACK_SUCCESSFUL_DUPLICATE:
      return Object.assign({}, state, {
        isLoadingAssistantFeedback: action.isLoadingAssistantFeedback,
        errorLoadingAssistantFeedback: action.errorLoadingAssistantFeedback,
        assistantFeedback: action.assistantFeedback,
      });
    case type.LOAD_ASSISTANT_FEEDBACK_ERROR_DUPLICATE:
      return Object.assign({}, state, {
        isLoadingAssistantFeedback: action.isLoadingAssistantFeedback,
        errorLoadingAssistantFeedback: action.errorLoadingAssistantFeedback,
      });
    default:
      return state;
  }
}
