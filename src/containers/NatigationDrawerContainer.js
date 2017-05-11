/**
 * Created by phanmduong on 4/26/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {Text, StatusBar, Platform} from 'react-native';
import {Drawer}from 'native-base';
import {bindActionCreators} from 'redux';
import SideBar from './SidebarContainer';
import material from '../native-base-theme/variables/material';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import * as drawerActions from '../actions/drawerActions';

class NatigationDrawerContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.drawerOpen){
            this.drawerOpen();
        } else {
            this.drawerClose();
        }
    }

    drawerOpen(){
        this._drawer._root.open();
    }

    drawerClose(){
        this._drawer._root.close();
    }

    render() {
        const state = this.props.navigationState;
        const children = state.children;
        return (
            <Drawer
                ref={(ref) => { this._drawer = ref; }}
                type="displace"
                onOpen={this.props.drawerActions.openDrawer}
                onClose={this.props.drawerActions.closeDrawer}
                side = {'right'}
                content={<SideBar />}
                tapToClose
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan
            >
                <StatusBar
                    hidden={(this.props.drawerOpen && Platform.OS === 'ios') ? true : false}
                    backgroundColor={material.statusBarColor}
                    barStyle={"light-content"}
                />
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(NatigationDrawerContainer);