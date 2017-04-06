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

    componentWillReceiveProps(nextProps){
        if (!_.isUndefined(nextProps.token) && nextProps.token.trim().length > 0) {
            if (!nextProps.isLoading && !nextProps.error) {
                if (nextProps.user.role > 0){
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

        if (nextProps.error){
            Alert.alert(
                'Thông báo',
                alert.CHECK_INFO_LOGIN
            )
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