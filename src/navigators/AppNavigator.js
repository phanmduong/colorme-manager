/**
 * Created by phanmduong on 6/7/17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {StatusBar, View} from 'react-native';
import {addNavigationHelpers, StackNavigator} from 'react-navigation';
import {routeConfigs, navigationOptions} from './AppRouteConfigs';
import material from '../native-base-theme/variables/material';

export const AppNavigator = StackNavigator(routeConfigs, navigationOptions);

const AppWithNavigationState = ({dispatch, nav, statusBar}) => (
    <View style={{flex: 1}}>
        <StatusBar
            backgroundColor={material.statusBarColor}
            barStyle={statusBar.color}
        />
        <AppNavigator navigation={addNavigationHelpers({dispatch, state: nav})}/>
    </View>
);

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    nav: state.nav,
    statusBar: state.statusBar
});

export default connect(mapStateToProps)(AppWithNavigationState);