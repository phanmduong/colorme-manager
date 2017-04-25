/**
 * Created by phanmduong on 4/25/17.
 */
import React from 'react';
import {Button, FooterTab, Icon}from 'native-base';
import { Platform }from 'react-native';
import theme from '../../styles';
const BackButton = (props) => (
    <Button
        style={{
            position: 'absolute',
            left: -2,
            bottom: (Platform.OS === 'ios') ? -7 : -9,
            height: (Platform.OS === 'ios') ? 45 : 60,
            backgroundColor: theme.mainColor,
            shadowColor: theme.mainColor,
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 0,
            shadowOpacity: 0,
            borderColor: theme.mainColor,
            borderWidth: 0,
            borderRadius: 0,
            elevation: 0
        }}
        onPress={props.onBack}
    >
        <Icon
            name="menu"
            ios="ios-arrow-back"
            android="md-arrow-back"
            color='white'
        />
    </Button>
);

export default BackButton;
