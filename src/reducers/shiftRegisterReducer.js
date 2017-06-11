/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

let shiftRegisterData;
export default function shiftRegisterReducer(state = initialState.shiftRegister, action) {
    switch (action.type) {
        case types.BEGIN_DATA_SHIFT_REGISTER_LOAD:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
            });
        case types.LOAD_DATA_SHIFT_REGISTER_SUCCESSFUL:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
                shiftRegisterData: action.shiftRegisterData
            });
        case types.LOAD_DATA_SHIFT_REGISTER_ERROR:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error
            });
        case types.SELECTED_BASE_ID_SHIFT_REGISTER:
            return Object.assign({}, state, {
                selectedBaseId: action.selectedBaseId
            });
        case types.SELECTED_GEN_ID_SHIFT_REGISTER:
            return Object.assign({}, state, {
                selectedGenId: action.selectedGenId
            });
        case types.UPDATE_DATA_SHIFT_REGISTER:
            shiftRegisterData = state.shiftRegisterData;
            shiftRegisterData = changeDataRegister(action.shift.id, 'user', action.shift.user);
            shiftRegisterData = changeDataRegister(action.shift.id, 'isLoadingRegister', false);
            shiftRegisterData = changeDataRegister(action.shift.id, 'isLoadingRegisterError', false);
            shiftRegisterData = changeDataRegister(action.shift.id, 'isLoadingUnRegister', false);
            shiftRegisterData = changeDataRegister(action.shift.id, 'isLoadingUnRegisterError', false);
            return {
                ...state,
                shiftRegisterData: shiftRegisterData
            };
        case types.POST_SHIFT_REGISTER:
            shiftRegisterData = state.shiftRegisterData;
            shiftRegisterData = changeDataRegister(action.registerId, 'isLoadingRegister', action.isLoadingRegister);
            shiftRegisterData = changeDataRegister(action.registerId, 'isLoadingRegisterError', action.isLoadingRegisterError);
            return {
                ...state,
                shiftRegisterData: shiftRegisterData
            };
        case types.SHIFT_REGISTER_SUCCESSFUL:
            shiftRegisterData = state.shiftRegisterData;
            shiftRegisterData = changeDataRegister(action.registerId, 'isLoadingRegister', action.isLoadingRegister);
            shiftRegisterData = changeDataRegister(action.registerId, 'isLoadingRegisterError', action.isLoadingRegisterError);
            return {
                ...state,
                shiftRegisterData: shiftRegisterData
            };
        case types.SHIFT_REGISTER_ERROR:
            shiftRegisterData = state.shiftRegisterData;
            shiftRegisterData = changeDataRegister(action.registerId, 'isLoadingRegister', action.isLoadingRegister);
            shiftRegisterData = changeDataRegister(action.registerId, 'isLoadingRegisterError', action.isLoadingRegisterError);
            return {
                ...state,
                shiftRegisterData: shiftRegisterData
            };
        case types.POST_SHIFT_UNREGISTER:
            shiftRegisterData = state.shiftRegisterData;
            shiftRegisterData = changeDataRegister(action.registerId, 'isLoadingUnRegister', action.isLoadingUnRegister);
            shiftRegisterData = changeDataRegister(action.registerId, 'isLoadingUnRegisterError', action.isLoadingUnRegisterError);
            return {
                ...state,
                shiftRegisterData: shiftRegisterData
            };
        case types.SHIFT_UNREGISTER_SUCCESSFUL:
            shiftRegisterData = state.shiftRegisterData;
            shiftRegisterData = changeDataRegister(action.registerId, 'isLoadingUnRegister', action.isLoadingUnRegister);
            shiftRegisterData = changeDataRegister(action.registerId, 'isLoadingUnRegisterError', action.isLoadingUnRegisterError);
            return {
                ...state,
                shiftRegisterData: shiftRegisterData
            };
        case types.SHIFT_UNREGISTER_ERROR:
            shiftRegisterData = state.shiftRegisterData;
            shiftRegisterData = changeDataRegister(action.registerId, 'isLoadingUnRegister', action.isLoadingUnRegister);
            shiftRegisterData = changeDataRegister(action.registerId, 'isLoadingUnRegisterError', action.isLoadingUnRegisterError);
            return {
                ...state,
                shiftRegisterData: shiftRegisterData
            };
        default:
            return state;
    }
}

function changeDataRegister(shiftRegisterId, nameObject, dataObject) {
    try {
        if (shiftRegisterData.weeks) {
            let weeks = shiftRegisterData.weeks.map((week) => {
                let dates = week.dates.map((date) => {
                    let shifts = date.shifts.map((shift) => {
                        if (shift.id === shiftRegisterId) {
                            return {...shift, [nameObject]: dataObject};
                        }
                        return shift;
                    });
                    return {...date, shifts: shifts};
                });
                return {...week, dates: dates};
            });
            return {...shiftRegisterData, weeks: weeks};
        }
    }
    catch (err) {
        throw new Error(err);
    }
    return shiftRegisterData;
}