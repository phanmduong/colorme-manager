import React from'react';
import {StyleSheet, StatusBar, Platform, Text,View } from 'react-native';
import {StyleProvider}from 'native-base';
import Drawer from 'react-native-drawer';
import getTheme from 'native-base/src/theme/components';
import material from './theme/variables/material';
import Router from './routes';
import SideBar from './containers/SideBar';

class AppNavigator extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Drawer
                    ref={(ref) => { this._drawer = ref; }}
                    content={<SideBar/>}
                    acceptPan
                    panOpenMask={0.4}
                    side = {'right'}
                    panCloseMask={0.5}
                    openDrawerOffset={0.2}
                    type = {'static'}
                    panThreshold={0.1}
                >
                    <StatusBar
                        backgroundColor={material.statusBarColor}
                    />
                    <Router/>
                </Drawer>
            </StyleProvider>

        );
    }
}

const styles = StyleSheet.create({});

export default AppNavigator;