import * as env from '../constants/env';
import axios from 'axios';

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
  let url =
    env.MANAGE_API_URL_V3 +
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
    campaign_id;
  console.log(url);
  return axios.get(url);
}
