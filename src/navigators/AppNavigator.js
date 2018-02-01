/**
 * Created by phanmduong on 6/7/17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {StatusBar, View} from 'react-native';
import {addNavigationHelpers} from 'react-navigation';
import material from '../native-base-theme/variables/material';
import AppNav from "../AppNav";


class AppWithNavigationState extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {dispatch, nav, statusBar} = this.props;
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor={material.statusBarColor}
                    barStyle={statusBar.color}
                />
                <AppNav navigation={addNavigationHelpers({dispatch, state: nav})}/>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
    statusBar: state.statusBar
});

export default connect(mapStateToProps)(AppWithNavigationState);