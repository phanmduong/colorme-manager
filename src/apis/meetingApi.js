/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadMeetings(token, status = 'available') {
  let url = env.MANAGE_API_URL_V3 + `/meeting/list/${status}?token=` + token;
  return axios.get(url);
}

export function loadMeetingDetail(token, meetingId) {
  let url =
    env.MANAGE_API_URL_V3 +
    `/meeting/meeting-detail/${meetingId}?token=` +
    token;
  return axios.get(url);
}

export function loadFilterMeeting(token) {
  let url = env.MANAGE_API_URL_V3 + '/meeting/filter?token=' + token;
  return axios.get(url);
}

export function joinMeeting(token, meeting_id, status, note) {
  let url = env.MANAGE_API_URL_V3 + '/meeting/join-meeting?token=' + token;
  return axios.post(url, {
    meeting_id,
    note,
    status,
  });
}

export function checkInMeeting(token, meeting_id) {
  let url = env.MANAGE_API_URL_V3 + '/meeting/check-in-meeting?token=' + token;
  return axios.post(url, {
    meeting_id,
  });
}

export function storeIssue(
  token,
  meeting_id,
  issue,
  description = '',
  status = 'accept',
) {
  let url = env.MANAGE_API_URL_V3 + '/meeting/store-issue?token=' + token;
  return axios.post(url, {
    meeting_id,
    issue,
    description,
    status,
  });
}

export function storeMeeting(
  token,
  name,
  room_id,
  date,
  description = '',
  status = 'available',
  filter = {},
  meeting_id = '',
) {
  let url = env.MANAGE_API_URL_V3 + '/meeting/store-meeting?token=' + token;
  console.log({
    meeting_id,
    name,
    description,
    status,
    filter,
    date,
    room_id,
  });
  return axios.post(url, {
    meeting_id,
    name,
    description,
    status,
    filter,
    date,
    room_id,
  });
}

export function deleteMeetingIssue(token, meetingIssueId) {
  let url =
    env.MANAGE_API_URL_V3 +
    `/meeting/delete-meeting-issue/${meetingIssueId}?token=` +
    token;
  return axios.delete(url);
}
