import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function leadsReducer(state = initialState.leads, action) {
  switch (action.type) {
    case types.BEGIN_LOAD_LEADS:
      return Object.assign({}, state, {
        isLoadingLeads: action.isLoadingLeads,
        errorLeads: action.errorLeads,
      });
    case types.BEGIN_REFRESH_LEADS:
      return Object.assign({}, state, {
        refreshingLeads: action.refreshingLeads,
        errorLeads: action.errorLeads,
      });
    case types.LOAD_LEADS_SUCCESSFUL:
      let leads =
        action.currentPageLeads === 1
          ? action.leads
          : [...state.leads, ...action.leads];
      return Object.assign({}, state, {
        isLoadingLeads: action.isLoadingLeads,
        errorLeads: action.errorLeads,
        leads: leads,
        currentPageLeads: action.currentPageLeads,
        totalPageLeads: action.totalPageLeads,
        refreshingLeads: action.refreshingLeads,
      });
    case types.LOAD_LEADS_ERROR:
      return Object.assign({}, state, {
        isLoadingLeads: action.isLoadingLeads,
        errorLeads: action.errorLeads,
        refreshingLeads: action.refreshingLeads,
      });
    case types.BEGIN_SEARCH_LEADS:
      return Object.assign({}, state, {
        leads: action.leads,
        currentPageLeads: action.currentPageLeads,
        totalPageLeads: action.totalPageLeads,
        searchLeads: action.searchLeads,
      });
    case types.ON_SELECT_START_TIME_LEADS:
      return Object.assign({}, state, {
        start_time: action.start_time,
      });
    case types.ON_SELECT_END_TIME_LEADS:
      return Object.assign({}, state, {
        end_time: action.end_time,
      });
    case types.ON_SELECT_RATE_LEADS:
      return Object.assign({}, state, {
        rate: action.rate,
      });
    case types.ON_SELECT_CAMPAIGN_LEADS:
      return Object.assign({}, state, {
        campaign_id: action.campaign_id,
      });
    case types.ON_SELECT_STATUS_LEADS:
      return Object.assign({}, state, {
        leadStatusId: action.leadStatusId,
      });
    case types.ON_SELECT_ADDRESS_LEADS:
      return Object.assign({}, state, {
        address: action.address,
      });
    case types.ON_SELECT_SOURCE_LEADS:
      return Object.assign({}, state, {
        source_id: action.source_id,
      });
    case types.ON_SELECT_CARER_LEADS:
      return Object.assign({}, state, {
        carer_id: action.carer_id,
      });
    case types.RESET_FILTER_LEADS:
      return Object.assign({}, state, {
        start_time: action.start_time,
        end_time: action.end_time,
        address: action.address,
        rate: action.rate,
        campaign_id: action.campaign_id,
        leadStatusId: action.leadStatusId,
        source_id: action.source_id,
      });
    case types.BEGIN_LOAD_LEAD_STAFFS:
      return Object.assign({}, state, {
        isLoadingStaff: action.isLoadingStaff,
        errorStaff: action.errorStaff,
      });
    case types.LOAD_LEAD_STAFFS_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingStaff: action.isLoadingStaff,
        errorStaff: action.errorStaff,
        staff: action.staff,
      });
    case types.LOAD_LEAD_STAFFS_ERROR:
      return Object.assign({}, state, {
        isLoadingStaff: action.isLoadingStaff,
        errorStaff: action.errorStaff,
      });
    case types.BEGIN_SAVE_LEAD:
      return Object.assign({}, state, {
        isSavingLead: action.isSavingLead,
        errorSaveLead: action.errorSaveLead,
      });
    case types.SAVE_LEAD_SUCCESSFUL:
      return Object.assign({}, state, {
        isSavingLead: action.isSavingLead,
        errorSaveLead: action.errorSaveLead,
      });
    case types.SAVE_LEAD_ERROR:
      return Object.assign({}, state, {
        isSavingLead: action.isSavingLead,
        errorSaveLead: action.errorSaveLead,
      });
    default:
      return state;
  }
}
