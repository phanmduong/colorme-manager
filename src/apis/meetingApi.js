/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadMeetings(token, domain, status = 'available') {
  let url =
    env.manageApiUrlV3(domain) + `/meeting/list/${status}?token=` + token;
  return axios.get(url);
}

export function loadMeetingDetail(token, meetingId, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    `/meeting/meeting-detail/${meetingId}?token=` +
    token;
  return axios.get(url);
}

export function loadFilterMeeting(token, domain) {
  let url = env.manageApiUrlV3(domain) + '/meeting/filter?token=' + token;
  return axios.get(url);
}

export function joinMeeting(token, meeting_id, status, note, domain) {
  let url = env.manageApiUrlV3(domain) + '/meeting/join-meeting?token=' + token;
  return axios.post(url, {
    meeting_id,
    note,
    status,
  });
}

export function checkInMeeting(token, meeting_id, domain) {
  let url =
    env.manageApiUrlV3(domain) + '/meeting/check-in-meeting?token=' + token;
  return axios.post(url, {
    meeting_id,
  });
}

export function storeIssue(
  token,
  meeting_id,
  issue,
  domain,
  description = '',
  status = 'accept',
) {
  let url = env.manageApiUrlV3(domain) + '/meeting/store-issue?token=' + token;
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
  domain,
  description = '',
  status = 'available',
  filter = {},
  meeting_id = '',
) {
  let url = env.manageApiUrlV3(domain) + '/meeting/store-meeting?token=' + token;
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

export function deleteMeetingIssue(token, meetingIssueId, domain) {
  let url =
    env.manageApiUrlV3(domain) +
    `/meeting/delete-meeting-issue/${meetingIssueId}?token=` +
    token;
  return axios.delete(url);
}
