import React from'react';
import {StyleSheet, View} from 'react-native';
import Input from './common/Input';
import Button from './common/Button';

class EnterStudentCodeComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View>
                <Input
                    onChangeText={this.props.onChangeStudentCodeForm}
                    value={this.props.studentCodeForm}
                    placeholder='Nhập mã học viên'
                />
                <Button
                    title='Tìm học viên'
                    onPress={this.props.onPressEnterStudent}
                />
            </View>
        )
    }
}

export default EnterStudentCodeComponent;