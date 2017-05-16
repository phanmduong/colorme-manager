/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function shiftRegisterReducer(state = initialState.shiftRegister, action) {
    switch (action.type) {
        case types.BEGIN_DATA_SHIFT_REGISTER_LOAD:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
                shiftRegisterData: null
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
            var shiftRegisterData = state.shiftRegisterData;
            changeDataRegister(shiftRegisterData, action.shift.id, 'user', action.shift.user);
            return Object.assign({}, state, {
                shiftRegisterData: shiftRegisterData
            });
        case types.POST_SHIFT_REGISTER:
            var shiftRegisterData = state.shiftRegisterData;
            changeDataRegister(shiftRegisterData, action.registerId, 'isLoadingRegister', action.isLoadingRegister);
            changeDataRegister(shiftRegisterData, action.registerId, 'isLoadingRegisterError', action.isLoadingRegisterError);
            return Object.assign({}, state, {
                shiftRegisterData: shiftRegisterData
            });
        case types.SHIFT_REGISTER_SUCCESSFUL:
            var shiftRegisterData = state.shiftRegisterData;
            changeDataRegister(shiftRegisterData, action.registerId, 'isLoadingRegister', action.isLoadingRegister);
            changeDataRegister(shiftRegisterData, action.registerId, 'isLoadingRegisterError', action.isLoadingRegisterError);
            return Object.assign({}, state, {
                shiftRegisterData: shiftRegisterData
            });
        case types.SHIFT_REGISTER_ERROR:
            var shiftRegisterData = state.shiftRegisterData;
            changeDataRegister(shiftRegisterData, action.registerId, 'isLoadingRegister', action.isLoadingRegister);
            changeDataRegister(shiftRegisterData, action.registerId, 'isLoadingRegisterError', action.isLoadingRegisterError);
            return Object.assign({}, state, {
                shiftRegisterData: shiftRegisterData
            });
        case types.POST_SHIFT_UNREGISTER:
            var shiftRegisterData = state.shiftRegisterData;
            changeDataRegister(shiftRegisterData, action.registerId, 'isLoadingUnRegister', action.isLoadingUnRegister);
            changeDataRegister(shiftRegisterData, action.registerId, 'isLoadingUnRegisterError', action.isLoadingUnRegisterError);
            return Object.assign({}, state, {
                shiftRegisterData: shiftRegisterData
            });
        case types.SHIFT_UNREGISTER_SUCCESSFUL:
            var shiftRegisterData = state.shiftRegisterData;
            changeDataRegister(shiftRegisterData, action.registerId, 'isLoadingUnRegister', action.isLoadingUnRegister);
            changeDataRegister(shiftRegisterData, action.registerId, 'isLoadingUnRegisterError', action.isLoadingUnRegisterError);
            return Object.assign({}, state, {
                shiftRegisterData: shiftRegisterData
            });
        case types.SHIFT_UNREGISTER_ERROR:
            var shiftRegisterData = state.shiftRegisterData;
            changeDataRegister(shiftRegisterData, action.registerId, 'isLoadingUnRegister', action.isLoadingUnRegister);
            changeDataRegister(shiftRegisterData, action.registerId, 'isLoadingUnRegisterError', action.isLoadingUnRegisterError);
            return Object.assign({}, state, {
                shiftRegisterData: shiftRegisterData
            });
        default:
            return state;
    }
}

function changeDataRegister(shiftRegisterData, shiftRegisterId, nameObject, dataObject) {
    try {
        shiftRegisterData.weeks.map((week) => {
            week.dates.map((date) => {
                date.shifts.map((shift) => {
                    if (shift.id === shiftRegisterId) {
                        shift[nameObject] = dataObject;
                    }
                })
            })
        });
    }
    catch (err) {
        throw new Error(err);
    }
}