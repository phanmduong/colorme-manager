/**
 * Created by phanmduong on 4/5/17.
 */
import React from'react';
import {View, StyleSheet}from'react-native';
import Input from './common/Input';
import Button from './common/Button';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style = {styles.container}>
                <Input
                    onChangeText = {this.props.updateFormData}
                    value = {this.props.username}
                    placeholder = 'Tên đăng nhập'
                    secureTextEntry = {false}
                    name = 'username'
                />
                <Input
                    onChangeText = {this.props.updateFormData}
                    value = {this.props.password}
                    placeholder = 'Mật khẩu'
                    secureTextEntry
                    name = 'password'
                />
                <Button
                    title = 'Đăng nhập'
                    onPress = {this.props.onClickLogin}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default LoginComponent;