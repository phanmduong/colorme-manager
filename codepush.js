/**
 * Created by phanmduong on 4/26/17.
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './src/app';
import {View} from 'native-base';
import OneSignal from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';

export default class ColorMEManager extends Component {
  constructor(props) {
    super(props);
    OneSignal.init('02640883-e837-44b2-8b53-2d9c1a9c797e');
    OneSignal.sendTags({device_type: 'mobile_manage'});
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <App />
      </View>
    );
  }
}

AppRegistry.registerComponent('ColorMEManager', () => ColorMEManager);
