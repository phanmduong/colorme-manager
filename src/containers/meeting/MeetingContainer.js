/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {connect} from 'react-redux';
import MeetingStore from "./MeetingStore";
import {observer} from "mobx-react";
import MeetingComponent from "./MeetingComponent";

@observer
class MeetingContainer extends React.Component {
    constructor(props) {
        super(props);
        this.store = new MeetingStore(props.token);
    }

    componentDidMount() {
        this.store.loadList();
    }

    render() {
        return (
            <MeetingComponent store={this.store}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MeetingContainer);