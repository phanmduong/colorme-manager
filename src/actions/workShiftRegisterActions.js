import * as workShiftRegisterApi from '../apis/workShiftRegisterApi';
import * as type from '../constants/actionTypes';

export function loadWorkShift(
  refreshing,
  startTime,
  endTime,
  baseId,
  selectedStaffId,
  token,
  domain,
) {
  return function (dispatch) {
    if (!refreshing) {
      dispatch(beginLoadWorkShiftData());
    } else {
      dispatch(beginRefreshWorkShiftData());
    }
    workShiftRegisterApi
      .loadWorkShift(startTime, endTime, baseId, token, domain)
      .then(function (res) {
        dispatch(loadWorkShiftDataSuccessful(res, selectedStaffId));
      })
      .catch((error) => {
        dispatch(loadWorkShiftDataError(error));
        throw error;
      });
  };
}

export function selectedBaseId(baseId) {
  return {
    type: type.SELECTED_BASE_ID_WORK_SHIFT_REGISTER,
    selectedBaseId: baseId,
  };
}

export function selectedStartTime(time) {
  return {
    type: type.SELECTED_START_TIME_WORK_SHIFT_REGISTER,
    startTime: time,
  };
}

export function selectedEndTime(time) {
  return {
    type: type.SELECTED_END_TIME_WORK_SHIFT_REGISTER,
    endTime: time,
  };
}

export function beginRefreshWorkShiftData() {
  return {
    type: type.BEGIN_REFRESH_WORK_SHIFT_DATA,
    refreshing: true,
    error: false,
    workShiftRegisterData: [],
  };
}

export function beginLoadWorkShiftData() {
  return {
    type: type.BEGIN_LOAD_WORK_SHIFT_DATA,
    isLoading: true,
    error: false,
  };
}

export function loadWorkShiftDataSuccessful(res, selectedStaffId) {
  return {
    type: type.LOAD_WORK_SHIFT_DATA_SUCCESSFUL,
    workShiftRegisterData: res.data.work_shifts,
    isLoading: false,
    error: false,
    refreshing: false,
    selectedStaffId: selectedStaffId,
  };
}

export function loadWorkShiftDataError(error) {
  return {
    type: type.LOAD_WORK_SHIFT_DATA_ERROR,
    isLoading: false,
    error: true,
    refreshing: false,
  };
}

export function register(workShiftId, token, domain) {
  return function (dispatch) {
    dispatch(beginWorkShiftRegister(workShiftId));
    workShiftRegisterApi
      .registerWorkShift(workShiftId, token, domain)
      .then(function (res) {
        dispatch(
          registering(
            JSON.stringify({
              id: workShiftId,
              user: res.data.work_shift_user.user,
            }),
          ),
        );
        dispatch(workShiftRegisterSuccessful(workShiftId));
      })
      .catch((error) => {
        dispatch(workShiftRegisterError(workShiftId));
        throw error;
      });
  };
}

export function beginWorkShiftRegister(workShiftId) {
  return {
    type: type.BEGIN_WORK_SHIFT_REGISTER,
    workShiftId: workShiftId,
    isRegistering: true,
    errorRegistering: false,
  };
}

export function workShiftRegisterSuccessful(workShiftId) {
  return {
    type: type.WORK_SHIFT_REGISTER_SUCCESSFUL,
    workShiftId: workShiftId,
    isRegistering: false,
    errorRegistering: false,
  };
}

export function registering(shift) {
  return {
    type: type.WORK_SHIFT_REGISTERING,
    shift: JSON.parse(shift),
  };
}

export function workShiftRegisterError(workShiftId) {
  return {
    type: type.WORK_SHIFT_REGISTER_ERROR,
    workShiftId: workShiftId,
    isRegistering: false,
    errorRegistering: true,
  };
}

export function beginWorkShiftUnregister(workShiftId) {
  return {
    type: type.BEGIN_WORK_SHIFT_UNREGISTER,
    workShiftId: workShiftId,
    isUnregistering: true,
    errorUnregistering: false,
  };
}

export function workShiftUnregisterSuccessful(workShiftId) {
  return {
    type: type.WORK_SHIFT_UNREGISTER_SUCCESSFUL,
    workShiftId: workShiftId,
    isUnregistering: false,
    errorUnregistering: false,
  };
}

export function unregistering(shift) {
  return {
    type: type.WORK_SHIFT_UNREGISTERING,
    shift: JSON.parse(shift),
  };
}

export function workShiftUnregisterError(workShiftId) {
  return {
    type: type.WORK_SHIFT_UNREGISTER_ERROR,
    workShiftId: workShiftId,
    isUnregistering: false,
    errorUnregistering: false,
  };
}

export function unregister(workShiftId, token, domain) {
  return function (dispatch) {
    dispatch(beginWorkShiftUnregister(workShiftId));
    workShiftRegisterApi
      .removeWorkShift(workShiftId, token, domain)
      .then(function (res) {
        dispatch(
          unregistering(
            JSON.stringify({
              id: workShiftId,
              user: res.data.work_shift_user.user,
            }),
          ),
        );
        dispatch(workShiftUnregisterSuccessful(workShiftId));
      })
      .catch((error) => {
        dispatch(workShiftUnregisterError(workShiftId));
        throw error;
      });
  };
}

export function onSelectStaffId(id) {
  return {
    type: type.SELECTED_STAFF_ID_WORK_SHIFT_REGISTER,
    selectedStaffId: id,
  };
}
