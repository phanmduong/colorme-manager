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
import QRCodeContainer from './containers/QRCodeContainer';
import AttendanceStudentContainer from './containers/AttendanceStudentContainer';
import {Navigator}from 'react-native'

class RouterComponent extends React.Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="login" component={LoginContainer} initial hideNavBar type={ActionConst.RESET}/>
                    <Scene key="base" component={BaseContainer}  type={ActionConst.RESET} hideNavBar/>
                    <Scene key="course" component={CourseContainer} />
                    <Scene key="gen" component={GenContainer}  />
                    <Scene key="lessonCourse" component={LessonCourseContainer}/>
                    <Scene key="classCourse" component={ClassContainer} />
                    <Scene key="scanQRCode" component={QRCodeContainer} />
                    <Scene key="attendanceStudentCode" component={AttendanceStudentContainer}/>
                </Scene>
            </Router>
        )
    }
}

export default RouterComponent;