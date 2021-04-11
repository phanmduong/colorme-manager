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
  provinceId,
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
    '&province_id=' +
    provinceId +
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
  provinceId,
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
    '&province_id=' +
    provinceId +
    '&token=' +
    token;
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
  provinceId,
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
    '&province_id=' +
    provinceId +
    '&token=' +
    token +
    '&include=course,base,target,register_target,schedule,room,teacher,teacher_assistant';
  return axios.get(url);
}
