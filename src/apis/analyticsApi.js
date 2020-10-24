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
) {
  let url =
    env.MANAGE_API_URL_V4 +
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
) {
  let url =
    env.MANAGE_API_URL_V4 +
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
) {
  let url =
    env.MANAGE_API_URL_V4 +
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
  return axios.get(url);
}

export function changeProvince(provinceId, token) {
  let url =
    env.MANAGE_API_URL_V4 + '/user/staff/choice-province?token=' + token;
  return axios.put(url, {
    choice_province_id: provinceId,
  });
}
