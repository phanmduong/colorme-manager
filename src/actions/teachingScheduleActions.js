import * as types from '../constants/actionTypes';
import * as teachingScheduleApi from '../apis/teachingScheduleApi';

export function loadSchedules(
  baseId,
  courseId,
  teacherId,
  provinceId,
  type,
  startTime,
  endTime,
  token,
) {
  return function (dispatch) {
    dispatch(beginLoadSchedules());
    teachingScheduleApi
      .loadClassApi(
        baseId,
        courseId,
        teacherId,
        provinceId,
        type,
        startTime,
        endTime,
        token,
      )
      .then((res) => dispatch(loadSchedulesSuccess(res)))
      .catch((error) => {
        dispatch(loadSchedulesError());
        throw error;
      });
  };
}

function beginLoadSchedules() {
  return {
    type: types.BEGIN_LOAD_SCHEDULES,
    loading: true,
    error: false,
  };
}

function loadSchedulesSuccess(res) {
  return {
    type: types.LOAD_SCHEDULES_SUCCESS,
    loading: false,
    error: false,
    classes: res.data.data.classes,
  };
}

function loadSchedulesError() {
  return {
    type: types.LOAD_SCHEDULES_ERROR,
    loading: false,
    error: true,
  };
}

export function selectedStartDate(startTime) {
  return {
    type: types.ON_SELECT_START_DATE_SCHEDULES,
    startTime: startTime,
  };
}

export function selectedEndDate(endTime) {
  return {
    type: types.ON_SELECT_END_DATE_SCHEDULES,
    endTime: endTime,
  };
}

export function selectedProvinceId(provinceId) {
  return {
    type: types.ON_SELECT_PROVINCE_SCHEDULES,
    provinceId: provinceId,
  };
}

export function selectedBaseId(baseId) {
  return {
    type: types.ON_SELECT_BASE_SCHEDULES,
    baseId: baseId,
  };
}

export function selectedCourseId(courseId) {
  return {
    type: types.ON_SELECT_COURSE_SCHEDULES,
    courseId: courseId,
  };
}

export function selectedTeacherId(id) {
  return {
    type: types.ON_SELECT_TEACHER_SCHEDULES,
    teacherId: id,
  };
}

export function selectedType(id) {
  return {
    type: types.ON_SELECT_TYPE_SCHEDULES,
    scheduleType: id,
  };
}
