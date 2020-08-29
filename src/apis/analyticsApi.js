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
  courseId,
  sourceId,
  campaignId,
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
    '&course_id=' +
    courseId +
    '&source_id=' +
    sourceId +
    '&campaign_id=' +
    campaignId +
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

export function loadAnalyticsClasses(
  startDate,
  endDate,
  staffId,
  baseId,
  enrollStart,
  enrollEnd,
  courseId,
  sourceId,
  campaignId,
  token,
  domain,
) {
  let url =
    env.manageApiUrlV4(domain) +
    '/class/all?start_date=' +
    startDate +
    '&end_date=' +
    endDate +
    '&staff_id=' +
    staffId +
    '&base_id=' +
    baseId +
    '&enroll_start_date=' +
    enrollStart +
    '&enroll_end_date=' +
    enrollEnd +
    '&course_id=' +
    courseId +
    '&source_id=' +
    sourceId +
    '&campaign_id=' +
    campaignId +
    '&token=' +
    token +
    '&include=course,base,target,register_target,schedule,room,teacher,teacher_assistant';
  console.log(url);
  return axios.get(url);
}
