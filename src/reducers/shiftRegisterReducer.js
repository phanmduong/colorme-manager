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
        default:
            return state;
    }

}