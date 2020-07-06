import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {itemExist} from '../helper';

let filterData;
let staff;

export default function staffReducer(state = initialState.staff, action) {
  switch (action.type) {
    case types.BEGIN_LOAD_MANAGE_STAFF:
      return Object.assign({}, state, {
        isLoadingStaff: action.isLoadingStaff,
        errorStaff: action.errorStaff,
      });
    case types.BEGIN_REFRESH_MANAGE_STAFF:
      return Object.assign({}, state, {
        refreshingStaff: action.refreshingStaff,
        errorStaff: action.errorStaff,
      });
    case types.LOAD_MANAGE_STAFF_SUCCESSFUL:
      filterData = [];
      for (let staffItem of action.staff) {
        if (!itemExist(staffItem, state.staff)) {
          filterData.push(staffItem);
        }
      }
      staff =
        action.currentPage === 1
          ? action.staff
          : [...state.staff, ...filterData];
      return Object.assign({}, state, {
        isLoadingStaff: action.isLoadingStaff,
        errorStaff: action.errorStaff,
        currentPage: action.currentPage,
        totalPage: action.totalPage,
        staff: staff,
        refreshingStaff: action.refreshingStaff,
      });
    case types.LOAD_MANAGE_STAFF_ERROR:
      return Object.assign({}, state, {
        isLoadingStaff: action.isLoadingStaff,
        errorStaff: action.errorStaff,
        refreshingStaff: action.refreshingStaff,
      });
    case types.BEGIN_SEARCH_MANAGE_STAFF:
      return Object.assign({}, state, {
        staff: action.staff,
        search: action.search,
        currentPage: action.currentPage,
        totalPage: action.totalPage,
      });
    case types.RESET_MANAGE_STAFF:
      return Object.assign({}, state, {
        staff: action.staff,
        search: action.search,
        currentPage: action.currentPage,
        totalPage: action.totalPage,
      });
    default:
      return state;
  }
}
