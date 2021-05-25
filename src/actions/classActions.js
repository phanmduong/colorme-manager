/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as classApi from '../apis/classApi';
import * as studentApi from '../apis/studentApi';
import axios from 'axios';
import {Alert} from 'react-native';

let CancelToken = axios.CancelToken;
let sourceCancel = CancelToken.source();

export function beginDataClassLoad() {
  return {
    type: types.BEGIN_DATA_CLASS_LOAD,
    isLoading: true,
    error: false,
  };
}

export function loadDataClass(
  refreshing,
  page,
  course_id,
  base_id,
  province_id,
  room_id,
  employee_id,
  type,
  enroll_start_date,
  enroll_end_date,
  start_date,
  end_date,
  search,
  token,
  domain,
) {
  return function (dispatch) {
    if (!refreshing) {
      dispatch(beginDataClassLoad());
    } else {
      dispatch(beginDataClassRefresh());
    }
    classApi
      .loadClassApi(
        sourceCancel,
        page,
        course_id,
        base_id,
        province_id,
        room_id,
        employee_id,
        type,
        enroll_start_date,
        enroll_end_date,
        start_date,
        end_date,
        search,
        token,
        domain,
      )
      .then(function (res) {
        dispatch(loadDataSuccessful(res));
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          dispatch(loadDataError());
          throw error;
        }
      });
  };
}

export function loadDataSuccessful(res) {
  return {
    type: types.LOAD_DATA_CLASS_SUCCESSFUL,
    classData: res.data.study_classes.items,
    isLoading: false,
    error: false,
    currentPage: res.data.study_classes.meta.current_page,
    totalPage: res.data.study_classes.meta.total_pages,
    isRefreshing: false,
  };
}

export function beginDataClassRefresh() {
  return {
    type: types.BEGIN_DATA_CLASS_REFRESH,
    isRefreshing: true,
    error: false,
  };
}

export function refreshDataClass(
  course_id,
  base_id,
  province_id,
  room_id,
  employee_id,
  type,
  enroll_start_date,
  enroll_end_date,
  start_date,
  end_date,
  search,
  token,
  domain,
) {
  return function (dispatch) {
    dispatch(beginSearchClass(search));
    dispatch(
      loadDataClass(
        true,
        1,
        course_id,
        base_id,
        province_id,
        room_id,
        employee_id,
        type,
        enroll_start_date,
        enroll_end_date,
        start_date,
        end_date,
        search,
        token,
        domain,
      ),
    );
  };
}

function beginSearchClass(search) {
  return {
    type: types.BEGIN_SEARCH_CLASS,
    search: search,
    currentPage: 1,
    totalPage: 1,
    classData: [],
  };
}

export function searchClass(
  course_id,
  base_id,
  province_id,
  room_id,
  employee_id,
  type,
  enroll_start_date,
  enroll_end_date,
  start_date,
  end_date,
  search,
  token,
  domain,
) {
  sourceCancel.cancel('Canceled by class api.');
  sourceCancel = CancelToken.source();
  return function (dispatch) {
    dispatch(beginSearchClass(search));
    dispatch(
      loadDataClass(
        false,
        1,
        course_id,
        base_id,
        province_id,
        room_id,
        employee_id,
        type,
        enroll_start_date,
        enroll_end_date,
        start_date,
        end_date,
        search,
        token,
        domain,
      ),
    );
  };
}

export function beginDataCourseLoad() {
  return {
    type: types.BEGIN_DATA_COURSES_LOAD,
    isLoading: true,
    error: false,
  };
}

export function loadDataCourse(token, domain) {
  return function (dispatch) {
    dispatch(beginDataCourseLoad());
    classApi
      .loadCourseApi(token, domain)
      .then(function (res) {
        dispatch(loadDataCourseSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadDataCourseError());
        throw error;
      });
  };
}

export function loadDataError() {
  return {
    type: types.LOAD_DATA_CLASS_ERROR,
    isLoading: false,
    error: false,
    isRefreshing: false,
  };
}

export function loadDataCourseSuccessful(res) {
  return {
    type: types.LOAD_DATA_COURSES_SUCCESSFUL,
    courseData: res.data,
    isLoading: false,
    error: false,
  };
}

export function loadDataCourseError() {
  return {
    type: types.LOAD_DATA_COURSES_ERROR,
    isLoading: false,
    error: false,
  };
}

export function selectedClassId(id) {
  return {
    type: types.SELECTED_CLASS_ID,
    selectedClassId: id,
  };
}

export function selectedBaseId(id) {
  return {
    type: types.SELECTED_CLASS_BASE_ID,
    selectedBaseId: id,
  };
}

export function selectedGenId(id) {
  return {
    type: types.SELECTED_CLASS_GEN_ID,
    selectedGenId: id,
  };
}

export function selectedCourseId(id) {
  return {
    type: types.SELECTED_CLASS_COURSE_ID,
    selectedCourseId: id,
  };
}

function beginLoadBase() {
  return {
    type: types.BEGIN_LOAD_BASE,
    isLoadingBase: true,
    errorLoadingBase: false,
  };
}

function loadBaseSuccessful(res) {
  return {
    type: types.LOAD_BASE_SUCCESSFUL,
    isLoadingBase: false,
    errorLoadingBase: false,
    baseData: res.data.bases,
  };
}

function loadBaseError() {
  return {
    type: types.LOAD_BASE_ERROR,
    isLoadingBase: false,
    errorLoadingBase: true,
  };
}

export function loadBaseData(token, domain) {
  return function (dispatch) {
    dispatch(beginLoadBase());
    classApi
      .loadBaseData(token, domain)
      .then(function (res) {
        dispatch(loadBaseSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadBaseError());
        throw error;
      });
  };
}

export function infoCreateClass(token, domain) {
  return function (dispatch) {
    dispatch(beginLoadInfoCreateClass());
    classApi
      .infoCreateClass(token, domain)
      .then(function (res) {
        dispatch(loadInfoCreateClassSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadInfoCreateClassError());
        throw error;
      });
  };
}

function beginLoadInfoCreateClass() {
  return {
    type: types.BEGIN_LOAD_INFO_CREATE_CLASS,
    loadingInfoCreateClass: true,
    errorInfoCreateClass: false,
  };
}

function loadInfoCreateClassSuccessful(res) {
  return {
    type: types.LOAD_INFO_CREATE_CLASS_SUCCESSFUL,
    loadingInfoCreateClass: false,
    errorInfoCreateClass: false,
    schedules: res.data.data.schedules,
    rooms: res.data.data.rooms,
    courses: res.data.data.courses,
    genData: res.data.data.gens,
    staffs: res.data.data.staffs,
  };
}

function loadInfoCreateClassError() {
  return {
    type: types.LOAD_INFO_CREATE_CLASS_ERROR,
    loadingInfoCreateClass: false,
    errorInfoCreateClass: true,
  };
}

export function addClass(classData, baseId, genId, token, domain) {
  return function (dispatch) {
    dispatch(beginAddClass());
    classApi
      .addClass(classData, token, domain)
      .then(function (res) {
        dispatch(addClassSuccessful());
        dispatch(loadDataClass(baseId, genId, token, domain));
      })
      .catch((error) => {
        dispatch(addClassError());
        throw error;
      });
  };
}

function beginAddClass() {
  return {
    type: types.BEGIN_ADD_CLASS,
    isUpdatingClass: true,
    errorUpdatingClass: false,
  };
}

function addClassSuccessful() {
  return {
    type: types.ADD_CLASS_SUCCESSFUL,
    isUpdatingClass: false,
    errorUpdatingClass: false,
  };
}

function addClassError() {
  return {
    type: types.ADD_CLASS_ERROR,
    isUpdatingClass: false,
    errorUpdatingClass: true,
  };
}

export function loadClassInfo(classId, token, domain) {
  return function (dispatch) {
    dispatch(beginLoadClassInfo());
    classApi
      .loadClassInfo(classId, token, domain)
      .then(function (res) {
        dispatch(loadClassInfoSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadClassInfoError());
        throw error;
      });
  };
}

function beginLoadClassInfo() {
  return {
    type: types.BEGIN_LOAD_CLASS_INFO,
    loadingClassInfo: true,
    errorClassInfo: false,
  };
}

function loadClassInfoSuccessful(res) {
  return {
    type: types.LOAD_CLASS_INFO_SUCCESSFUL,
    loadingClassInfo: false,
    errorClassInfo: false,
    classInfo: res.data.data.class,
  };
}

function loadClassInfoError() {
  return {
    type: types.LOAD_CLASS_INFO_ERROR,
    loadingClassInfo: false,
    errorClassInfo: true,
  };
}

export function changeClassStatus(classId, token, domain) {
  return function (dispatch) {
    dispatch(beginChangeClassStatus());
    classApi
      .changeClassStatus(classId, token, domain)
      .then(function (res) {
        dispatch(changeClassStatusSuccessful());
      })
      .catch((error) => {
        dispatch(changeClassStatusError());
        throw error;
      });
  };
}

function beginChangeClassStatus() {
  return {
    type: types.BEGIN_CHANGE_CLASS_STATUS,
    changingClassStatus: true,
    errorClassStatus: false,
  };
}

function changeClassStatusSuccessful() {
  return {
    type: types.CHANGE_CLASS_STATUS_SUCCESSFUL,
    changingClassStatus: false,
    errorClassStatus: false,
  };
}

function changeClassStatusError() {
  return {
    type: types.CHANGE_CLASS_STATUS_ERROR,
    changingClassStatus: false,
    errorClassStatus: true,
  };
}

export function selectedStatusId(id) {
  return {
    type: types.SELECTED_CLASS_STATUS_ID,
    status: id,
  };
}

export function selectedClassType(id) {
  return {
    type: types.SELECTED_CLASS_TYPE,
    classType: id,
  };
}

export function selectedProvinceId(id) {
  return {
    type: types.SELECTED_CLASS_PROVINCE_ID,
    provinceId: id,
  };
}

export function selectedTeacherId(id) {
  return {
    type: types.SELECTED_CLASS_TEACHER_ID,
    teacherId: id,
  };
}

export function selectedEnrollStartTime(time) {
  return {
    type: types.SELECTED_CLASS_ENROLL_START_TIME,
    enrollStartTime: time,
  };
}

export function selectedEnrollEndTime(time) {
  return {
    type: types.SELECTED_CLASS_ENROLL_END_TIME,
    enrollEndTime: time,
  };
}

export function selectedLessonStartTime(time) {
  return {
    type: types.SELECTED_CLASS_LESSON_START_TIME,
    lessonStartTime: time,
  };
}

export function selectedLessonEndTime(time) {
  return {
    type: types.SELECTED_CLASS_LESSON_END_TIME,
    lessonEndTime: time,
  };
}

export function selectedStartTime(time) {
  return {
    type: types.SELECTED_CLASS_START_TIME,
    startTime: time,
  };
}

export function selectedEndTime(time) {
  return {
    type: types.SELECTED_CLASS_END_TIME,
    endTime: time,
  };
}

export function loadStatuses(ref, token, domain) {
  return function (dispatch) {
    dispatch(beginLoadStatuses());
    studentApi
      .loadStatuses(ref, token, domain)
      .then((res) => {
        dispatch(loadStatusesSuccess(res));
      })
      .catch((error) => {
        dispatch(loadStatusesError());
        throw error;
      });
  };
}

function beginLoadStatuses() {
  return {
    type: types.BEGIN_LOAD_CLASS_STATUSES,
    isLoadingStatuses: true,
    errorStatuses: false,
  };
}

function loadStatusesSuccess(res) {
  return {
    type: types.BEGIN_LOAD_CLASS_STATUSES,
    isLoadingStatuses: false,
    errorStatuses: false,
    statuses: res.data.statuses,
  };
}

function loadStatusesError() {
  return {
    type: types.BEGIN_LOAD_CLASS_STATUSES,
    isLoadingStatuses: false,
    errorStatuses: true,
  };
}

export function selectedClassStatus(id) {
  return {
    type: types.SELECTED_CLASS_CLASS_STATUS,
    class_status: id,
  };
}

export function createSchedule(name, study_sessions, token) {
  return function (dispatch) {
    dispatch(beginCreateClassSchedule());
    classApi
      .createClassSchedule(name, study_sessions, token)
      .then((res) => {
        Alert.alert('Thông báo', 'Tạo lịch học thành công');
        dispatch(infoCreateClass(token));
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        throw error;
      })
      .finally(() => {
        dispatch(createClassScheduleComplete());
      });
  };
}

function beginCreateClassSchedule() {
  return {
    type: types.BEGIN_CREATE_CLASS_SCHEDULE,
    creatingClassSchedule: true,
  };
}

function createClassScheduleComplete() {
  return {
    type: types.CREATE_CLASS_SCHEDULE_COMPLETE,
    creatingClassSchedule: false,
  };
}

export function loadRooms(token, domain) {
  return function (dispatch) {
    dispatch(beginLoadRooms());
    classApi
      .loadRooms(token, domain)
      .then((res) => {
        dispatch(loadRoomsSuccess(res));
      })
      .catch((error) => {
        dispatch(loadRoomsError());
        throw error;
      });
  };
}

function beginLoadRooms() {
  return {
    type: types.BEGIN_LOAD_ROOMS,
    isLoadingRooms: true,
    errorRooms: false,
  };
}

function loadRoomsSuccess(res) {
  return {
    type: types.LOAD_ROOMS_SUCCESS,
    isLoadingRooms: false,
    errorRooms: false,
    rooms: res.data.rooms,
  };
}

function loadRoomsError() {
  return {
    type: types.LOAD_ROOMS_ERROR,
    isLoadingRooms: false,
    errorRooms: true,
  };
}

export function selectedRoomId(id) {
  return {
    type: types.SELECTED_CLASS_ROOM_ID,
    roomId: id,
  };
}
