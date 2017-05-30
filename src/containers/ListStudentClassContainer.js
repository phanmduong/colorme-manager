/**
 * Created by phanmduong on 5/30/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {Text} from 'react-native';
import {bindActionCreators} from 'redux';
import * as listStudentClassActions from '../actions/listStudentClassActions';
import ListStudenClassComponent from '../components/ListStudenClassComponent';

class ListStudentClassContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onReload = this.onReload.bind(this);
    }

    componentWillMount() {
        this.onReload();
    }

    onReload() {
        this.props.listStudentClassActions
            .loadDataListStudentClass(this.props.selectedClassId, this.props.token);
    }

    render() {
        return (
            <ListStudenClassComponent
                listStudentClass={this.props.listStudentClassData}
                error={this.props.error}
                isLoading={this.props.isLoading}
                onReload={this.onReload}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.login.token,
        selectedClassId: state.class.selectedClassId,
        listStudentClassData: state.listStudentClass.listStudentClassData,
        isLoading: state.listStudentClass.isLoading,
        error: state.listStudentClass.error,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        listStudentClassActions: bindActionCreators(listStudentClassActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListStudentClassContainer);