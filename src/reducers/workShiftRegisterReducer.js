import initialState from './initialState';
import * as type from '../constants/actionTypes';

let workShiftRegisterData;
export default function workShiftRegisterReducer(
  state = initialState.workShiftRegister,
  action,
) {
  switch (action.type) {
    case type.BEGIN_LOAD_WORK_SHIFT_DATA:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
      });
    case type.BEGIN_REFRESH_WORK_SHIFT_DATA:
      return Object.assign({}, state, {
        refreshing: action.refreshing,
        error: action.error,
        workShiftRegisterData: action.workShiftRegisterData,
      });
    case type.LOAD_WORK_SHIFT_DATA_SUCCESSFUL:
      return Object.assign({}, state, {
        workShiftRegisterData: action.workShiftRegisterData,
        isLoading: action.isLoading,
        error: action.error,
        refreshing: action.refreshing,
      });
    case type.LOAD_WORK_SHIFT_DATA_ERROR:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
        refreshing: action.refreshing,
      });
    case type.SELECTED_BASE_ID_WORK_SHIFT_REGISTER:
      return Object.assign({}, state, {
        selectedBaseId: action.selectedBaseId,
      });
    case type.SELECTED_START_TIME_WORK_SHIFT_REGISTER:
      return Object.assign({}, state, {
        startTime: action.startTime,
      });
    case type.SELECTED_END_TIME_WORK_SHIFT_REGISTER:
      return Object.assign({}, state, {
        endTime: action.endTime,
      });
    case type.BEGIN_WORK_SHIFT_REGISTER: {
      workShiftRegisterData = state.workShiftRegisterData;
      workShiftRegisterData = loadingRegistering(
        action.workShiftId,
        'isRegistering',
        action.isRegistering,
      );
      workShiftRegisterData = loadingRegistering(
        action.workShiftId,
        'errorRegistering',
        action.errorRegistering,
      );
      return Object.assign({}, state, {
        workShiftRegisterData: workShiftRegisterData,
      });
    }
    case type.WORK_SHIFT_REGISTERING: {
      workShiftRegisterData = state.workShiftRegisterData;
      workShiftRegisterData = registering(
        action.shift.id,
        'users',
        action.shift.user,
      );
      return Object.assign({}, state, {
        workShiftRegisterData: workShiftRegisterData,
      });
    }
    case type.WORK_SHIFT_REGISTER_SUCCESSFUL: {
      workShiftRegisterData = state.workShiftRegisterData;
      workShiftRegisterData = loadingRegistering(
        action.workShiftId,
        'isRegistering',
        action.isRegistering,
      );
      workShiftRegisterData = loadingRegistering(
        action.workShiftId,
        'errorRegistering',
        action.errorRegistering,
      );
      return Object.assign({}, state, {
        workShiftRegisterData: workShiftRegisterData,
      });
    }
    case type.WORK_SHIFT_REGISTER_ERROR: {
      workShiftRegisterData = state.workShiftRegisterData;
      workShiftRegisterData = loadingRegistering(
        action.workShiftId,
        'isRegistering',
        action.isRegistering,
      );
      workShiftRegisterData = loadingRegistering(
        action.workShiftId,
        'errorRegistering',
        action.errorRegistering,
      );
      return Object.assign({}, state, {
        workShiftRegisterData: workShiftRegisterData,
      });
    }
    case type.BEGIN_WORK_SHIFT_UNREGISTER: {
      workShiftRegisterData = state.workShiftRegisterData;
      workShiftRegisterData = loadingRegistering(
        action.workShiftId,
        'isUnregistering',
        action.isUnregistering,
      );
      workShiftRegisterData = loadingRegistering(
        action.workShiftId,
        'errorUnregistering',
        action.errorUnregistering,
      );
      return Object.assign({}, state, {
        workShiftRegisterData: workShiftRegisterData,
      });
    }
    case type.WORK_SHIFT_UNREGISTERING: {
      workShiftRegisterData = state.workShiftRegisterData;
      workShiftRegisterData = unregistering(
        action.shift.id,
        'users',
        action.shift.user,
      );
      return Object.assign({}, state, {
        workShiftRegisterData: workShiftRegisterData,
      });
    }
    case type.WORK_SHIFT_UNREGISTER_SUCCESSFUL: {
      workShiftRegisterData = state.workShiftRegisterData;
      workShiftRegisterData = loadingRegistering(
        action.workShiftId,
        'isUnregistering',
        action.isUnregistering,
      );
      workShiftRegisterData = loadingRegistering(
        action.workShiftId,
        'errorUnregistering',
        action.errorUnregistering,
      );
      return Object.assign({}, state, {
        workShiftRegisterData: workShiftRegisterData,
      });
    }
    case type.WORK_SHIFT_UNREGISTER_ERROR: {
      workShiftRegisterData = state.workShiftRegisterData;
      workShiftRegisterData = loadingRegistering(
        action.workShiftId,
        'isUnregistering',
        action.isUnregistering,
      );
      workShiftRegisterData = loadingRegistering(
        action.workShiftId,
        'errorUnregistering',
        action.errorUnregistering,
      );
      return Object.assign({}, state, {
        workShiftRegisterData: workShiftRegisterData,
      });
    }
    default:
      return state;
  }
}

function registering(workShiftId, field, user) {
  try {
    if (workShiftRegisterData.weeks) {
      let weeks = workShiftRegisterData.weeks.map((week) => {
        let dates = week.dates.map((date) => {
          let shifts = date.shifts.map((shift) => {
            if (shift.id === workShiftId) {
              let users = shift.users;
              users.push(user);
              return {...shift, [field]: users};
            }
            return shift;
          });
          return {...date, shifts: shifts};
        });
        return {...week, dates: dates};
      });
      return {...workShiftRegisterData, weeks: weeks};
    }
  } catch (err) {
    throw new Error(err);
  }
  return workShiftRegisterData;
}

function loadingRegistering(workShiftId, field, value) {
  try {
    if (workShiftRegisterData.weeks) {
      let weeks = workShiftRegisterData.weeks.map((week) => {
        let dates = week.dates.map((date) => {
          let shifts = date.shifts.map((shift) => {
            if (shift.id === workShiftId) {
              return {...shift, [field]: value};
            }
            return shift;
          });
          return {...date, shifts: shifts};
        });
        return {...week, dates: dates};
      });
      return {...workShiftRegisterData, weeks: weeks};
    }
  } catch (err) {
    throw new Error(err);
  }
  return workShiftRegisterData;
}

function unregistering(workShiftId, field, user) {
  try {
    if (workShiftRegisterData.weeks) {
      let weeks = workShiftRegisterData.weeks.map((week) => {
        let dates = week.dates.map((date) => {
          let shifts = date.shifts.map((shift) => {
            if (shift.id === workShiftId) {
              let users = shift.users;
              let itemIndex = getIndex(users, user);
              console.log(itemIndex);
              users.splice(itemIndex, 1);
              return {...shift, [field]: users};
            }
            return shift;
          });
          return {...date, shifts: shifts};
        });
        return {...week, dates: dates};
      });
      return {...workShiftRegisterData, weeks: weeks};
    }
  } catch (err) {
    throw new Error(err);
  }
  return workShiftRegisterData;
}

function getIndex(array, user) {
  return array.findIndex((item) => item.id === user.id);
}
