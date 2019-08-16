/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {View} from 'react-native';

class Section extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View style={style.container}>
                {this.props.children}
            </View>
        );
    }
}

const style = {
    container: {
        marginBottom: 20,
        marginTop: 10
    }
};

export default (Section);
