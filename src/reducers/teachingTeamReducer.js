import initialState from './initialState';
import * as type from '../constants/actionTypes';

export function teachingTeamReducer(state = initialState.teachingTeam, action) {
  switch (action.type) {
    case type.BEGIN_LOAD_TEACHER_LIST:
      return Object.assign({}, state, {
        isLoadingTeacherList: action.isLoadingTeacherList,
        errorLoadingTeacherList: action.errorLoadingTeacherList,
      });
    case type.LOAD_TEACHER_LIST_SUCCESSFUL:
      return Object.assign({}, state, {
        teacherList: action.teacherList,
        isLoadingTeacherList: action.isLoadingTeacherList,
        errorLoadingTeacherList: action.errorLoadingTeacherList,
      });
    case type.LOAD_TEACHER_LIST_ERROR:
      return Object.assign({}, state, {
        isLoadingTeacherList: action.isLoadingTeacherList,
        errorLoadingTeacherList: action.errorLoadingTeacherList,
      });
    case type.BEGIN_LOAD_ASSISTANT_LIST:
      return Object.assign({}, state, {
        isLoadingAssistantList: action.isLoadingAssistantList,
        errorLoadingAssistantList: action.errorLoadingAssistantList,
      });
    case type.LOAD_ASSISTANT_LIST_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingAssistantList: action.isLoadingAssistantList,
        errorLoadingAssistantList: action.errorLoadingAssistantList,
        assistantList: action.assistantList,
      });
    case type.LOAD_ASSISTANT_LIST_ERROR:
      return Object.assign({}, state, {
        isLoadingAssistantList: action.isLoadingAssistantList,
        errorLoadingAssistantList: action.errorLoadingAssistantList,
      });
    case type.SELECTED_GEN_ID_TEACHING_TEAM_LIST: {
      return Object.assign({}, state, {
        selectedGenId: action.selectedGenId,
      });
    }
    default:
      return state;
  }
}
