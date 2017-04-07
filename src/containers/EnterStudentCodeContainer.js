/**
 * Created by phanmduong on 4/7/17.
 */
import React from'react';
import {connect} from 'react-redux';
import EnterStudentCodeComponent from '../components/EnterStudentCodeComponent';
import * as enterStudentCodeActions from '../actions/enterStudentCodeActions';
import {bindActionCreators} from 'redux';

class EnterStudentCodeContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onPressEnterStudent = this.onPressEnterStudent.bind(this);
        this.updateStudentCodeForm = this.updateStudentCodeForm.bind(this);
    }

    onPressEnterStudent(){
        this.props.enterStudentCodeActions.selectButtonEnterStudentCode(this.props.studentCodeForm);
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
        enterStudentCodeActions: bindActionCreators(enterStudentCodeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterStudentCodeContainer);