/**
 * Created by phanmduong on 4/7/17.
 */
import React from'react';
import {connect} from 'react-redux';
import EnterStudentCodeComponent from '../components/EnterStudentCodeComponent';
import * as enterStudentCodeActions from '../actions/enterStudentCodeActions';
import * as attendanceStudentActions from '../actions/attendanceStudentActions';
import {bindActionCreators} from 'redux';
import {Actions} from 'react-native-router-flux';

class EnterStudentCodeContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onPressEnterStudent = this.onPressEnterStudent.bind(this);
        this.updateStudentCodeForm = this.updateStudentCodeForm.bind(this);
    }

    onPressEnterStudent(){
        this.props.attendanceStudentActions.selectButtonEnterStudentCode(this.props.studentCodeForm);
        Actions.attendanceStudentCode();
    }

    updateStudentCodeForm(name, studentCodeForm){
        this.props.enterStudentCodeActions.updateDataStudentCodeForm(studentCodeForm);
    }

    render() {
        return (
            <EnterStudentCodeComponent
                onPressEnterStudent = {this.onPressEnterStudent}
                onChangeStudentCodeForm = {this.updateStudentCodeForm}
                studentCodeForm = {this.props.studentCodeForm}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        studentCodeForm: state.enterStudentCode.studentCodeForm
    };
}

function mapDispatchToProps(dispatch) {
    return {
        enterStudentCodeActions: bindActionCreators(enterStudentCodeActions, dispatch),
        attendanceStudentActions: bindActionCreators(attendanceStudentActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterStudentCodeContainer);