/**
 * Created by phanmduong on 5/23/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function dashboardReducer(state = initialState.analytics, action) {
    switch (action.type) {
        case types.BEGIN_DATA_ANALYTICS_LOAD:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error
            });
        case types.LOAD_DATA_ANALYTICS_SUCCESSFUL:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
                dashboardData: action.dashboardData
            });
        case types.LOAD_DATA_ANALYTICS_ERROR:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error
            });
        case types.SELECTED_BASE_ID_ANALYTICS:
            return Object.assign({}, state, {
                selectedBaseId: action.selectedBaseId
            });
        case types.SELECTED_GEN_ID_ANALYTICS:
            return Object.assign({}, state, {
                selectedGenId: action.selectedGenId
            });
        default:
            return state;
    }
}