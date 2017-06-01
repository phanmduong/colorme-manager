/**
 * Created by phanmduong on 6/1/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {Text} from 'react-native';
import {bindActionCreators} from 'redux';
import * as registerListActions from '../actions/registerListActions';
import RegisterListComponent from '../components/RegisterListComponent';

class RegisterList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadDataRegisterList = this.loadDataRegisterList.bind(this);
    }

    componentWillMount() {
        this.loadDataRegisterList();
    }

    loadDataRegisterList() {
        this.props.registerListActions.loadDataRegisterList(this.props.page + 1, this.props.token);
    }

    render() {
        return (
            <RegisterListComponent
                registerList={this.props.registerListData}
                error={this.props.error}
                isLoading={this.props.isLoading}
                loadDataRegisterList={this.loadDataRegisterList}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.login.token,
        registerListData: state.registerList.registerListData,
        isLoading: state.registerList.isLoading,
        error: state.registerList.error,
        page: state.registerList.page,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerListActions: bindActionCreators(registerListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterList);