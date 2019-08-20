/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {connect} from 'react-redux';
import Store from "./Store";
import {observer} from "mobx-react";
import StoreMeetingComponent from "./StoreMeetingComponent";

@observer
class StoreMeetingContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new Store(props.token);
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Tạo cuộc họp'
    });

    render() {
        return (
            <StoreMeetingComponent store={this.store} {...this.props}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.login.token,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreMeetingContainer);