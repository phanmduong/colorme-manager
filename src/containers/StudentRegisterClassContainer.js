/**
 * Created by phanmduong on 6/16/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {Text} from 'react-native';
import {bindActionCreators} from 'redux';
import * as collectMoneyActions from '../actions/collectMoneyActions';
import StudentRegisterClassComponent from '../components/collectMoney/StudentRegisterClassComponent';

class StudentRegisterClassContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <StudentRegisterClassComponent
                student={this.props.student}
            />
        );
    }
}

StudentRegisterClassContainer.navigationOptions = {
    title: 'Lớp học đã đăng kí',
};

function mapStateToProps(state) {
    return {
        token: state.login.token,
        student: state.collectMoney.studentSelected,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        collectMoneyActions: bindActionCreators(collectMoneyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentRegisterClassContainer);