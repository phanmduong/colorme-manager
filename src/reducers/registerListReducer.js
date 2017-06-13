/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function registerListReducer(state = initialState.registerList, action) {
    switch (action.type) {
        case types.BEGIN_DATA_REGISTER_LIST_LOAD_ALL:
            return Object.assign({}, state, {
                isLoadingAll: action.isLoadingAll,
                errorAll: action.errorAll,
            });
        case types.LOAD_DATA_REGISTER_LIST_SUCCESSFUL_ALL:
            let registerListDataAll = (action.currentPageAll === 1) ? action.registerListDataAll :
                [...state.registerListDataAll, ...action.registerListDataAll];
            return Object.assign({}, state, {
                isLoadingAll: action.isLoadingAll,
                errorAll: action.errorAll,
                registerListDataAll: registerListDataAll,
                currentPageAll: action.currentPageAll,
                totalPageAll: action.totalPageAll,
            });
        case types.LOAD_DATA_REGISTER_LIST_ERROR_ALL:
            return Object.assign({}, state, {
                isLoadingAll: action.isLoadingAll,
                errorAll: action.errorAll
            });
        case types.UPDATE_FORM_SEARCH_REGISTER_LIST_ALL:
            return Object.assign({}, state, {
                searchAll: action.searchAll,
                registerListDataAll: action.registerListDataAll,
                currentPageAll: action.currentPageAll,
                totalPageAll: action.totalPageAll,
            });
        case types.BEGIN_DATA_REGISTER_LIST_LOAD_MY:
            return Object.assign({}, state, {
                isLoadingMy: action.isLoadingMy,
                errorMy: action.errorMy,
            });
        case types.LOAD_DATA_REGISTER_LIST_SUCCESSFUL_MY:
            let registerListDataMy = (action.currentPageMy === 1) ? action.registerListDataMy :
                [...state.registerListDataMy, ...action.registerListDataMy];
            return Object.assign({}, state, {
                isLoadingMy: action.isLoadingMy,
                errorMy: action.errorMy,
                registerListDataMy: registerListDataMy,
                currentPageMy: action.currentPageMy,
                totalPageMy: action.totalPageMy,
            });
        case types.LOAD_DATA_REGISTER_LIST_ERROR_MY:
            return Object.assign({}, state, {
                isLoadingMy: action.isLoadingMy,
                errorMy: action.errorMy
            });
        case types.UPDATE_FORM_SEARCH_REGISTER_LIST_MY:
            return Object.assign({}, state, {
                searchMy: action.searchMy,
                registerListDataMy: action.registerListDataMy,
                currentPageMy: action.currentPageMy,
                totalPageMy: action.totalPageMy,
            });
        case types.CHANGE_SEGMENT_REGISTER_LIST:
            return Object.assign({}, state, {
                segment: action.segment,
            });
        default:
            return state;
    }

}