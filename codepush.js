/**
 * Created by phanmduong on 4/26/17.
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './src/app';
import {View} from 'native-base';
import SplashScreen from 'react-native-splash-screen';

export default class ColorMEManager extends Component {
  constructor(props) {
    super(props);
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
