/**
 * Created by phanmduong on 4/25/17.
 */
import React from 'react';
import {Button, FooterTab, Icon}from 'native-base';
import { Platform }from 'react-native';

const MenuButton = (props) => (
    <Button
        style={{
            position: 'absolute',
            right: -2,
            bottom: (Platform.OS === 'ios') ? -5 : -7,
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
        onPress={props.onRight}
    >
        <Icon
            name="menu"
            ios="ios-menu"
            android="md-menu"
            color='white'
        />
    </Button>
);

export default MenuButton;