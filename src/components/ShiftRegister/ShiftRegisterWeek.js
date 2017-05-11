import React from'react';
import {StyleSheet} from 'react-native';
import {
    View,
    Text
} from 'native-base';
import ShiftRegisterDate from './ShiftRegisterDate'

class ShiftRegisterWeek extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View style={{backgroundColor: '#ff0400', flex: 1}}>
                <Text>{this.props.weekData.week}</Text>
                {
                    (this.props.weekData.dates.map((date, index) => {
                            return <ShiftRegisterDate dateData={date} key={index}/>
                        }
                    ))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default ShiftRegisterWeek;