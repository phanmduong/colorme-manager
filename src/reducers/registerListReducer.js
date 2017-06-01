/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function registerListReducer(state = initialState.registerList, action) {
    switch (action.type) {
        case types.BEGIN_DATA_REGISTER_LIST_LOAD:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
            });
        case types.LOAD_DATA_REGISTER_LIST_SUCCESSFUL:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
                registerListData: [...state.registerListData, ...action.registerListData],
                page: action.page
            });
        case types.LOAD_DATA_REGISTER_LIST_ERROR:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error
            });
        default:
            return state;
    }

}