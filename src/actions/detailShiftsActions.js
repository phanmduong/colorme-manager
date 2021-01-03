import * as detailShiftsApi from '../apis/detailShiftsApi';
import * as type from '../constants/actionTypes';

export function loadDetailShifts(baseId, id, week, token) {
  return function(dispatch) {
    dispatch(beginLoadDetailShifts());
    detailShiftsApi
      .loadDetailShifts(baseId, id, week, token)
      .then(function(res) {
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
