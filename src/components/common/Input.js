import React from'react';
import {StyleSheet, TextInput} from 'react-native'

const Input = ({name, onChangeText, placeholder, value, secureTextEntry}) => {

    return (
        <TextInput
            style = {styles.textInput}
            onChangeText = {(text) => onChangeText(name, text)}
            value = {value}
            placeholder = {placeholder}
            secureTextEntry = {secureTextEntry}
        />
    );
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginHorizontal: 50,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        minWidth: 200
    }
});

export default Input;