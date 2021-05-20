/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import ShiftRegisterDate from './ShiftRegisterDate';
import {List} from 'native-base';
import DateRangePicker from '../../components/common/DateRangePicker';
import moment from 'moment';
import theme from '../../styles';

@observer
class ListHistoryAttendanceShift extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  headerComponent = () => {
    const {startTime, endTime} = this.props.store;
    return (
      <DateRangePicker
        startDate={startTime && moment.unix(startTime)}
        endDate={endTime && moment.unix(endTime)}
        onSelectStartDate={this.props.onSelectStartTime}
        onSelectEndDate={this.props.onSelectEndTime}
        containerStyle={styles.container}
        mode={'filter'}
        apply={this.props.loadData}
      />
    );
  };

  render() {
    const {listShift} = this.props.store;

    if (listShift.length > 0) {
      return (
        <List
          ListHeaderComponent={this.headerComponent}
          dataArray={listShift}
          renderRow={(date) => <ShiftRegisterDate dateData={date} />}
        />
      );
    }
    return <View />;
  }
}

const styles = {
  container: {
    flex: 1,
    marginHorizontal: theme.mainHorizontal,
    marginVertical: 10,
  },
};

export default ListHistoryAttendanceShift;
