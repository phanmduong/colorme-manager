/**
 * Created by phanmduong on 6/7/17.
 */
import React from 'react';
import {StatusBar, View, BackHandler} from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator,
  NavigationActions,
} from 'react-navigation';
import {routeConfigs, navigationOptions} from './AppRouteConfigs';
import material from '../native-base-theme/variables/material';

const MainNavigation = createSwitchNavigator(routeConfigs, navigationOptions);

const previousGetActionForPathAndParams =
  MainNavigation.router.getActionForPathAndParams;

Object.assign(MainNavigation.router, {
  getActionForPathAndParams(path: string, params: any) {
    const isAuthLink = path.startsWith('auth-link');

    if (isAuthLink) {
      return NavigationActions.navigate({
        routeName: 'AuthLoading',
        params: {...params, path},
      });
    }

    return previousGetActionForPathAndParams(path, params);
  },
});

export const AppNavigator = createAppContainer(MainNavigation);

const prefix = 'colorme-manager://';

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
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor={material.statusBarColor}
          barStyle={material.iosStatusbar}
        />
        <AppNavigator uriPrefix={prefix} />
      </View>
    );
  }
}

export default AppWithNavigationState;
