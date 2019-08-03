import React from 'react';
import {
    View,
    Text,
    List
} from 'native-base';
import _ from 'lodash';
import {getFirstDayOfWeek, getLastDayOfWeek, groupBy} from "../../helper";
import moment from 'moment';
import ShiftRegisterDate from "./ShiftRegisterDate";
import {observer} from "mobx-react";

@observer
class ShiftRegisterWeek extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    // shouldComponentUpdate(nextProps) {
    //     return (!_.isEqual(nextProps.weekData, this.props.weekData));
    // }

    renderHeader() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{'Tuần ' + this.props.weekData.week}</Text>
                <Text>{this.time(this.props.weekData.shifts[0].date)}</Text>
            </View>
        )
    }

    convertData = () => {
        return _.sortBy(groupBy(this.props.weekData.shifts, shift => shift.date, ["date", "shifts"]), shift => shift.shifts[0].datetime);
    };

    render() {

        const data = this.convertData();

        return (
            <List
                renderHeader={() => this.renderHeader()}
                dataArray={data}
                renderRow={
                    (date) => (
                        <ShiftRegisterDate dateData={date}/>
                    )
                }
            />
        )

    }

    time(dateData) {
        const strDate = dateData.substr(dateData.length - 10);
        const date = new Date(strDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
        const startDate = moment(getFirstDayOfWeek(date));
        const endDate = moment(getLastDayOfWeek(date));
        return startDate.format("DD/MM/YYYY") + ' - ' + endDate.format("DD/MM/YYYY");
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