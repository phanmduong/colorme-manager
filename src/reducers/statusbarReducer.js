/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function statusBarReducer(state = initialState.statusBar, action) {
    switch (action.type) {
        case types.CHANGE_STATUSBAR_COLOR:
            return Object.assign({}, state, {
                color: action.color
            });
        default:
            return state;
    }
}