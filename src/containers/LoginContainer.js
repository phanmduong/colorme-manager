/**
 * Created by phanmduong on 4/5/17.
 */
import React from'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {Alert}from 'react-native';
import * as alert from '../constants/alert';
import LoginComponent from '../components/LoginComponent';

import {Actions} from 'react-native-router-flux';

import * as loginActions from '../actions/loginActions';
import * as drawerActions from '../actions/drawerActions';

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.updateFormData = this.updateFormData.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
        this.saveDataLogin = this.saveDataLogin.bind(this);
        this.state = {
            isAutoLogin: false
        }
    }

    componentWillMount(){
        this.props.loginActions.openSceneLogin();
        this.props.drawerActions.disableDrawer();
        this.props.loginActions.getDataLogin();
        this.setState({
            isAutoLogin: true
        });
    }

    saveDataLogin(){
        this.props.loginActions.setDataLogin(this.props.login);
    }

    updateFormData(name, value) {
        this.setState({
            isAutoLogin: false
        });
        let login = this.props.login;
        login[name] = value;
        this.props.loginActions.updateDataLoginForm(login);
    }

    onClickLogin() {
        if (this.props.login.username && this.props.login.password) {
            this.props.loginActions.loginUser(this.props.login);
            this.saveDataLogin();
        } else {
            Alert.alert(
                'Thông báo',
                alert.CHECK_INFO_LOGIN
            )
        }
    }

    componentWillReceiveProps(nextProps){
        if (!_.isUndefined(nextProps.token) && nextProps.token.trim().length > 0) {
            if (!nextProps.isLoading && !nextProps.error) {
                if (nextProps.user.role > 0){
                    Actions.drawer();
                }
                else {
                    Alert.alert(
                        'Thông báo',
                        alert.NO_STAFF
                    )
                }
            }
        }

        // if (nextProps.error){
        //     Alert.alert(
        //         'Thông báo',
        //         alert.CHECK_INFO_LOGIN
        //     )
        // }
        
        // if (!nextProps.isGettingData && !nextProps.isGetDataError && this.state.isAutoLogin){
        //     this.setState({
        //         isAutoLogin: false
        //     });
        //     if (nextProps.login.username && nextProps.login.password){
        //         nextProps.loginActions.loginUser(nextProps.login);
        //     }
        //
        // }
    }

    render() {
        return (
            <LoginComponent
                updateFormData={this.updateFormData}
                onClickLogin={this.onClickLogin}
                username={this.props.login.username}
                password={this.props.login.password}
                isLoading={this.props.isLoading}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        login: Object.assign({}, state.login.login),
        error: state.login.error,
        isLoading: state.login.isLoading,
        user: Object.assign({}, state.login.user),
        token: state.login.token,
        isGettingData: state.login.isGettingData,
        isGetDataError: state.login.isGetDataError,
        isSettingData: state.login.isSettingData,
        isSetDataError: state.login.isSetDataError
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
        drawerActions: bindActionCreators(drawerActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);