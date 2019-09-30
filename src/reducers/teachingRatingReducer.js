import initialState from './initialState';
import * as type from '../constants/actionTypes';

export function teachingRatingReducer(
  state = initialState.teachingRating,
  action,
) {
  switch (action.type) {
    case type.BEGIN_LOAD_TEACHER_RATING:
      return Object.assign({}, state, {
        isLoadingTeacherRating: action.isLoadingTeacherRating,
        errorTeacherRating: action.errorTeacherRating,
      });
    case type.LOAD_TEACHER_RATING_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingTeacherRating: action.isLoadingTeacherRating,
        errorTeacherRating: action.errorTeacherRating,
        teacherRatingData: action.teacherRatingData,
      });
    case type.LOAD_WORK_SHIFT_DATA_ERROR:
      return Object.assign({}, state, {
        isLoadingTeacherRating: action.isLoadingTeacherRating,
        errorTeacherRating: action.errorTeacherRating,
      });
    case type.BEGIN_LOAD_ASSISTANT_RATING:
      return Object.assign({}, state, {
        isLoadingAssistantRating: action.isLoadingAssistantRating,
        errorAssistantRating: action.errorAssistantRating,
      });
    case type.LOAD_ASSISTANT_RATING_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingAssistantRating: action.isLoadingAssistantRating,
        errorAssistantRating: action.errorAssistantRating,
        assistantRatingData: action.assistantRatingData,
      });
    case type.LOAD_ASSISTANT_RATING_ERROR:
      return Object.assign({}, state, {
        isLoadingAssistantRating: action.isLoadingAssistantRating,
        errorAssistantRating: action.errorAssistantRating,
      });
    case type.BEGIN_LOAD_TEACHING_FEEDBACK:
      return Object.assign({}, state, {
        isLoadingFeedback: action.isLoadingFeedback,
        errorLoadingFeedback: action.errorLoadingFeedback,
      });
    case type.LOAD_TEACHING_FEEDBACK_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingFeedback: action.isLoadingFeedback,
        errorLoadingFeedback: action.errorLoadingFeedback,
        feedback: action.feedback,
      });
    case type.LOAD_TEACHING_FEEDBACK_ERROR:
      return Object.assign({}, state, {
        isLoadingFeedback: action.isLoadingFeedback,
        errorLoadingFeedback: action.errorLoadingFeedback,
      });
    case type.SELECTED_GEN_ID_RATING:
      return Object.assign({}, state, {
        selectedGenId: action.selectedGenId,
      });
    default:
      return state;
  }
}
