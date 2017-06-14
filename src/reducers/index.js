/**
 * Created by phanmduong on 4/5/17.
 */
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
import dashboardReducer from './dashboardReducer';
import listStudentClassReducer from './listStudentClassReducer';
import registerListReducer from './registerListReducer';
import navigatorReducer from './navigatorReducer';
import statusbarReducer from './statusbarReducer';
import autoLoginReducer from './autoLoginReducer';
import collectMoneyReducer from './collectMoneyReducer';


const rootReducer = combineReducers({
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
    dashboard: dashboardReducer,
    listStudentClass: listStudentClassReducer,
    registerList: registerListReducer,
    nav: navigatorReducer,
    statusBar: statusbarReducer,
    collectMoney: collectMoneyReducer,
});
export default rootReducer;