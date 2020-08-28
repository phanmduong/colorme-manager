/**
 * Created by phanmduong on 5/1/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadAnalyticsRegister(
  baseId,
  staffId,
  startTime,
  endTime,
  token,
  domain,
) {
  let url =
    env.manageApiUrlV4(domain) +
    '/dashboard/analytics-register?start_time=' +
    startTime +
    '&end_time=' +
    endTime +
    '&staff_id=' +
    staffId +
    '&base_id=' +
    baseId +
    '&token=' +
    token;
  return axios.get(url);
}

export function loadAnalyticsRevenue(
  startTime,
  endTime,
  staffId,
  baseId,
  courseId,
  sourceId,
  campaignId,
  token,
  domain,
) {
  let url =
    env.manageApiUrlV4(domain) +
    '/dashboard/analytics-revenue?start_time=' +
    startTime +
    '&end_time=' +
    endTime +
    '&staff_id=' +
    staffId +
    '&base_id=' +
    baseId +
    '&course_id=' +
    courseId +
    '&source_id=' +
    sourceId +
    '&campaign_id=' +
    campaignId +
    '&token=' +
    token;
  console.log(url);
  return axios.get(url);
}

export function loadAnalyticsKPI(
  startTime,
  endTime,
  baseId,
  courseId,
  sourceId,
  campaignId,
  staffId,
  token,
  domain,
) {
  let url =
    env.manageApiUrlV4(domain) +
    '/dashboard/analytics-kpi?start_time=' +
    startTime +
    '&end_time=' +
    endTime +
    '&base_id=' +
    baseId +
    '&course_id=' +
    courseId +
    '&source_id=' +
    sourceId +
    '&campaign_id=' +
    campaignId +
    '&staff_id=' +
    staffId +
    '&token=' +
    token +
    '&include=base,base.district.province';
  return axios.get(url);
}
