/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as studentApi from '../apis/studentApi';

export function beginDataListStudentPaidLoad() {
  return {
    type: types.BEGIN_DATA_LIST_STUDENT_PAID_LOAD,
    isLoading: true,
    error: false,
  };
}

export function loadDataListStudentPaid(genId, baseId) {
  return function(dispatch) {
    dispatch(beginDataListStudentPaidLoad());
    studentApi
      .loadStudentListByFilterApi(genId, baseId, 'paid')
      .then(function(res) {
        dispatch(loadDataSuccessful(res));
      })
      .catch(error => {
        dispatch(loadDataError());
        throw error;
      });
  };
}

export function loadDataSuccessful(res) {
  console.log(res.data.students);
  return {
    type: types.LOAD_DATA_LIST_STUDENT_PAID_SUCCESSFUL,
    listStudentPaidData: res.data.students,
    isLoading: false,
    error: false,
  };
}

export function loadDataError() {
  return {
    type: types.LOAD_DATA_LIST_STUDENT_PAID_ERROR,
    isLoading: false,
    error: true,
  };
}
