/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as genApi from '../apis/genApi';

export function beginDataGenLoad(){
    return {
        type: types.BEGIN_DATA_GEN_LOAD,
        isLoading: true,
        error: false
    }
}

export function loadDataGen(token) {
    return function (dispatch) {
        dispatch(beginDataGenLoad());
        genApi.loadGenApi(token).then(function (res) {
            dispatch(loadDataSuccessful(res));
        }).catch(error => {
            dispatch(loadDataError());
            throw (error);
        })

    }
}

export function loadDataSuccessful(res) {
    return ({
        type: types.LOAD_DATA_GEN_SUCCESSFUL,
        genData: res.data.data.gens,
        currentGen: res.data.data.current_gen,
        isLoading: false,
        error: false
    })
}

export function loadDataError() {
    return {
        type: types.LOAD_DATA_GEN_ERROR,
        isLoading: false,
        error: false
    }
}

export function selectedGenId(id) {
    return {
        type: types.SELECTED_GEN_ID,
        selectedGenId: id
    }
}