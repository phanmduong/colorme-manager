import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function documentReducer(
  state = initialState.document,
  actions,
) {
  switch (actions.type) {
    case types.BEGIN_LOAD_DOCUMENTS:
      return Object.assign({}, state, {
        isLoadingDoc: actions.isLoadingDoc,
        errorDoc: actions.errorDoc,
      });
    case types.LOAD_DOCUMENTS_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingDoc: actions.isLoadingDoc,
        errorDoc: actions.errorDoc,
        documents: actions.documents,
      });
    case types.LOAD_DOCUMENTS_ERROR:
      return Object.assign({}, state, {
        isLoadingDoc: actions.isLoadingDoc,
        errorDoc: actions.errorDoc,
      });
    default:
      return state;
  }
}
