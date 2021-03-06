/**
 * Created by phanmduong on 4/6/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AttendanceStudentComponent from '../components/AttendanceStudentComponent';
import * as attendanceStudentActions from '../actions/attendanceStudentActions';
import * as QRCodeActions from '../actions/QRCodeActions';
import {Alert, BackHandler} from 'react-native';
import * as alert from '../constants/alert';
import BackButton from '../components/common/BackButton';

let self;

class AttendanceStudentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.updateAttendance = this.updateAttendance.bind(this);
        this.state = {
            checkClass: false
        };
        this.popRouter = this.popRouter.bind(this);
        this.onLoadDataStudent = this.onLoadDataStudent.bind(this);
        self = this;
        this.handleBack = this.handleBack.bind(this);
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        title: 'Điểm danh học viên',
        headerLeft: (<BackButton onBack={() => self.popRouter()}/>),
    });

    componentWillMount() {
        this.onLoadDataStudent();
    }

    onLoadDataStudent() {
        this.props.attendanceStudentActions.loadInfoStudent(this.props.studentCode, this.props.token);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.errorUpdate) {
            Alert.alert('Thông báo', alert.ATTENDANCE_ERROR);
        }

        if (nextProps.statusRequestUpdated === 200) {
            Alert.alert('Thông báo',
                alert.ATTENDANCE_SUCCESSFUL,
                [{text: 'Đồng ý', onPress: self.popRouter}],
                {cancelable: false}
            );
        }

        if (!nextProps.isLoadingInfoStudent) {
            if (nextProps.classStudent.id && nextProps.classStudent.id !== nextProps.classId) {
                if (!this.state.checkClass) {
                    Alert.alert('Thông báo', alert.STUDENT_HAVE_NOT_CLASS);
                }
                this.setState({checkClass: true});
            }
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    handleBack() {
        this.popRouter();
        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    popRouter() {
        this.props.QRCodeActions.beginScanQRCode();
        this.props.navigation.goBack();
    }

    updateAttendance(attendanceId) {
        this.props.attendanceStudentActions.updateAttendanceStudent(attendanceId, this.props.token);
    }

    render() {
        return (
            <AttendanceStudentComponent
                isLoadingInfoStudent={this.props.isLoadingInfoStudent}
                isUpdatingAttendanceStudent={this.props.isUpdatingAttendanceStudent}
                student={this.props.student}
                onUpdateAttendance={this.updateAttendance}
                studentCode={this.props.studentCode}
                orderLessonCourse={this.props.orderLessonCourse}
                messageError={this.props.messageError}
                onReload={this.onLoadDataStudent}
                error={this.props.errorLoad}
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
        orderLessonCourse: state.currentClassStudy.selectedCurrentClassStudy.lesson.order,
        message: state.attendanceStudent.message,
        classId: state.currentClassStudy.selectedCurrentClassStudy.id,
        classStudent: state.attendanceStudent.classStudent,
        statusRequestUpdated: state.attendanceStudent.statusRequestUpdated,
        messageError: state.attendanceStudent.messageError
    };
}

function mapDispatchToProps(dispatch) {
    return {
        attendanceStudentActions: bindActionCreators(attendanceStudentActions, dispatch),
        QRCodeActions: bindActionCreators(QRCodeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceStudentContainer);