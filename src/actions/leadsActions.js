import * as types from '../constants/actionTypes';
import * as leadsApi from '../apis/leadsApi';

import axios from 'axios';
let CancelToken = axios.CancelToken;
let sourceCancel = CancelToken.source();

export function getLeads(
  refreshing,
  page,
  search,
  start_time,
  end_time,
  carer_id,
  leadStatusId,
  rate,
  top,
  address,
  orderBy,
  orderByType,
  source_id,
  campaign_id,
  token,
  domain,
) {
  return function (dispatch) {
    if (!refreshing) {
      dispatch(beginLoadLeads());
    } else {
      dispatch(beginRefreshLeads());
    }
    leadsApi
      .getLeads(
        sourceCancel,
        page,
        search,
        start_time,
        end_time,
        carer_id,
        leadStatusId,
        rate,
        top,
        address,
        orderBy,
        orderByType,
        source_id,
        campaign_id,
        token,
        domain,
      )
      .then(function (res) {
        dispatch(loadLeadsSuccessful(res));
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          dispatch(loadLeadsError());
          throw error;
        }
      });
  };
}

function beginLoadLeads() {
  return {
    type: types.BEGIN_LOAD_LEADS,
    isLoadingLeads: true,
    errorLeads: false,
  };
}

function beginRefreshLeads() {
  return {
    type: types.BEGIN_REFRESH_LEADS,
    refreshingLeads: true,
    errorLeads: false,
  };
}

function loadLeadsSuccessful(res) {
  return {
    type: types.LOAD_LEADS_SUCCESSFUL,
    isLoadingLeads: false,
    errorLeads: false,
    leads: res.data.leads,
    currentPageLeads: res.data.paginator.current_page,
    totalPageLeads: res.data.paginator.total_pages,
    refreshingLeads: false,
  };
}

function loadLeadsError() {
  return {
    type: types.LOAD_LEADS_ERROR,
    isLoadingLeads: false,
    errorLeads: false,
    refreshingLeads: false,
  };
}

export function searchLeads(
  search,
  start_time,
  end_time,
  carer_id,
  leadStatusId,
  rate,
  top,
  address,
  orderBy,
  orderByType,
  source_id,
  campaign_id,
  token,
  domain,
) {
  sourceCancel.cancel('Canceled by leads api.');
  sourceCancel = CancelToken.source();
  return function (dispatch) {
    dispatch(beginSearchLeads(search));
    dispatch(
      getLeads(
        false,
        1,
        search,
        start_time,
        end_time,
        carer_id,
        leadStatusId,
        rate,
        top,
        address,
        orderBy,
        orderByType,
        source_id,
        campaign_id,
        token,
        domain,
      ),
    );
  };
}

export function refreshLeads(
  search,
  start_time,
  end_time,
  carer_id,
  leadStatusId,
  rate,
  top,
  address,
  orderBy,
  orderByType,
  source_id,
  campaign_id,
  token,
  domain,
) {
  return function (dispatch) {
    dispatch(beginSearchLeads(search));
    dispatch(
      getLeads(
        true,
        1,
        search,
        start_time,
        end_time,
        carer_id,
        leadStatusId,
        rate,
        top,
        address,
        orderBy,
        orderByType,
        source_id,
        campaign_id,
        token,
        domain,
      ),
    );
  };
}

function beginSearchLeads(search) {
  return {
    type: types.BEGIN_SEARCH_LEADS,
    searchLeads: search,
    currentPageLeads: 1,
    totalPageLeads: 1,
    leads: [],
  };
}

export function onSelectStartTimeLeads(startTime) {
  return {
    type: types.ON_SELECT_START_TIME_LEADS,
    start_time: startTime,
  };
}

export function onSelectEndTimeLeads(endTime) {
  return {
    type: types.ON_SELECT_END_TIME_LEADS,
    end_time: endTime,
  };
}

export function onSelectRateLeads(rate) {
  return {
    type: types.ON_SELECT_RATE_LEADS,
    rate: rate,
  };
}

export function onSelectCampaignLeads(campaign_id) {
  return {
    type: types.ON_SELECT_CAMPAIGN_LEADS,
    campaign_id: campaign_id,
  };
}

export function onSelectStatusLeads(leadStatusId) {
  return {
    type: types.ON_SELECT_STATUS_LEADS,
    leadStatusId: leadStatusId,
  };
}

export function onSelectSourceLeads(source_id) {
  return {
    type: types.ON_SELECT_SOURCE_LEADS,
    source_id: source_id,
  };
}

export function onSelectAddressLeads(address) {
  return {
    type: types.ON_SELECT_ADDRESS_LEADS,
    address: address,
  };
}

export function onSelectCarerLeads(carer_id) {
  return {
    type: types.ON_SELECT_CARER_LEADS,
    carer_id: carer_id,
  };
}

export function reset() {
  return {
    type: types.RESET_FILTER_LEADS,
    start_time: '',
    end_time: '',
    address: '',
    leadStatusId: -1,
    rate: -1,
    source_id: -1,
    campaign_id: -1,
  };
}

export function getStaff(search, token, domain) {
  return function (dispatch) {
    dispatch(beginLoadStaff());
    leadsApi
      .getStaff(search, token, domain)
      .then(function (res) {
        dispatch(loadStaffSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadStaffError());
        throw error;
      });
  };
}

function beginLoadStaff() {
  return {
    type: types.BEGIN_LOAD_LEAD_STAFFS,
    isLoadingStaff: true,
    errorStaff: false,
  };
}

function loadStaffSuccessful(res) {
  return {
    type: types.LOAD_LEAD_STAFFS_SUCCESSFUL,
    staff: res.data.staffs,
    isLoadingStaff: false,
    errorStaff: false,
  };
}

function loadStaffError() {
  return {
    type: types.LOAD_LEAD_STAFFS_ERROR,
    isLoadingStaff: false,
    errorStaff: true,
  };
}

export function saveLead(lead, token, domain) {
  return function (dispatch) {
    dispatch(beginSaveLead());
    leadsApi
      .saveLead(lead, token, domain)
      .then(function (res) {
        dispatch(saveLeadSuccessful(res));
      })
      .catch((error) => {
        dispatch(saveLeadError());
        throw error;
      });
  };
}

function beginSaveLead() {
  return {
    type: types.BEGIN_SAVE_LEAD,
    isSavingLead: true,
    errorSaveLead: false,
  };
}

function saveLeadSuccessful(res) {
  return {
    type: types.SAVE_LEAD_SUCCESSFUL,
    isSavingLead: false,
    errorSaveLead: false,
  };
}

function saveLeadError() {
  return {
    type: types.SAVE_LEAD_ERROR,
    isSavingLead: false,
    errorSaveLead: true,
  };
}

export function changeCampaignTag(campaign_id, user_id, token, domain) {
  return function (dispatch) {
    dispatch(beginChangeCampaignTag());
    leadsApi
      .assignCampaign(campaign_id, user_id, token, domain)
      .then((res) => {
        dispatch(changeCampaignTagSuccessful());
      })
      .catch((error) => {
        dispatch(changeCampaignTagError());
      });
  };
}

function beginChangeCampaignTag() {
  return {
    type: types.BEGIN_CHANGE_CAMPAIGN_TAG,
    isChangingCampaignTag: true,
    errorChangeCampaignTag: false,
  };
}

function changeCampaignTagSuccessful() {
  return {
    type: types.BEGIN_CHANGE_CAMPAIGN_TAG,
    isChangingCampaignTag: false,
    errorChangeCampaignTag: false,
  };
}

function changeCampaignTagError() {
  return {
    type: types.BEGIN_CHANGE_CAMPAIGN_TAG,
    isChangingCampaignTag: false,
    errorChangeCampaignTag: true,
  };
}

export function changeSourceTag(source_id, user_id, token, domain) {
  return function (dispatch) {
    dispatch(beginChangeSourceTag());
    leadsApi
      .assignSource(source_id, user_id, token, domain)
      .then((res) => {
        dispatch(changeSourceTagSuccessful());
      })
      .catch((error) => {
        dispatch(changeSourceTagError());
      });
  };
}

function beginChangeSourceTag() {
  return {
    type: types.BEGIN_CHANGE_SOURCE_TAG,
    isChangingSourceTag: true,
    errorChangeSourceTag: false,
  };
}

function changeSourceTagSuccessful() {
  return {
    type: types.CHANGE_SOURCE_TAG_SUCCESSFUL,
    isChangingSourceTag: false,
    errorChangeSourceTag: false,
  };
}
function changeSourceTagError() {
  return {
    type: types.CHANGE_SOURCE_TAG_ERROR,
    isChangingSourceTag: false,
    errorChangeSourceTag: true,
  };
}

export function changeStatusTag(status_id, id, token, domain) {
  return function (dispatch) {
    dispatch(beginChangeStatusTag());
    leadsApi
      .assignStatus(status_id, id, token, domain)
      .then((res) => {
        dispatch(changeStatusTagSuccessful());
      })
      .catch((err) => {
        dispatch(changeStatusTagError());
        throw err;
      });
  };
}

function beginChangeStatusTag() {
  return {
    type: types.BEGIN_CHANGE_STATUS_TAG,
    isChangingStatusTag: true,
    errorChangeStatusTag: false,
  };
}

function changeStatusTagSuccessful() {
  return {
    type: types.BEGIN_CHANGE_STATUS_TAG,
    isChangingStatusTag: false,
    errorChangeStatusTag: false,
  };
}

function changeStatusTagError() {
  return {
    type: types.BEGIN_CHANGE_STATUS_TAG,
    isChangingStatusTag: false,
    errorChangeStatusTag: true,
  };
}

export function changePICTag(staff_id, lead_id, token, domain) {
  return function (dispatch) {
    dispatch(beginChangePICTag());
    leadsApi
      .assignPIC(staff_id, lead_id, token, domain)
      .then((res) => {
        dispatch(changePICTagSuccessful());
      })
      .catch((err) => {
        dispatch(changePICTagError());
        throw err;
      });
  };
}

function beginChangePICTag() {
  return {
    type: types.BEGIN_CHANGE_PIC_TAG,
    isChangingPICTag: true,
    errorChangePICTag: false,
  };
}

function changePICTagSuccessful() {
  return {
    type: types.CHANGE_PIC_TAG_SUCCESSFUL,
    isChangingPICTag: false,
    errorChangePICTag: false,
  };
}

function changePICTagError() {
  return {
    type: types.CHANGE_STATUS_TAG_ERROR,
    isChangingPICTag: false,
    errorChangePICTag: true,
  };
}
