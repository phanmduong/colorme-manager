/**
 * Created by phanmduong on 6/7/17.
 */
import React, {PropTypes} from 'react';
import {BackHandler, Linking} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {routeConfigs, navigationOptions} from './navigators/AppRouteConfigs';
import OneSignal from "react-native-onesignal";

export const AppNavigator = StackNavigator(routeConfigs, navigationOptions);

class AppNav extends React.Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
        this.handleUrl = this.handleUrl.bind(this);
        this.onOpened = this.onOpened.bind(this);
        this.onReceived = this.onReceived.bind(this);
    }

    shouldCloseApp(nav) {

        return nav.index === 0;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    componentWillMount() {
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('registered', this.onRegistered);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('registered', this.onRegistered);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onOpened(openResult) {
        console.log("openResult", openResult);
        this.handleUrl(openResult.notification.payload.launchURL);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onRegistered(notifData) {
        console.log("Device had been registered for push notifications!", notifData);
    }

    onIds(device) {
        console.log('Device info: ', device);
    }

    handleBack() {
        const {dispatch, nav} = this.props;
        console.log(nav);
        if (this.shouldCloseApp(nav)) return false;
        dispatch({
            type: 'Navigation/BACK'
        });
        return true;
    }

    handleUrl(url) {
        const
            {navigation} = this.props,
            {dispatch} = navigation,
            uriPrefix = 'colormemanage://';
        let path = url.split(uriPrefix)[1];
        if (!path) {
            path = url;
        }
        console.log(navigation);

        const action = AppNavigator.router.getActionForPathAndParams(path);
        console.log(path);

        if (action) {
            console.log(action);
            dispatch(action);
        }
    }

    componentDidMount() {
        Linking.addEventListener('url', ({url}: { url: string }) => {
            this.handleUrl(url);
        });

        Linking.getInitialURL().then(
            (url: string) => url && this.handleUrl(url)
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    render() {
        return (
            <AppNavigator navigation={this.props.navigation}/>

        );
    }
}


export default AppNav;