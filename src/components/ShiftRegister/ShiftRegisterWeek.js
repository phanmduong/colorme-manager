import React from'react';
import {StyleSheet, ScrollView, Dimensions, Platform} from 'react-native';
import {
    View,
    Text,
    Card,
    Content,
    List,
    ListItem,
    Body
} from 'native-base';
import ShiftRegisterDate from './ShiftRegisterDate'
var {height, width} = Dimensions.get('window');
import theme from '../../styles'

class ShiftRegisterWeek extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    renderShiftRegisterDate() {

        if (Platform.OS === 'ios') {
            return (
                this.props.weekData.dates.map(
                    (date, index) => {
                        return (<ShiftRegisterDate dateData={date} key={index} user={this.props.user}/>)
                    })
            )
        }

        return (
            <List
                dataArray={this.props.weekData.dates}
                renderRow={
                    (date) => (
                        <ShiftRegisterDate dateData={date} user={this.props.user}/>
                    )
                }
            />
        )

    }

    time() {
        const startDate = this.props.weekData.dates[0].date;
        const endDate = this.props.weekData.dates[this.props.weekData.dates.length - 1].date;
        return startDate.substr(startDate.length - 10) + " - " + endDate.substr(endDate.length - 10);
    }

    render() {
        return (
            <View style={{width: width}}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{'Tuần ' + this.props.weekData.week}</Text>
                    <Text>{this.time()}</Text>
                </View>

                {this.renderShiftRegisterDate()}
            </View>

        );
    }
}

const styles = {
    header: {
        marginHorizontal: 8,
        padding: 5,
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 1,
        marginBottom: 5
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#d9534f'
    }
};

export default ShiftRegisterWeek;