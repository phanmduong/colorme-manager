import React from'react';
import {StyleSheet, Button} from 'react-native'

const ButtonInput = ({title, onPress}) => {

    return (
        <Button
            color = '#ff1600'
            title = {title}
            onPress = {onPress}
        />
    );

};

const styles = StyleSheet.create({
    buttonInput:{
        color: '#ff1600',
        minWidth: 200,
        marginBottom: 10,
        padding: 10
    }
});

export default ButtonInput;