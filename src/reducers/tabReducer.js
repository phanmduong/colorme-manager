import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function tabReducer(state = initialState.tab, action) {
  switch (action.type) {
    case types.BEGIN_LOAD_TABS:
      return Object.assign({}, state, {
        loading: action.loading,
        error: action.error,
      });
    case types.LOAD_TABS_SUCCESSFUL:
      return Object.assign({}, state, {
        loading: action.loading,
        error: action.error,
        tabs: action.tabs,
      });
    case types.LOAD_TABS_ERROR:
      return Object.assign({}, state, {
        loading: action.loading,
        error: action.error,
      });
    default:
      return state;
  }
}
