/**
 * Created by phanmduong on 4/14/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

class SideBar extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View>
                <Text>dsajkldsa</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);