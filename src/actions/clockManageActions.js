import * as types from '../constants/actionTypes';
import * as clockManageApi from '../apis/clockManageApi';
import moment from 'moment';

export function getShiftClock(time, token, domain) {
  return function (dispatch) {
    dispatch(beginLoadShiftClock());
    clockManageApi
      .getShiftClock(time, token, domain)
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

export function getTeachingClock(time, token, domain) {
  return function (dispatch) {
    dispatch(beginLoadTeachingClock());
    clockManageApi
      .getTeachingClock(time, token, domain)
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

export function resetClock() {
  return {
    type: types.RESET_CLOCK,
    selectedDate: moment(new Date()).unix(),
    shifts: [],
    classes: [],
    workShiftData: [],
  };
}

export function getWorkShiftClock(time, token, domain) {
  return function (dispatch) {
    dispatch(beginLoadWorkShiftClock());
    clockManageApi
      .getWorkShiftClock(time, token, domain)
      .then(function (res) {
        dispatch(loadWorkShiftClockSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadWorkShiftClockError());
        throw error;
      });
  };
}

function beginLoadWorkShiftClock() {
  return {
    type: types.BEGIN_LOAD_WORK_SHIFT_CLOCK,
    isLoadingWorkShiftData: true,
    errorWorkShiftData: false,
  };
}

function loadWorkShiftClockSuccessful(res) {
  return {
    type: types.LOAD_WORK_SHIFT_CLOCK_SUCCESSFUL,
    isLoadingWorkShiftData: false,
    errorWorkShiftData: false,
    workShiftData: res.data.data,
  };
}

function loadWorkShiftClockError() {
  return {
    type: types.LOAD_WORK_SHIFT_CLOCK_ERROR,
    isLoadingWorkShiftData: false,
    errorWorkShiftData: true,
  };
}

export function onSelectWorkShiftClockEmployee(employee) {
  return {
    type: types.ON_SELECT_WORK_SHIFT_CLOCK_EMPLOYEE,
    selectedEmployee: employee,
  };
}

function loadEmployeeWorkShiftClockSuccessful(employee) {
  return {
    type: types.LOAD_EMPLOYEE_WORK_SHIFT_CLOCK_SUCCESSFUL,
    isLoadingWorkShiftData: false,
    errorWorkShiftData: false,
    selectedEmployee: employee,
  };
}

export function getEmployeeWorkShiftClock(employeeId, time, token, domain) {
  return function (dispatch) {
    dispatch(beginLoadWorkShiftClock());
    clockManageApi
      .getWorkShiftClock(time, token, domain)
      .then(function (res) {
        const shifts = res.data.data;
        const employee = shifts.find((person) => person.id === employeeId);
        dispatch(loadEmployeeWorkShiftClockSuccessful(employee));
      })
      .catch((error) => {
        dispatch(loadWorkShiftClockError());
        throw error;
      });
  };
}

export function onSelectEmployeeWorkShiftClockManageDate(date) {
  return {
    type: types.ON_SELECT_EMPLOYEE_WORK_SHIFT_CLOCK_MANAGE_DATE,
    employeeSelectedDate: date,
  };
}
