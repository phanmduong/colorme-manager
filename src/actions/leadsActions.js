import * as types from '../constants/actionTypes';
import * as leadsApi from '../apis/leadsApi';

export function getLeads(
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
) {
  return function(dispatch) {
    dispatch(beginLoadLeads());
    leadsApi
      .getLeads(
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
      )
      .then(function(res) {
        dispatch(loadLeadsSuccessful(res));
      })
      .catch(error => {
        dispatch(loadLeadsError());
        throw error;
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

function loadLeadsSuccessful(res) {
  return {
    type: types.LOAD_LEADS_SUCCESSFUL,
    isLoadingLeads: false,
    errorLeads: false,
    leads: res.data.leads,
    currentPageLeads: res.data.paginator.current_page,
    totalPageLeads: res.data.paginator.total_pages,
  };
}

function loadLeadsError() {
  return {
    type: types.LOAD_LEADS_ERROR,
    isLoadingLeads: false,
    errorLeads: false,
  };
}
