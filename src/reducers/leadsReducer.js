import * as types from '../constants/actionTypes';
import initialState from './initialState';
import {filteredData} from '../helper';

let filterData;

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
      filterData = filteredData(state.leads, action.leads);
      let leads =
        action.currentPageLeads === 1
          ? action.leads
          : [...state.leads, ...filterData];
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
        callBackTime: action.callBackTime,
        mockExamTime: action.mockExamTime,
        duplicate: action.duplicate,
        baseId: action.baseId,
        leadTag: action.leadTag,
        importedAt: action.importedAt,
        orderBy: action.orderBy,
        carer_id: action.carer_id,
        currentPageLeads: action.currentPageLeads,
        leads: action.leads,
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
    case types.BEGIN_CHANGE_CAMPAIGN_TAG:
      return Object.assign({}, state, {
        isChangingCampaignTag: action.isChangingCampaignTag,
        errorChangeCampaignTag: action.errorChangeCampaignTag,
      });
    case types.CHANGE_CAMPAIGN_TAG_SUCCESSFUL:
      return Object.assign({}, state, {
        isChangingCampaignTag: action.isChangingCampaignTag,
        errorChangeCampaignTag: action.errorChangeCampaignTag,
      });
    case types.CHANGE_CAMPAIGN_TAG_ERROR:
      return Object.assign({}, state, {
        isChangingCampaignTag: action.isChangingCampaignTag,
        errorChangeCampaignTag: action.errorChangeCampaignTag,
      });
    case types.BEGIN_CHANGE_SOURCE_TAG:
      return Object.assign({}, state, {
        isChangingSourceTag: action.isChangingSourceTag,
        errorChangeSourceTag: action.errorChangeSourceTag,
      });
    case types.CHANGE_SOURCE_TAG_SUCCESSFUL:
      return Object.assign({}, state, {
        isChangingSourceTag: action.isChangingSourceTag,
        errorChangeSourceTag: action.errorChangeSourceTag,
      });
    case types.CHANGE_SOURCE_TAG_ERROR:
      return Object.assign({}, state, {
        isChangingSourceTag: action.isChangingSourceTag,
        errorChangeSourceTag: action.errorChangeSourceTag,
      });
    case types.BEGIN_CHANGE_STATUS_TAG:
      return Object.assign({}, state, {
        isChangingStatusTag: action.isChangingStatusTag,
        errorChangeStatusTag: action.errorChangeStatusTag,
      });
    case types.CHANGE_STATUS_TAG_SUCCESSFUL:
      return Object.assign({}, state, {
        isChangingStatusTag: action.isChangingStatusTag,
        errorChangeStatusTag: action.errorChangeStatusTag,
      });
    case types.CHANGE_STATUS_TAG_ERROR:
      return Object.assign({}, state, {
        isChangingStatusTag: action.isChangingStatusTag,
        errorChangeStatusTag: action.errorChangeStatusTag,
      });
    case types.BEGIN_CHANGE_PIC_TAG:
      return Object.assign({}, state, {
        isChangingPICTag: action.isChangingPICTag,
        errorChangePICTag: action.errorChangePICTag,
      });
    case types.CHANGE_PIC_TAG_SUCCESSFUL:
      return Object.assign({}, state, {
        isChangingPICTag: action.isChangingPICTag,
        errorChangePICTag: action.errorChangePICTag,
      });
    case types.CHANGE_PIC_TAG_ERROR:
      return Object.assign({}, state, {
        isChangingPICTag: action.isChangingPICTag,
        errorChangePICTag: action.errorChangePICTag,
      });
    case types.ON_SELECT_CALL_BACK_TIME_LEADS:
      return Object.assign({}, state, {
        callBackTime: action.callBackTime,
      });
    case types.ON_SELECT_MOCK_EXAM_TIME_LEADS:
      return Object.assign({}, state, {
        mockExamTime: action.mockExamTime,
      });
    case types.ON_SELECT_DUPLICATE_LEADS:
      return Object.assign({}, state, {
        duplicate: action.duplicate,
      });
    case types.ON_SELECT_LEAD_TAG_LEADS:
      return Object.assign({}, state, {
        leadTag: action.leadTag,
      });
    case types.ON_SELECT_BASE_ID_LEADS:
      return Object.assign({}, state, {
        baseId: action.baseId,
      });
    case types.ON_SELECT_IMPORTED_AT_LEADS:
      return Object.assign({}, state, {
        importedAt: action.importedAt,
      });
    case types.ON_SELECT_ORDER_BY_LEADS:
      return Object.assign({}, state, {
        orderBy: action.orderBy,
      });
    default:
      return state;
  }
}
