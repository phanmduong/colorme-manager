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
                staffListData: updateStaffListDataData(staffListData, state.isLoadingTransaction),
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
        case types.UPDATE_HISTORY_TRANSACTION_SOCKET:
            return Object.assign({}, state, {
                isLoadingHistoryTransaction: action.isLoadingHistoryTransaction,
                errorHistoryTransaction: action.errorHistoryTransaction,
                transactionListData: action.transactionListData
            });
        case types.LOAD_DATA_HISTORY_TRANSACTION_SUCCESSFUL:
            let transactionListData = (action.currentPageAll === 1) ? action.transactionListData :
                [...state.transactionListData, ...action.transactionListData];
            return Object.assign({}, state, {
                isLoadingHistoryTransaction: action.isLoadingHistoryTransaction,
                errorHistoryTransaction: action.errorHistoryTransaction,
                transactionListData: transactionListData,
                currentPageHistoryTransaction: action.currentPageHistoryTransaction,
                totalPageHistoryTransaction: action.totalPageHistoryTransaction,
                currentMoney: action.currentMoney,
                isLoadingTransaction: action.isLoadingTransaction,
                staffListData: updateStaffListDataData(state.staffListData, action.isLoadingTransaction)

            });
        case types.LOAD_DATA_HISTORY_TRANSACTION_ERROR:
            return Object.assign({}, state, {
                isLoadingHistoryTransaction: action.isLoadingHistoryTransaction,
                errorHistoryTransaction: action.errorHistoryTransaction
            });
        case types.BEGIN_TRANSACTION:
            return {
                ...state, ...{
                    isLoadingTransaction: action.isLoadingTransaction,
                    errorTransaction: action.errorTransaction,
                    staffListData: updateStaffListDataData(state.staffListData, action.isLoadingTransaction)
                }
            };
        case types.TRANSACTION_SUCCESSFUL:
            return {
                ...state, ...{
                    isLoadingTransaction: action.isLoadingTransaction,
                    errorTransaction: action.errorTransaction,
                    staffListData: updateStaffListDataData(state.staffListData, action.isLoadingTransaction)
                }
            };
        case types.TRANSACTION_ERROR:
            return {
                ...state, ...{
                    isLoadingTransaction: action.isLoadingTransaction,
                    errorTransaction: action.errorTransaction,
                    staffListData: updateStaffListDataData(state.staffListData, action.isLoadingTransaction)
                }
            };
        case types.BEGIN_CONFIRM_TRANSACTION:
            return {
                ...state, ...{
                    transactionListData: updateTransactionListData(state.transactionListData, action.isLoadingConfirmTransaction, action.errorConfirmTransaction)
                }
            };
        case types.CONFIRM_TRANSACTION_SUCCESSFUL:
            return {
                ...state, ...{
                    transactionListData: updateTransactionListData(state.transactionListData, action.isLoadingConfirmTransaction, action.errorConfirmTransaction)
                }
            };
        case types.CONFIRM_TRANSACTION_ERROR:
            return {
                ...state, ...{
                    transactionListData: updateTransactionListData(state.transactionListData, action.isLoadingConfirmTransaction, action.errorConfirmTransaction)
                }
            };
        case types.CHANGE_STATUS_TRANSACTION: {
            return {
                ...state, ...{
                    isLoadingTransaction: action.isLoadingTransaction,
                    staffListData: updateStaffListDataData(state.staffListData, action.isLoadingTransaction),
                    currentMoney: action.currentMoney
                }
            };
        }
        case 'Navigation/NAVIGATE':
            if (action.routeName === 'TabMoneyTransfer') {
                return {
                    ...state,
                    openTabMoneyTransfer: true
                }
            }
        default:
            return state;
    }

}

function updateStaffListDataData(staffListData, isLoadingTransaction) {
    if (staffListData) {
        return staffListData.map((data) => {
            return {
                ...data,
                isTransaction: isLoadingTransaction
            }
        });
    }
    return staffListData;
}

function updateTransactionListData(transactionListData, isLoadingConfirmTransaction, errorConfirmTransaction) {
    if (transactionListData) {
        return transactionListData.map((data) => {
            return {
                ...data,
                ...{
                    isLoadingConfirmTransaction: isLoadingConfirmTransaction,
                    errorConfirmTransaction: errorConfirmTransaction
                }
            }
        })
    }
    return transactionListData;
}