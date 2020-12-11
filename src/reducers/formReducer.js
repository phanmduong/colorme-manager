import initialState from './initialState';
import * as types from '../constants/actionTypes';

let forms;

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
      forms =
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
    case types.BEGIN_CREATE_FORM:
      return Object.assign({}, state, {
        creating: action.creating,
      });
    case types.CREATE_FORM_SUCCESS:
      forms = [...state.forms];
      forms.unshift(action.registerForm);
      return Object.assign({}, state, {
        creating: action.creating,
        forms: forms,
      });
    case types.CREATE_FORM_ERROR:
      return Object.assign({}, state, {
        creating: action.creating,
      });
    case types.BEGIN_UPDATE_FORM:
      return Object.assign({}, state, {
        updating: action.updating,
      });
    case types.UPDATE_FORM_SUCCESS:
      forms = [...state.forms];
      const elementIdx = forms.findIndex(
        (item) => item.id === action.registerForm.id,
      );
      if (elementIdx > -1) {
        forms.splice(elementIdx, 1);
        forms.splice(elementIdx, 0, action.registerForm);
      }
      return Object.assign({}, state, {
        forms: forms,
      });
    case types.UPDATE_FORM_COMPLETE:
      return Object.assign({}, state, {
        updating: action.updating,
      });
    default:
      return state;
  }
}
