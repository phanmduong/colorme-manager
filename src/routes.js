/**
 * Created by phanmduong on 4/5/17.
 */
import React from'react';
import {Scene, Router,ActionConst} from 'react-native-router-flux';
import LoginContainer from './containers/LoginContainer';
import BaseContainer from './containers/BaseContainer';
import CourseContainer from './containers/CourseContainer';
import GenContainer from './containers/GenContainer';
import LessonCourseContainer from './containers/LessonCourseContainer';
import ClassContainer from './containers/ClassContainer';
import ChooseEnterStudentContainer from './containers/ChooseEnterStudentContainer';
import EnterStudentCodeContainer from './containers/EnterStudentCodeContainer';
import QRCodeContainer from './containers/QRCodeContainer';
import AttendanceStudentContainer from './containers/AttendanceStudentContainer';
import {Navigator}from 'react-native'

class RouterComponent extends React.Component {
    render() {
        return (
            <Router sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}>
                <Scene key="root" >
                    <Scene key="login" component={LoginContainer} title="Login" initial hideNavBar/>
                </Scene>
                <Scene key="attendance">
                    <Scene key="base" component={BaseContainer} title="Cơ sở" initial/>
                    <Scene key="course" component={CourseContainer} title="Môn học"/>
                    <Scene key="gen" component={GenContainer} title="Khóa học"/>
                    <Scene key="lessonCourse" component={LessonCourseContainer} title="Buổi học"/>
                    <Scene key="classCourse" component={ClassContainer} title="Lớp học"/>
                    <Scene key="chooseEnterStudent" component={ChooseEnterStudentContainer} title="Điểm danh"/>
                    <Scene key="enterStudentCode" component={EnterStudentCodeContainer} title="Điểm danh"/>
                    <Scene key="scanQRCode" component={QRCodeContainer} title="Scan QRCode" />
                    <Scene key="attendanceStudentCode" component={AttendanceStudentContainer} title="Điểm danh học viên"/>
                </Scene>
            </Router>
        )
    }
}

export default RouterComponent;