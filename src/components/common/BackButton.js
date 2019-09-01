/**
 * Created by phanmduong on 4/25/17.
 */
import React from 'react';
import {Button, Icon} from 'native-base';
import {Platform, TouchableNativeFeedback} from 'react-native';
const ANDROID_VERSION_LOLLIPOP = 21;

const BackButton = props => (
  <Button
    style={{
      height: Platform.OS === 'ios' ? 45 : 60,
      backgroundColor: 'transparent',
      shadowColor: 'transparent',
      shadowOffset: {width: 0, height: 0},
      shadowRadius: 0,
      shadowOpacity: 0,
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 0,
      elevation: 0,
    }}
    onPress={() => props.onBack()}
    background={
      Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP
        ? TouchableNativeFeedback.Ripple('rgba(256, 256, 256, .32)', true)
        : null
    }
    delayPressIn={0}>
    <Icon
      name="menu"
      ios="ios-arrow-back"
      android="md-arrow-back"
      color="white"
      style={
        Platform.OS === 'ios' ? {fontSize: 31, marginLeft: -6} : {fontSize: 24}
      }
    />
  </Button>
);

export default BackButton;
