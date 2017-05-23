/**
 * Created by phanmduong on 5/23/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function dashboardReducer(state = initialState.dashboard, action) {
    switch (action.type) {
        case types.BEGIN_DATA_DASHBOARD_LOAD:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
                dashboardData: null
            });
        case types.LOAD_DATA_DASHBOARD_SUCCESSFUL:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
                dashboardData: action.dashboardData
            });
        case types.LOAD_DATA_DASHBOARD_ERROR:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error
            });
        case types.SELECTED_BASE_ID_DASHBOARD:
            return Object.assign({}, state, {
                selectedBaseId: action.selectedBaseId
            });
        case types.SELECTED_GEN_ID_DASHBOARD:
            return Object.assign({}, state, {
                selectedGenId: action.selectedGenId
            });
        default:
            return state;
    }
}