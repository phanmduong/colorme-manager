import * as types from '../constants/actionTypes';
import * as tabApi from '../apis/tabApi';

export function loadTabs(token) {
  return function (dispatch) {
    dispatch(beginLoadTabs());
    tabApi
      .loadTabs(token)
      .then((res) => {
        dispatch(loadTabsSuccess(res));
      })
      .catch((error) => {
        dispatch(loadTabsError());
        throw error;
      });
  };
}

function beginLoadTabs() {
  return {
    type: types.BEGIN_LOAD_TABS,
    loading: true,
    error: false,
  };
}

function loadTabsSuccess(res) {
  return {
    type: types.LOAD_TABS_SUCCESSFUL,
    loading: false,
    error: false,
    tabs: res.data.data.tabs,
  };
}

function loadTabsError() {
  return {
    type: types.LOAD_TABS_ERROR,
    loading: false,
    error: true,
  };
}
