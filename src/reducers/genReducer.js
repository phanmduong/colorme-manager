/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function genReducer(state = initialState.gen, action) {
  switch (action.type) {
    case types.BEGIN_DATA_GEN_LOAD:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
      });
    case types.LOAD_DATA_GEN_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
        genData: action.genData,
        currentGen: action.currentGen,
        teachingGen: action.teachingGen,
      });
    case types.LOAD_DATA_GEN_V2_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
        genDataV2: action.genData,
      });
    case types.LOAD_DATA_GEN_ERROR:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
      });
    case types.SELECTED_GEN_ID:
      return Object.assign({}, state, {
        selectedGenId: action.selectedGenId,
      });
    default:
      return state;
  }
}
