/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function collectMoneyReducer(state = initialState.collectMoney, action) {
    switch (action.type) {
        case types.BEGIN_DATA_STUDENT_LIST_COLLECT_MONEY_LOAD:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
            });
        case types.LOAD_DATA_STUDENT_LIST_COLLECT_MONEY_SUCCESSFUL:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
                studentListData: action.studentListData,
                nextCode: action.nextCode,
                nextWaitingCode: action.nextWaitingCode
            });
        case types.LOAD_DATA_STUDENT_LIST_COLLECT_MONEY_ERROR:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error
            });
        case types.UPDATE_FORM_SEARCH_STUDENT_LIST_COLLECT_MONEY:
            return Object.assign({}, state, {
                search: action.search,
                studentListData: action.studentListData,
            });
        default:
            return state;
    }

}