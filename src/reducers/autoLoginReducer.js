/**
 * Created by phanmduong on 5/27/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function autoLoginReducer(state = initialState.autoLogin, action) {
    switch (action.type) {
        case types.SET_AUTO_LOGIN:
            return Object.assign({}, {
                isAutoLogin: action.isAutoLogin
            })
        default:
            return state;
    }

}