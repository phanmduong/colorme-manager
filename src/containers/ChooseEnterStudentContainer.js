/**
 * Created by phanmduong on 4/7/17.
 */
import React from'react';
import {connect} from 'react-redux';
import ChooseEnterStudentComponent from '../components/ChooseEnterStudentComponent';
import * as chooseEnterStudentActions from '../actions/chooseEnterStudentActions';
import {bindActionCreators} from 'redux';
import {Actions} from 'react-native-router-flux';

class ChooseEnterStudentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onSelectEnterStudent = this.onSelectEnterStudent.bind(this);
    }

    onSelectEnterStudent(enterStudentId){
        switch (enterStudentId){
            case 0:
                Actions.scanQRCode();
                break;
            case 1:
                Actions.enterStudentCode();
                break;
            case 2:
                break;
            default:
                break;
        }
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