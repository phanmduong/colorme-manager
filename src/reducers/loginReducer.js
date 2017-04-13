/**
 * Created by phanmduong on 4/5/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function loginReducer(state = initialState.login, action) {
    switch (action.type){
        case types.UPDATE_DATA_LOGIN_FORM:
            return Object.assign({},state,{
                login: action.login,
                isLoading: action.isLoading,
                error: action.error,
                token: action.token
            });
        case types.BEGIN_LOGIN:
            return Object.assign({},state,{
                isLoading: action.isLoading,
                error: action.error,
                token: action.token
            });
        case types.LOGIN_USER:
            return Object.assign({},state,{
                isLoading: action.isLoading,
                error: action.error,
                user: action.user,
                token: action.token
            });
        case types.LOGIN_ERROR:
            return Object.assign({},state,{
                isLoading: action.isLoading,
                error: action.error,
                token: action.token
            });
            case types.BEGIN_GET_DATA_LOGIN:
            return Object.assign({},state,{
                isGettingData: action.isGettingData,
                isGetDataError: action.isGetDataError
            });
            case types.GOT_DATA_LOGIN:
            return Object.assign({},state,{
                isGettingData: action.isGettingData,
                isGetDataError: action.isGetDataError,
                login: action.login
            });
            case types.GET_DATA_LOGIN_ERROR:
            return Object.assign({},state,{
                isGettingData: action.isGettingData,
                isGetDataError: action.isGetDataError,
            });case types.BEGIN_SET_DATA_LOGIN:
            return Object.assign({},state,{
                isSettingData: action.isSettingData,
                isSetDataError: action.isSetDataError
            });
            case types.SETTED_DATA_LOGIN:
            return Object.assign({},state,{
                isSettingData: action.isSettingData,
                isSetDataError: action.isSetDataError
            });
            case types.SET_DATA_LOGIN_ERROR:
            return Object.assign({},state,{
                isSettingData: action.isSettingData,
                isSetDataError: action.isSetDataError
            });
        default:
            return state;
    }

}