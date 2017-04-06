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

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);

        this.updateFormData = this.updateFormData.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
    }

    updateFormData(name, value) {
        let login = this.props.login;
        login[name] = value;
        this.props.loginActions.updateDataLoginForm(login);
    }

    onClickLogin() {
        this.props.loginActions.loginUser(this.props.login);
    }

    render() {
        if (!_.isUndefined(this.props.token) && this.props.token.trim().length > 0) {
            if (!this.props.isLoading && !this.props.error) {
                if (this.props.user.role > 0){
                    Actions.attendance();
                }
                else {
                    Alert.alert(
                        'Thông báo',
                        alert.NO_STAFF
                    )
                }
            }
        }

        if (this.props.error){
            Alert.alert(
                'Thông báo',
                alert.CHECK_INFO_LOGIN
            )
        }

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
        token: state.login.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);