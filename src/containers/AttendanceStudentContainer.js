/**
 * Created by phanmduong on 4/6/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AttendanceStudentComponent from '../components/AttendanceStudentComponent';
import * as attendanceStudentActions from '../actions/attendanceStudentActions';
import * as QRCodeActions from '../actions/QRCodeActions';
import * as drawerActions from '../actions/drawerActions';

import {Alert, Text}from 'react-native';
import * as alert from '../constants/alert';
import {Actions} from 'react-native-router-flux';

class AttendanceStudentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.updateAttendance = this.updateAttendance.bind(this);
        this.state = {
            student: {
                attendances: [{}]
            },
            checkClass: false
        }
        this.popRouter = this.popRouter.bind(this);
    }

    componentWillMount() {
        this.props.attendanceStudentActions.loadInfoStudent(this.props.studentCode, this.props.token);
    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.errorLoad) {
            Alert.alert('Thông báo', alert.LOAD_DATA_ERROR);
        }

        if (nextProps.errorUpdate) {
            Alert.alert('Thông báo', alert.ATTENDANCE_ERROR);
        }

        if (nextProps.message === 'success') {
            Alert.alert('Thông báo',
                alert.ATTENDANCE_SUCCESSFUL,
                [{text: 'Đồng ý', onPress: this.popRouter}],
                { cancelable: false }
            );
            var student = nextProps.student;
            student.attendances[this.props.orderLessonCourse].status = 1;
            this.setState({
                student: Object.assign({}, this.state.student, student)
            });
        } else {
            this.setState({
                student: Object.assign({}, this.state.student, nextProps.student)
            });
        }

        if (!nextProps.isLoadingInfoStudent){
            if (nextProps.classStudent.id && nextProps.classStudent.id !== nextProps.classId){
                if (!this.state.checkClass){
                    Alert.alert('Thông báo', alert.STUDENT_HAVE_NOT_CLASS);
                }
              this.setState({checkClass: true});
            }
        }
    }

    updateAttendance(attendanceId, orderAttendance) {
        this.props.attendanceStudentActions.updateAttendanceStudent(attendanceId, this.props.token, orderAttendance);
    }

    popRouter(){
        Actions.pop();
        this.props.QRCodeActions.beginScanQRCode();
    }

    render() {
        return (
            <AttendanceStudentComponent
                isLoadingInfoStudent={this.props.isLoadingInfoStudent}
                isUpdatingAttendanceStudent={this.props.isUpdatingAttendanceStudent}
                student={this.state.student}
                onUpdateAttendance={this.updateAttendance}
                studentCode={this.props.studentCode}
                orderLessonCourse={this.props.orderLessonCourse}
                message={this.props.message}
                popRouter = {this.popRouter}
                openDrawer = {this.props.drawerActions.openDrawer}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.login.token,
        isLoadingInfoStudent: state.attendanceStudent.isLoadingInfoStudent,
        isUpdatingAttendanceStudent: state.attendanceStudent.isUpdatingAttendanceStudent,
        student: state.attendanceStudent.student,
        attendance: state.attendanceStudent.attendance,
        errorLoad: state.attendanceStudent.errorLoad,
        errorUpdate: state.attendanceStudent.errorUpdate,
        studentCode: state.attendanceStudent.studentCode,
        orderLessonCourse: state.lessonCourse.selectedLessonCourseId,
        message: state.attendanceStudent.message,
        classId: state.class.selectedClassId,
        classStudent: state.attendanceStudent.classStudent
    };
}

function mapDispatchToProps(dispatch) {
    return {
        attendanceStudentActions: bindActionCreators(attendanceStudentActions, dispatch),
        QRCodeActions: bindActionCreators(QRCodeActions, dispatch),
        drawerActions: bindActionCreators(drawerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceStudentContainer);