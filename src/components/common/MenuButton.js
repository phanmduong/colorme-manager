/**
 * Created by phanmduong on 4/25/17.
 */
import React from 'react';
import {Button, FooterTab, Icon}from 'native-base';
import { Platform }from 'react-native';
import theme from '../../styles';
const MenuButton = (props) => (
    <Button
        style={{
            position: 'absolute',
            right: -2,
            bottom: (Platform.OS === 'ios') ? -5 : -7,
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