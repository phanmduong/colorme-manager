/**
 * Created by phanmduong on 4/6/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BaseComponent from '../components/BaseComponent';
import * as baseActions from '../actions/baseActions';
import * as drawerActions from '../actions/drawerActions';
import {Alert}from 'react-native';
import * as alert from '../constants/alert';
import {Actions} from 'react-native-router-flux';

class BaseContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onSelectedItem = this.onSelectedItem.bind(this);
    }

    componentWillMount(){
        this.props.baseActions.loadDataBase(this.props.token);
        this.props.drawerActions.enableDrawer();
    }

    onSelectedItem(baseId){
        this.props.baseActions.selectedBaseId(baseId);
        Actions.course();

    }

    componentWillReceiveProps(nextProps){
        if (nextProps.error) {
            Alert.alert('Thông báo', alert.LOAD_DATA_ERROR);
        }
    }

    render() {
        return (
            <BaseComponent
                baseData = {this.props.baseData}
                isLoading = {this.props.isLoading}
                onSelectedItem = {this.onSelectedItem}
                openDrawer = {this.props.drawerActions.openDrawer}
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
        selectedBaseId: state.base.selectedBaseId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        baseActions: bindActionCreators(baseActions, dispatch),
        drawerActions: bindActionCreators(drawerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseContainer);