/**
 * Created by phanmduong on 4/7/17.
 */
import * as types from '../constants/actionTypes';
import * as attendanceStudentApi from '../apis/attendanceStudentApi';
import {Alert} from 'react-native';
import * as alert from '../constants/alert';
import {uploadImage} from '../apis/studentApi';

export function beginGetInforStudent() {
  return {
    type: types.BEGIN_GET_INFOR_STUDENT,
    isLoadingInfoStudent: true,
    errorLoad: false,
    messageError: undefined,
  };
}

export function loadInfoStudent(studentCode, token, domain) {
  return function (dispatch) {
    dispatch(beginGetInforStudent());
    attendanceStudentApi
      .getInfoStudentApi(studentCode, token, domain)
      .then(function (res) {
        dispatch(loadedInforStudentSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadedInforStudentError(error.response.data));
        throw error;
      });
  };
}

export function studentChangeStatusBlock(studentID, token, status, domain) {
  return function (dispatch) {
    dispatch({
      type: types.BEGIN_UNBLOCK_STUDENT,
      isChangeStatusBlocking: true,
    });
    attendanceStudentApi
      .studentChangeStatusBlock(studentID, token, status, domain)
      .then(function (res) {
        dispatch({
          type: types.LOAD_UNBLOCKING_STUDENT,
          isChangeStatusBlocking: false,
          student: res.data.student,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.ERROR_UNBLOCKING_STUDENT,
          isChangeStatusBlocking: false,
        });
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        throw error;
      });
  };
}

export function uploadImageStudent(file, studentId, imageField, token, domain) {
  return function (dispatch) {
    dispatch({
      type: types.BEGIN_UPLOAD_IMAGE_STUDENT,
      imageField: imageField,
    });
    uploadImage(
      file,
      (event) => {
        let data = JSON.parse(event.currentTarget.response);
        dispatch({
          type: types.UPLOAD_IMAGE_STUDENT,
          imageField: imageField,
          image_url: data.image_url,
        });
      },
      studentId,
      imageField,
      token,
      (error) => {
        Alert.alert('Thông báo', 'Tải ảnh lỗi');
        console.log(error);
      },
      domain,
    );
  };
}

export function loadedInforStudentSuccessful(res) {
  return {
    type: types.LOAD_GET_INFOR_STUDENT_SUCCESSFUL,
    isLoadingInfoStudent: false,
    errorLoad: false,
    student: res.data.student,
    classStudent: res.data.class,
  };
}

export function loadedInforStudentError(res) {
  return {
    type: types.LOAD_GET_INFOR_STUDENT_ERROR,
    isLoadingInfoStudent: false,
    errorLoad: true,
    messageError: res.error,
  };
}

export function beginPostAttendaceStudent() {
  return {
    type: types.BEGIN_POST_ATTENDANCE_STUDENT,
    isUpdatingAttendanceStudent: true,
    errorUpdate: false,
  };
}

export function updateAttendanceStudent(attendanceId, token, domain) {
  return function (dispatch) {
    dispatch(beginPostAttendaceStudent());
    attendanceStudentApi
      .postAttendanceStudentApi(attendanceId, token, domain)
      .then(function (res) {
        dispatch(updateAttendanceStudentSuccessful(res));
      })
      .catch((error) => {
        dispatch(updateAttendanceStudentError());
        throw error;
      });
  };
}

export function updateAttendanceStudentSuccessful(res) {
  return {
    type: types.LOAD_POST_ATTENDANCE_STUDENT_SUCCESSFUL,
    isUpdatingAttendanceStudent: false,
    errorUpdate: false,
    statusRequestUpdated: res.status,
    attendance: res.data.attendance,
    message: res.data.message,
  };
}

export function updateAttendanceStudentError() {
  return {
    type: types.LOAD_POST_ATTENDANCE_STUDENT_ERROR,
    isUpdatingAttendanceStudent: false,
    errorUpdate: true,
  };
}

export function selectButtonEnterStudentCode(studentCode) {
  return {
    type: types.SELECT_BUTTON_ENTER_STUDENT_CODE,
    studentCode: studentCode,
  };
}

export function scannedQRCode(studentCode) {
  return {
    type: types.SCANNED_QR_CODE,
    studentCode: studentCode,
  };
}
