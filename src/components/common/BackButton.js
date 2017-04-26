/**
 * Created by phanmduong on 4/25/17.
 */
import React from 'react';
import {Button, FooterTab, Icon}from 'native-base';
import { Platform }from 'react-native';

const BackButton = (props) => (
    <Button
        style={{
            position: 'absolute',
            left: -2,
            bottom: (Platform.OS === 'ios') ? -7 : -9,
            height: (Platform.OS === 'ios') ? 45 : 60,
            backgroundColor: 'transparent',
            shadowColor: 'transparent',
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 0,
            shadowOpacity: 0,
            borderColor: 'transparent',
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
