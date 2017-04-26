import React from'react';
import {StatusBar, View} from 'react-native';
import {StyleProvider}from 'native-base';
import getTheme from 'native-base/src/theme/components';
import material from './theme/variables/material';
import Router from './routes';

class AppNavigator extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <View style={{flex: 1}}>
                    <StatusBar
                        backgroundColor={material.statusBarColor}
                        barStyle={"default"}
                    />
                    <Router/>
                </View>
            </StyleProvider>

        );
    }
}

export default AppNavigator;