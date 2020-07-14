import * as types from '../constants/actionTypes';
import * as clockManageApi from '../apis/clockManageApi';

export function getShiftClock(time, token) {
  return function (dispatch) {
    dispatch(beginLoadShiftClock());
    clockManageApi
      .getShiftClock(time, token)
      .then(function (res) {
        dispatch(loadShiftClockSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadShiftClockError());
      });
  };
}

function beginLoadShiftClock() {
  return {
    type: types.BEGIN_LOAD_SHIFT_CLOCK,
    isLoadingShifts: true,
    errorShifts: false,
  };
}

function loadShiftClockSuccessful(res) {
  return {
    type: types.LOAD_SHIFT_CLOCK_SUCCESSFUL,
    isLoadingShifts: false,
    errorShifts: false,
    shifts: res.data.data.shifts,
  };
}

function loadShiftClockError() {
  return {
    type: types.LOAD_SHIFT_CLOCK_ERROR,
    isLoadingShifts: false,
    errorShifts: true,
  };
}

export function onSelectClockManageDate(date) {
  return {
    type: types.ON_SELECT_CLOCK_MANAGE_DATE,
    selectedDate: date,
  };
}

export function getTeachingClock(time, token) {
  return function (dispatch) {
    dispatch(beginLoadTeachingClock());
    clockManageApi
      .getTeachingClock(time, token)
      .then(function (res) {
        dispatch(loadTeachingClockSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadTeachingClockError());
        throw error;
      });
  };
}

function beginLoadTeachingClock() {
  return {
    type: types.BEGIN_LOAD_TEACHING_CLOCK,
    isLoadingClasses: true,
    errorClasses: false,
  };
}

function loadTeachingClockSuccessful(res) {
  return {
    type: types.LOAD_TEACHING_CLOCK_SUCCESSFUL,
    isLoadingClasses: false,
    errorClasses: false,
    classes: res.data.data.classes,
  };
}

function loadTeachingClockError() {
  return {
    type: types.LOAD_TEACHING_CLOCK_ERROR,
    isLoadingClasses: false,
    errorClasses: true,
  };
}
