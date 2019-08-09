import React from'react';
import {RefreshControl} from 'react-native';
import {
    View,
    Text,
    List
} from 'native-base';
import ShiftRegisterDate from './ShiftRegisterDate'
import theme from '../../styles';
import _ from 'lodash';

class ShiftRegisterWeek extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    shouldComponentUpdate(nextProps) {
        return (!_.isEqual(nextProps.weekData, this.props.weekData) ||
        !_.isEqual(nextProps.isLoadingShiftRegister, this.props.isLoadingShiftRegister));
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{'Tuần ' + this.props.weekData.week}</Text>
                <Text>{this.time()}</Text>
            </View>
        )
    }

    render() {
        return (
            <List
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.isLoadingShiftRegister}
                        onRefresh={this.props.loadDataShiftRegister}
                        titleColor={theme.mainColor}
                        title="Đang tải..."
                        tintColor='#d9534f'
                        colors={['#d9534f']}
                    />
                }

                renderHeader={() => this.renderHeader()}
                dataArray={this.props.weekData.dates}
                renderRow={
                    (date) => (
                        <ShiftRegisterDate
                            dateData={date}
                            user={this.props.user}
                            onRegister={this.props.onRegister}
                            onUnRegister={this.props.onUnRegister}
                        />
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