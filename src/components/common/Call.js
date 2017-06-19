import React from'react';
import {
    StyleSheet,
    Platform,
    TouchableOpacity,
    Text,
    View,
    Linking
} from 'react-native';
import {formatPhone} from '../../helper/index';

class Call extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        Linking.canOpenURL(this.props.url).then(supported => {
            if (supported) {
                Linking.openURL(this.props.url);
            } else {
                console.log('Don\'t know how to open : ' + this.props.url);
            }
        });
    };

    renderTextPhone() {
        return (
            <View>
                <Text style={styles.phone}>{formatPhone(this.props.phone)}</Text>
            </View>
        )
    }

    render() {
        return (
            <TouchableOpacity onPress={this.handleClick}>
                {this.renderTextPhone()}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    phone: {
        color: '#0087ff',
        fontSize: (Platform.isPad) ? 18 : 13
    },
});

export default Call;