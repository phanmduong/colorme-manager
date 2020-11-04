import * as env from '../constants/env';
import axios from 'axios';

export function getLeads(
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
  call_back_time,
  mock_exam_time,
  duplicate,
  lead_tag,
  base_id,
  token,
  domain,
) {
  let url =
    env.manageApiUrlV3(domain) +
    '/lead/all?token=' +
    token +
    '&page=' +
    page +
    '&search=' +
    search +
    '&start_time=' +
    start_time +
    '&end_time=' +
    end_time +
    '&carer_id=' +
    carer_id +
    '&leadStatusId=' +
    leadStatusId +
    '&rate=' +
    rate +
    '&top=' +
    top +
    '&address=' +
    address +
    '&orderBy=' +
    orderBy +
    '&orderByType=' +
    orderByType +
    '&source_id=' +
    source_id +
    '&campaign_id=' +
    campaign_id +
    '&call_back_time=' +
    call_back_time +
    '&mock_exam_time=' +
    mock_exam_time +
    '&duplicate=' +
    duplicate +
    '&lead_tag=' +
    lead_tag +
    '&base_id=' +
    base_id;
  return axios.get(url, {cancelToken: sourceCancel.token});
}

export function getStaff(search, token, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    '/get-staffs?search=' +
    search +
    '&token=' +
    token;
  return axios.get(url);
}

export function saveLead(lead, token, domain) {
  let url = env.manageApiUrlV3(domain) + '/lead/edit-info?token=' + token;
  return axios.put(url, {
    id: lead.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    rate: lead.rate,
    status: lead.status,
    note: lead.note,
    father_name: lead.father_name,
    interest: lead.interest,
    university: lead.university,
    city: lead.city,
    gender: lead.gender,
    status_id: lead.status_id,
    address: lead.address,
    campaign_id: lead.campaign_id,
    source_id: lead.source_id,
    carer_id: lead.carer_id,
  });
}

export function assignCampaign(campaign_id, user_id, token, domain) {
  let url =
    env.manageApiUrlV3(domain) + '/marketing-campaign/assign?token=' + token;
  return axios.post(url, {
    campaign_id,
    user_id,
  });
}

export function assignSource(source_id, user_id, token, domain) {
  let url = env.manageApiUrlV3(domain) + '/source/assign?token=' + token;
  return axios.post(url, {
    source_id,
    user_id,
  });
}

export function assignStatus(status_id, id, token, domain) {
  let url = env.manageApiUrlV4(domain) + '/statuses/assign?token=' + token;
  return axios.post(url, {
    statusRef: 'leads',
    id,
    status_id,
  });
}

export function assignPIC(staff_id, lead_id, token, domain) {
  let url =
    env.manageApiUrlV3(domain) + '/lead/assign-lead-staff?token=' + token;
  return axios.put(url, {
    lead_id,
    staff_id,
  });
}
