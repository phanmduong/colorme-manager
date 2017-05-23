/**
 * Created by phanmduong on 5/23/17.
 */
import * as types from '../constants/actionTypes';
import * as dashboardApi from '../apis/dashboardApi';

export function beginDataDashboardLoad() {
    return {
        type: types.BEGIN_DATA_DASHBOARD_LOAD,
        isLoading: true,
        error: false
    }
}

export function loadDataDashboard(baseId, genId, token) {
    return function (dispatch) {
        dispatch(beginDataDashboardLoad());
        dashboardApi.loadDashboard(baseId, genId, token).then(function (res) {
            dispatch(loadDataDashboardSuccessful(res));
        }).catch(error => {
            dispatch(loadDataDashboardError());
            throw (error);
        })
    }
}

export function loadDataDashboardSuccessful(res) {
    console.log(JSON.stringify(res.data));
    return ({
        type: types.LOAD_DATA_DASHBOARD_SUCCESSFUL,
        dashboardData: res.data,
        isLoading: false,
        error: false
    })
}

export function loadDataDashboardError() {
    return {
        type: types.LOAD_DATA_DASHBOARD_ERROR,
        isLoading: false,
        error: true
    }
}

export function selectedBaseId(baseId) {
    return {
        type: types.SELECTED_BASE_ID_DASHBOARD,
        selectedBaseId: baseId
    }
}

export function selectedGenId(genId) {
    return {
        type: types.SELECTED_GEN_ID_DASHBOARD,
        selectedGenId: genId
    }
}
