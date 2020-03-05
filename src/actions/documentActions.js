import * as types from '../constants/actionTypes';
import * as documentApi from '../apis/documentApi';

export function loadDocuments(token) {
  return function(dispatch) {
    dispatch(beginLoadDocuments());
    documentApi
      .loadDocuments(token)
      .then(function(res) {
        dispatch(loadDocumentsSuccessful(res));
      })
      .catch(error => {
        dispatch(loadDocumentsError());
        throw error;
      });
  };
}

function beginLoadDocuments() {
  return {
    type: types.BEGIN_LOAD_DOCUMENTS,
    isLoadingDoc: true,
    errorDoc: false,
  };
}

function loadDocumentsSuccessful(res) {
  return {
    type: types.LOAD_DOCUMENTS_SUCCESSFUL,
    isLoadingDoc: false,
    errorDoc: false,
    documents: res.data.documents,
  };
}

function loadDocumentsError() {
  return {
    type: types.LOAD_DOCUMENTS_ERROR,
    isLoadingDoc: false,
    errorDoc: true,
  };
}
