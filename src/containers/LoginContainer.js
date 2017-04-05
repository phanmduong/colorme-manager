/**
 * Created by phanmduong on 4/5/17.
 */
import React, {PropTypes}  from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginComponent from '../components/LoginComponent';
import {View, Text, TextInput, StyleSheet}from'react-native';

import * as loginActions from '../actions/loginActions';

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: {
                username: '',
                password: ''
            }
        };

        this.updateFormData = this.updateFormData.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            login: nextProps.login
        });
    }

    updateFormData(name, value) {
        let login = this.state.login;
        login[name] = value;
        this.props.loginActions.updateDataLoginForm(login);
    }

    onClickLogin() {
        console.log('Click');
    }

    render() {
        return (
            <LoginComponent
                updateFormData={this.updateFormData}
                onClickLogin={this.onClickLogin}
                username={this.state.login.username}
                password={this.state.login.password}

            />
        );
    }
}

// LoginContainer.propTypes = {
//     loginActions: PropTypes.object.isRequired,
//     user: PropTypes.object.isRequired,
//     isLoading: PropTypes.bool.isRequired,
//     error: PropTypes.bool.isRequired,
//     token: PropTypes.string.isRequired,
//     login: PropTypes.object.isRequired,
// };

function mapStateToProps(state) {
    return {login: state.login.login};
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);