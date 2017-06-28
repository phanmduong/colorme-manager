/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function moneyTransferReducer(state = initialState.moneyTransfer, action) {
    switch (action.type) {
        case types.BEGIN_DATA_STAFF_OF_MONEY_TRANSFER_LOAD:
            return Object.assign({}, state, {
                isLoadingStaffList: action.isLoadingStaffList,
                errorStaffList: action.errorStaffList,
            });
        case types.LOAD_DATA_STAFF_OF_MONEY_TRANSFER_SUCCESSFUL:
            let staffListData = (action.currentPageAll === 1) ? action.staffListData :
                [...state.staffListData, ...action.staffListData];
            return Object.assign({}, state, {
                isLoadingStaffList: action.isLoadingStaffList,
                errorStaffList: action.errorStaffList,
                staffListData: staffListData,
                currentPageStaffList: action.currentPageStaffList,
                totalPageStaffList: action.totalPageStaffList
            });
        case types.LOAD_DATA_STAFF_OF_MONEY_TRANSFER_ERROR:
            return Object.assign({}, state, {
                isLoadingStaffList: action.isLoadingStaffList,
                errorStaffList: action.errorStaffList
            });
        case types.UPDATE_FORM_SEARCH_STAFF_LIST:
            return Object.assign({}, state, {
                searchStaff: action.searchStaff,
                staffListData: action.staffListData,
                currentPageStaffList: action.currentPageStaffList,
                totalPageStaffList: action.totalPageStaffList
            });
        case types.CHANGE_SEGMENT_MONEY_TRANSFER:
            return Object.assign({}, state, {
                segment: action.segment,
            });
        case types.BEGIN_DATA_HISTORY_TRANSACTION_LOAD:
            return Object.assign({}, state, {
                isLoadingHistoryTransaction: action.isLoadingHistoryTransaction,
                errorHistoryTransaction: action.errorHistoryTransaction,
            });
        case types.LOAD_DATA_HISTORY_TRANSACTION_SUCCESSFUL:
            let transactionListData = (action.currentPageAll === 1) ? action.transactionListData :
                [...state.transactionListData, ...action.transactionListData];
            return Object.assign({}, state, {
                isLoadingHistoryTransaction: action.isLoadingHistoryTransaction,
                errorHistoryTransaction: action.errorHistoryTransaction,
                transactionListData: transactionListData,
                currentPageHistoryTransaction: action.currentPageHistoryTransaction,
                totalPageHistoryTransaction: action.totalPageHistoryTransaction
            });
        case types.LOAD_DATA_HISTORY_TRANSACTION_ERROR:
            return Object.assign({}, state, {
                isLoadingHistoryTransaction: action.isLoadingHistoryTransaction,
                errorHistoryTransaction: action.errorHistoryTransaction
            });
        default:
            return state;
    }

}