/**
 * Created by phanmduong on 4/6/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AttendanceStudentComponent from '../components/AttendanceStudentComponent';
import * as attendanceStudentActions from '../actions/attendanceStudentActions';
import {Alert, Text}from 'react-native';
import * as alert from '../constants/alert';
import {Actions} from 'react-native-router-flux';

class AttendanceStudentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.updateAttendance = this.updateAttendance.bind(this);
    }

    componentWillMount() {
        this.props.attendanceStudentActions.loadInfoStudent(this.props.studentCode, this.props.token);
    }


    componentWillReceiveProps(nextProps){
        if (nextProps.errorLoad) {
            Alert.alert('Thông báo', alert.LOAD_DATA_ERROR);
        }
    }

    updateAttendance(attendanceId){

    }

    render() {
        return (
            <AttendanceStudentComponent
                isLoadingInfoStudent = {this.props.isLoadingInfoStudent}
                isUpdatingAttendanceStudent = {this.props.isUpdatingAttendanceStudent}
                student = {this.props.student}
                onUpdateAttendance = {this.updateAttendance}
                studentCode = {this.props.studentCode}
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
        studentCode: state.attendanceStudent.studentCode
    };
}

function mapDispatchToProps(dispatch) {
    return {
        attendanceStudentActions: bindActionCreators(attendanceStudentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceStudentContainer);