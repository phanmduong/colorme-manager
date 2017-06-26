import React from'react';
import {StyleSheet, Text, View} from 'react-native';

class MoneyTransferComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View>
                <Text>
                    Money Transfer
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default MoneyTransferComponent;
