import initialState from './initialState';
import * as type from '../constants/actionTypes';
import {isEmptyInput} from '../helper';

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
      workShiftRegisterData = action.workShiftRegisterData;
      workShiftRegisterData = filterParticipates(
        'users',
        action.selectedStaffId,
      );
      return Object.assign({}, state, {
        workShiftRegisterData: workShiftRegisterData,
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
    case type.SELECTED_STAFF_ID_WORK_SHIFT_REGISTER: {
      return Object.assign({}, state, {
        selectedStaffId: action.selectedStaffId,
      });
    }
    default:
      return state;
  }
}

function registering(workShiftId, field, user) {
  return workShiftRegisterData.map((shift) => {
    if (shift.id === workShiftId) {
      let users = shift.users;
      users.push(user);
      return {...shift, [field]: users};
    }
    return shift;
  });
}

function loadingRegistering(workShiftId, field, value) {
  return workShiftRegisterData.map((shift) => {
    if (shift.id === workShiftId) {
      return {...shift, [field]: value};
    }
    return shift;
  });
}

function unregistering(workShiftId, field, user) {
  return workShiftRegisterData.map((shift) => {
    if (shift.id === workShiftId) {
      let users = shift.users;
      let itemIndex = getIndex(users, user);
      users.splice(itemIndex, 1);
      return {...shift, [field]: users};
    }
    return shift;
  });
}

function filterParticipates(field, selectedStaffId) {
  return workShiftRegisterData.map((shift) => {
    if (!isEmptyInput(selectedStaffId)) {
      let users = shift.users.filter((user) => user.id === selectedStaffId);
      return {...shift, [field]: users};
    } else {
      return shift;
    }
  });
}

function getIndex(array, user) {
  return array.findIndex((item) => item.id === user.id);
}
