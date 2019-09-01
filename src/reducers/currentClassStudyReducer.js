/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function classReducer(
  state = initialState.currentClassStudy,
  action,
) {
  switch (action.type) {
    case types.BEGIN_DATA_CURRENT_CLASS_STUDY_LOAD:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
      });
    case types.LOAD_DATA_CURRENT_CLASS_STUDY_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
        classData: action.classData,
        // classData: state.classData
      });
    case types.LOAD_DATA_CURRENT_CLASS_STUDY_ERROR:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
      });
    case types.SELECTED_CURRENT_CLASS_STUDY:
      return Object.assign({}, state, {
        selectedCurrentClassStudy: action.selectedCurrentClassStudy,
      });
    default:
      return state;
  }
}
