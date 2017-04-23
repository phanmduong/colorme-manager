import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StyleSheet, StatusBar} from 'react-native';
import {StyleProvider}from 'native-base';
import Drawer from 'react-native-drawer';
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
                    styles={styles.drawer}
                    ref={(ref) => { this._drawer = ref; }}
                    content={<SideBar/>}
                    acceptPan
                    panOpenMask={0.4}
                    side = {'right'}
                    panCloseMask={0.5}
                    openDrawerOffset={0.2}
                    type = {'overlay'}
                    panThreshold={0.1}
                    disabled={this.props.drawerDisable}
                    open={this.props.drawerOpen}
                    onOpen={()=>this.props.drawerActions.openDrawer()}
                    onClose={()=>this.props.drawerActions.closeDrawer()}
                    tweenHandler={(ratio) => ({
                        main: { opacity:(2-ratio)/2 }
                    })}
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

const styles = {
    drawer: {
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 3
    }
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