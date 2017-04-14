/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import App from './src/app'
import codePush from "react-native-code-push";

let codePushOptions = {updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE};

export default class ColorMEManager extends Component {
  render() {
    return (
      <App/>
    );
  }
}

// ColorMEManager = codePush(codePushOptions)(ColorMEManager);


AppRegistry.registerComponent('ColorMEManager', () => ColorMEManager);
