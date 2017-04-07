/**
 * Created by phanmduong on 4/7/17.
 */
import React from'react';
import {connect} from 'react-redux';
import ChooseEnterStudentComponent from '../components/ChooseEnterStudentComponent';
import * as chooseEnterStudentActions from '../actions/chooseEnterStudentActions';
import {bindActionCreators} from 'redux';

class ChooseEnterStudentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onSelectEnterStudent = this.onSelectEnterStudent.bind(this);
    }

    onSelectEnterStudent(enterStudentId){
        console.log(enterStudentId);
    }

    render() {
        return (
            <ChooseEnterStudentComponent
                onSelectEnterStudent = {this.onSelectEnterStudent}
                dataList = {this.props.dataListChooseEnterStudent}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        dataListChooseEnterStudent: state.chooseEnterStudent.dataListChooseEnterStudent
    };
}

function mapDispatchToProps(dispatch) {
    return {
        chooseEnterStudentActions: bindActionCreators(chooseEnterStudentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseEnterStudentContainer);