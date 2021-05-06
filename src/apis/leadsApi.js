import * as env from '../constants/env';
import axios from 'axios';
import {isEmptyInput} from '../helper';

export function getLeads(
  sourceCancel,
  page,
  search,
  start_time,
  end_time,
  rate,
  address,
  orderBy,
  source_id,
  campaign_id,
  duplicate,
  lead_tag,
  base_id,
  status_id,
  pic_id,
  mock_exam_start_time,
  mock_exam_end_time,
  call_back_start_time,
  call_back_end_time,
  sortedBy,
  token,
  domain,
) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/leads?limit=20&search=' +
    search +
    '&start_time=' +
    start_time +
    '&end_time=' +
    end_time +
    '&page=' +
    page +
    (!isEmptyInput(rate) ? '&rates[]=' + rate : '') +
    '&address=' +
    address +
    (!isEmptyInput(status_id) ? '&status_ids[]=' + status_id : '') +
    (!isEmptyInput(source_id) ? '&source_ids[]=' + source_id : '') +
    (!isEmptyInput(campaign_id) ? '&campaign_ids[]=' + campaign_id : '') +
    (!isEmptyInput(lead_tag) ? '&lead_tags[]=' + lead_tag : '') +
    (!isEmptyInput(pic_id) ? '&pic_ids[]=' + pic_id : '') +
    (!isEmptyInput(base_id) ? '&base_ids[]=' + base_id : '') +
    '&duplicate_column=' +
    duplicate +
    '&type=' +
    '&mock_exam_start_time=' +
    mock_exam_start_time +
    '&mock_exam_end_time=' +
    mock_exam_end_time +
    '&call_back_start_time=' +
    call_back_start_time +
    '&call_back_end_time=' +
    call_back_end_time +
    '&orderBy=' +
    orderBy +
    '&sortedBy=' +
    sortedBy +
    '&token=' +
    token;
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
  let url = env.manageApiUrlAuth(domain) + '/v1/leads?token=' + token;
  return axios.post(url, {
    address: lead.address,
    base_id: lead.base_id,
    campaign_id: lead.campaign_id,
    city: lead.city,
    dob: lead.dob,
    email: lead.email,
    facebook: lead.facebook,
    father_name: lead.father_name,
    gender: lead.gender,
    how_know: lead.how_know,
    identity_code: lead.identity_code,
    mother_name: lead.mother_name,
    name: lead.name,
    nationality: lead.nationality,
    note: lead.note,
    phone: lead.phone,
    source_id: lead.source_id,
    status_id: lead.status_id,
    staff_id: lead.staff_id,
    university: lead.university,
    work: lead.work,
  });
}

export function assignCampaign(campaign_id, lead_id, token, domain) {
  let url = `${env.manageApiUrlAuth(
    domain,
  )}/v1/leads/${lead_id}/assign-campaign/${campaign_id}?token=${token}`;
  return axios.put(url);
}

export function assignSource(source_id, lead_id, token, domain) {
  let url = `${env.manageApiUrlAuth(
    domain,
  )}/v1/leads/${lead_id}/assign-source/${source_id}?token=${token}`;
  return axios.put(url);
}

export function assignStatus(status_id, lead_id, token, domain) {
  let url = `${env.manageApiUrlAuth(
    domain,
  )}/v1/leads/${lead_id}/assign-status/${status_id}?token=${token}`;
  return axios.put(url);
}

export function assignPIC(staff_id, lead_id, token, domain) {
  let url = `${env.manageApiUrlAuth(
    domain,
  )}/v1/leads/${lead_id}/assign-pic/${staff_id}?token=${token}`;
  return axios.put(url);
}
