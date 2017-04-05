/**
 * Created by phanmduong on 4/5/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function loginReducer(state = initialState.login, action) {
    switch (action.type){
        case types.UPDATE_DATA_LOGIN_FORM:
            return Object.assign({},state,{
                login: action.login
            });
        default:
            return state;
    }

}