/**
 * Created by phanmduong on 4/24/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {Text} from 'react-native';

class ShiftRegisterContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Text>ShiftRegisterContainer</Text>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftRegisterContainer);