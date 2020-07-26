import * as detailShiftsApi from '../apis/detailShiftsApi';
import * as type from '../constants/actionTypes';

export function loadDetailShifts(baseId, genId, id, week, token, domain) {
  return function (dispatch) {
    dispatch(beginLoadDetailShifts());
    detailShiftsApi
      .loadDetailShifts(baseId, genId, id, week, token, domain)
      .then(function (res) {
        dispatch(loadDetailShiftsSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadDetailShiftsError());
        throw error;
      });
  };
}

function beginLoadDetailShifts() {
  return {
    type: type.BEGIN_LOAD_DETAIL_SHIFTS,
    isLoading: true,
    error: false,
  };
}

function loadDetailShiftsSuccessful(res) {
  return {
    type: type.LOAD_DETAIL_SHIFTS_SUCCESSFUL,
    isLoading: false,
    error: false,
    detailShifts: res.data.data.detail_shifts,
  };
}

function loadDetailShiftsError() {
  return {
    type: type.LOAD_DETAIL_SHIFTS_ERROR,
    isLoading: false,
    error: true,
  };
}
