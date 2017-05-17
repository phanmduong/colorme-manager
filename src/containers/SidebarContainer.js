/**
 * Created by phanmduong on 4/14/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SidebarComponent from '../components/SidebarComponent';
import {Actions} from 'react-native-router-flux';
import * as drawerActions from '../actions/drawerActions';

class SideBar extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.drawerActions.closeDrawer();
        // setTimeout(() => {
            Actions.login();
        // }, 480);

    }

    render() {
        return (
            <SidebarComponent
                logout = {this.logout}
                user = {this.props.user}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        drawerActions: bindActionCreators(drawerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);