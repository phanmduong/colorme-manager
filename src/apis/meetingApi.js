/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadMeetings(token, status = "available") {
    let url = env.MANAGE_API_URL_V3 + `/meeting/list/${status}?token=` + token;
    return axios.get(url);
}

export function joinMeeting(token, meeting_id, status, note) {
    let url = env.MANAGE_API_URL_V3 + `/meeting/join-meeting?token=` + token;
    return axios.post(url, {
        meeting_id,
        note,
        status
    });
}

export function checkInMeeting(token, meeting_id) {
    let url = env.MANAGE_API_URL_V3 + `/meeting/check-in-meeting?token=` + token;
    return axios.post(url, {
        meeting_id,
    });
}
