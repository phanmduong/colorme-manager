/**
 * Created by phanmduong on 6/7/17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {StatusBar, View, BackHandler} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {routeConfigs, navigationOptions} from './AppRouteConfigs';
import material from '../native-base-theme/variables/material';
import {createStackNavigator} from 'react-navigation-stack';

export const AppNavigator = createAppContainer(
  createStackNavigator(routeConfigs, navigationOptions),
);

class AppWithNavigationState extends React.Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
  }

  shouldCloseApp(nav) {
    return nav.index === 0;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBack);
  }

  handleBack() {
    const {dispatch, nav} = this.props;
    console.log(nav);
    if (this.shouldCloseApp(nav)) {
      return false;
    }
    dispatch({
      type: 'Navigation/BACK',
    });
    return true;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
  }

  render() {
    const {dispatch, nav, statusBar} = this.props;
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor={material.statusBarColor}
          barStyle={statusBar.color}
        />
        {/*<AppNavigator navigation={addNavigationHelpers({dispatch, state: nav})}/>*/}
        <AppNavigator />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  statusBar: state.statusBar,
});

export default connect(mapStateToProps)(AppWithNavigationState);
