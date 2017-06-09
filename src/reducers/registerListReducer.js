/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function registerListReducer(state = initialState.registerList, action) {
    switch (action.type) {
        case types.BEGIN_DATA_REGISTER_LIST_LOAD:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
                pageSearch: action.pageSearch
            });
        case types.LOAD_DATA_REGISTER_LIST_SUCCESSFUL:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
                registerListData: [...state.registerListData, ...action.registerListData],
                page: action.page
            });
        case types.LOAD_DATA_REGISTER_LIST_ERROR:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error
            });
        case types.BEGIN_DATA_SEARCH_REGISTER_LIST_LOAD:
            return Object.assign({}, state, {
                isSearchLoading: action.isSearchLoading,
                errorSearch: action.error,
                page: action.page,
                registerListData: action.registerListData
            });
        case types.LOAD_DATA_SEARCH_REGISTER_LIST_SUCCESSFUL:
            return Object.assign({}, state, {
                isSearchLoading: action.isSearchLoading,
                errorSearch: action.error,
                registerListData: action.registerListData,
                pageSearch: action.page
            });
        case types.LOAD_DATA_SEARCH_REGISTER_LIST_ERROR:
            return Object.assign({}, state, {
                isSearchLoading: action.isSearchLoading,
                errorSearch: action.error
            });
        case types.UPDATE_DATA_SEARCH_REGISTER_LIST_FROM:
            return Object.assign({}, state, {
                search: action.search,
            });
        case types.CHANGE_SEGMENT_REGISTER_LIST:
            return Object.assign({}, state, {
                segment: action.segment,
            });
        default:
            return state;
    }

}