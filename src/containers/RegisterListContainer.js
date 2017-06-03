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
        this.loadDataSearchRegisterList = this.loadDataSearchRegisterList.bind(this);
        this.updateSearchFrom = this.updateSearchFrom.bind(this);
    }

    componentWillMount() {
        this.loadDataRegisterList();
    }

    loadDataRegisterList() {
        this.props.registerListActions.loadDataRegisterList(this.props.page + 1, this.props.token);
    }

    loadDataSearchRegisterList() {
        this.props.registerListActions.loadDataSearchRegisterList(this.props.search, this.props.pageSearch + 1, this.props.token);
    }

    updateSearchFrom(search) {
        this.props.registerListActions.updateDateSearchRegisterListFrom(search);
    }

    render() {
        return (
            <RegisterListComponent
                registerList={this.props.registerListData}
                error={this.props.error}
                isLoading={this.props.isLoading}
                errorSearch={this.props.errorSearch}
                isSearchLoading={this.props.isSearchLoading}
                loadDataRegisterList={this.loadDataRegisterList}
                loadDataSearchRegisterList={this.loadDataSearchRegisterList}
                updateSearchFrom={this.updateSearchFrom}
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
        isSearchLoading: state.registerList.isSearchLoading,
        errorSearch: state.registerList.errorSearch,
        page: state.registerList.page,
        pageSearch: state.registerList.pageSearch,
        search: state.registerList.search,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerListActions: bindActionCreators(registerListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterList);