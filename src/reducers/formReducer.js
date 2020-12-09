import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function formReducer(state = initialState.form, action) {
  switch (action.type) {
    case types.BEGIN_LOAD_FORMS:
      return Object.assign({}, state, {
        loading: action.loading,
        error: action.error,
      });
    case types.BEGIN_REFRESH_FORMS:
      return Object.assign({}, state, {
        refreshing: action.refreshing,
        error: action.error,
      });
    case types.LOAD_FORMS_SUCCESS:
      let forms =
        action.currentPage === 1
          ? action.forms
          : [...state.forms, ...action.forms];
      return Object.assign({}, state, {
        loading: action.loading,
        error: action.error,
        forms: forms,
        refreshing: action.refreshing,
        currentPage: action.currentPage,
        totalPage: action.totalPage,
      });
    case types.LOAD_FORMS_ERROR:
      return Object.assign({}, state, {
        loading: action.loading,
        error: action.error,
        refreshing: action.refreshing,
      });
    case types.BEGIN_SEARCH_FORMS:
      return Object.assign({}, state, {
        forms: action.forms,
        currentPage: action.currentPage,
        totalPage: action.totalPage,
        search: action.search,
      });
    case types.RESET_FORMS:
      return Object.assign({}, state, {
        forms: action.forms,
        currentPage: action.currentPage,
        totalPage: action.totalPage,
        search: action.search,
      });
    default:
      return state;
  }
}
