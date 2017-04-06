/**
 * Created by phanmduong on 4/6/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BaseComponent from '../components/BaseComponent';
import * as baseActions from '../actions/baseActions';
import {Alert}from 'react-native';
import * as alert from '../constants/alert';
import {Actions} from 'react-native-router-flux';

class BaseContainer extends React.Component {
    constructor(props) {
        super(props);
        this.props.baseActions.loadDataBase(this.props.token);
        this.onSelectedItem = this.onSelectedItem.bind(this);
    }

    onSelectedItem(baseId){
        this.props.baseActions.selectedBaseId(baseId);
        Actions.course();

    }

    render() {
        if (this.props.error) {
            Alert.alert('Thông báo', alert.LOAD_DATA_ERROR);
        }

        return (
            <BaseComponent
                baseData = {this.props.baseData}
                isLoading = {this.props.isLoading}
                onSelectedItem = {this.onSelectedItem}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.base.isLoading,
        baseData: state.base.baseData,
        error: state.base.error,
        token: state.login.token,
        selectedBaseID: state.base.selectedBaseID
    };
}

function mapDispatchToProps(dispatch) {
    return {
        baseActions: bindActionCreators(baseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseContainer);