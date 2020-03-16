import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function leadsReducer(state = initialState.leads, action) {
  switch (action.type) {
    case types.BEGIN_LOAD_LEADS:
      return Object.assign({}, state, {
        isLoadingLeads: action.isLoadingLeads,
        errorLeads: action.errorLeads,
      });
    case types.LOAD_LEADS_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingLeads: action.isLoadingLeads,
        errorLeads: action.errorLeads,
        leads: action.leads,
        currentPageLeads: action.currentPageLeads,
        totalPageLeads: action.totalPageLeads,
      });
    case types.LOAD_LEADS_ERROR:
      return Object.assign({}, state, {
        isLoadingLeads: action.isLoadingLeads,
        errorLeads: action.errorLeads,
      });
    default:
      return state;
  }
}
