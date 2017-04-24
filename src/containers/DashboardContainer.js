/**
 * Created by phanmduong on 4/25/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Text} from 'react-native';
import * as drawerActions from '../actions/drawerActions';

class DashboardContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount(){
        this.props.drawerActions.enableDrawer();
    }

    render() {
        return (
            <Text>DashboardContainer</Text>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        drawerActions: bindActionCreators(drawerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);