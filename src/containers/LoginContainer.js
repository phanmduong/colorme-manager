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
import * as loginActions from '../actions/loginActions';
import * as autoLoginActions from '../actions/autoLoginActions';

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.updateFormData = this.updateFormData.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
        this.saveDataLogin = this.saveDataLogin.bind(this);
    }

    componentWillMount(){
        this.props.loginActions.getDataLogin();
    }

    saveDataLogin(){
        this.props.loginActions.setDataLogin(this.props.login);
    }

    updateFormData(name, value) {
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
                if (nextProps.user.role <= 0) {
                    Alert.alert(
                        'Thông báo',
                        alert.NO_STAFF
                    )
                }
            }
        }

        if (nextProps.error){
            Alert.alert(
                'Thông báo',
                alert.CHECK_INFO_LOGIN
            )
        }

        if (nextProps.isGetDataLocalSuccessful && nextProps.isAutoLogin) {
            nextProps.autoLoginActions.setAutoLogin(false);
            if (nextProps.login.username && nextProps.login.password){
                nextProps.loginActions.loginUser(nextProps.login);
            }
        }
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

LoginContainer.navigationOptions = {
    title: 'Đăng nhập',
};

function mapStateToProps(state) {
    return {
        login: state.login.login,
        error: state.login.error,
        isLoading: state.login.isLoading,
        user: state.login.user,
        token: state.login.token,
        isGetDataLocalSuccessful: state.login.isGetDataLocalSuccessful,
        isAutoLogin: state.autoLogin.isAutoLogin
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
        autoLoginActions: bindActionCreators(autoLoginActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);