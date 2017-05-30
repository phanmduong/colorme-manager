/**
 * Created by phanmduong on 4/6/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ClassComponent from '../components/ClassComponent';
import * as classActions from '../actions/classActions';
import {Actions} from 'react-native-router-flux';

class ClassContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onSelectedItem = this.onSelectedItem.bind(this);
    }


    onSelectedItem(classId) {
        this.props.classActions.selectedClassId(classId);
        Actions.listStudentClass();
    }

    render() {
        return (
            <ClassComponent
                classData={this.props.classData}
                onSelectedItem={this.onSelectedItem}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        classData: state.dashboard.dashboardData.classes,
        token: state.login.token,
        selectedClassId: state.class.selectedClassId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        classActions: bindActionCreators(classActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassContainer);