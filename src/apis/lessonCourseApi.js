/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadLessonCourseApi(courseId, token) {
    let url = env.API_URL + "/courses/" + courseId + "/lessons?token=" + token;
    return axios.get(url);
}

export function loadListStudentAttendanceByLessonApi(classID, lessonID, token) {
    let url = env.MANAGE_API_URL_V3 + `/v2/course/get-attendance-lesson/${classID}/${lessonID}?token=` + token;
    return axios.get(url);
}


