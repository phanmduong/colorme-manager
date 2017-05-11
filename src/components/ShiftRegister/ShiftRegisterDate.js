import React from'react';
import {StyleSheet} from 'react-native'
import {
    View,
    Text
} from 'native-base';

class ShiftRegisterDate extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    renderShiftItem() {
        return this.props.dateData.shifts.map((shift, index) => {
            if (shift.user) {
                return (
                    <View key={index}>
                        <Text>{shift.user.name}</Text>
                    </View>
                )
            } else {
                return (
                    <View key={index}>
                        <Text>{shift.name + ": " + shift.start_time + " - " + shift.end_time}</Text>
                    </View>
                )
            }
        });

    }

    render() {
        return (
            <View>
                <Text>{this.props.dateData.date}</Text>
                {this.renderShiftItem()}
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default ShiftRegisterDate;