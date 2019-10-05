/**
 * Created by phanmduong on 4/5/17.
 */
import * as types from '../constants/actionTypes';
import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import baseReducer from './baseReducer';
import courseReducer from './courseReducer';
import genReducer from './genReducer';
import lessonCourseReducer from './lessonCourseReducer';
import classReducer from './classReducer';
import QRCodeReducer from './QRCodeReducer';
import attendanceStudentReducer from './attendanceStudentReducer';
import currentClassStudyReducer from './currentClassStudyReducer';
import shiftRegisterReducer from './shiftRegisterReducer';
import analyticsReducer from './analyticsReducer';
import listStudentClassReducer from './listStudentClassReducer';
import listStudentPaidReducer from './listStudentPaidReducer';
import listStudentZeroReducer from './listStudentZeroReducer';
import registerListReducer from './registerListReducer';
// import navigatorReducer from './navigatorReducer';
import statusbarReducer from './statusbarReducer';
import autoLoginReducer from './autoLoginReducer';
import collectMoneyReducer from './collectMoneyReducer';
import moneyTransferReducer from './moneyTransferReducer';
import checkInCheckOutReducer from './checkInCheckOutReducer';
import listStudentAttendanceReducer from './listStudentAttendanceReducer';
import {historyTabReducer} from './historyTabReducer';
import workShiftRegisterReducer from './workShiftRegisterReducer';
import {teachingRatingReducer} from './teachingRatingReducer';
import {detailShiftsReducer} from './detailShiftsReducer';
import {teachingRatingDuplicateReducer} from "./teachingRatingDuplicateReducer";
import {teachingTeamReducer} from "./teachingTeamReducer";

const appReducer = combineReducers({
  login: loginReducer,
  autoLogin: autoLoginReducer,
  base: baseReducer,
  course: courseReducer,
  gen: genReducer,
  lessonCourse: lessonCourseReducer,
  class: classReducer,
  qrCode: QRCodeReducer,
  attendanceStudent: attendanceStudentReducer,
  currentClassStudy: currentClassStudyReducer,
  shiftRegister: shiftRegisterReducer,
  analytics: analyticsReducer,
  listStudentClass: listStudentClassReducer,
  registerList: registerListReducer,
  nav: statusbarReducer,
  statusBar: statusbarReducer,
  collectMoney: collectMoneyReducer,
  moneyTransfer: moneyTransferReducer,
  listStudentPaid: listStudentPaidReducer,
  listStudentZero: listStudentZeroReducer,
  checkInCheckOut: checkInCheckOutReducer,
  listStudentAttendance: listStudentAttendanceReducer,
  historyTab: historyTabReducer,
  workShiftRegister: workShiftRegisterReducer,
  teachingRating: teachingRatingReducer,
  teachingRatingDuplicate: teachingRatingDuplicateReducer,
  teachingTeam: teachingTeamReducer,
  detailShifts: detailShiftsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === types.LOGOUT) {
    state = {
      autoLogin: {
        isAutoLogin: false,
      },
    };
  }

  return appReducer(state, action);
};

export default rootReducer;
