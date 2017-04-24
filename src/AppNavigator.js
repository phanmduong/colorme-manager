import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StyleSheet, StatusBar} from 'react-native';
import {StyleProvider, Drawer}from 'native-base';
import getTheme from 'native-base/src/theme/components';
import material from './theme/variables/material';
import Router from './routes';
import SideBar from './containers/SidebarContainer';

import * as drawerActions from './actions/drawerActions';

class AppNavigator extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Drawer
                    ref={(ref) => { this._drawer = ref; }}
                    content={<SideBar navigator={this._navigator}/>}
                    acceptPan
                    panOpenMask={0.4}
                    side = {'right'}
                    panCloseMask={0.5}
                    openDrawerOffset={0.2}
                    panThreshold={0.1}
                    disabled={this.props.drawerDisable}
                    open={this.props.drawerOpen}
                    onOpen={()=>this.props.drawerActions.openDrawer()}
                    onClose={()=>this.props.drawerActions.closeDrawer()}
                >
                    <StatusBar
                        backgroundColor={material.statusBarColor}
                        barStyle={this.props.drawerDisable ? "default" : "light-content"}
                    />
                    <Router/>
                </Drawer>
            </StyleProvider>

        );
    }
}

const styles = {
};

function mapStateToProps(state) {
    return {
        drawerOpen: state.drawer.drawerOpen,
        drawerDisable: state.drawer.drawerDisable,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        drawerActions: bindActionCreators(drawerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);