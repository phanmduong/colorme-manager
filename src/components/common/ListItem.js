/**
 * Created by phanmduong on 4/6/17.
 */
import React from'react';
import {StyleSheet, TouchableHighlight, Text} from 'react-native'

const ButtonInput = ({rowData, onPress}) => {

    return (
        <TouchableHighlight onPress = {() => onPress(rowData.id)}>
            <Text>
                {rowData.name}
            </Text>
        </TouchableHighlight>
    );

};

const styles = StyleSheet.create({
});

export default ButtonInput;