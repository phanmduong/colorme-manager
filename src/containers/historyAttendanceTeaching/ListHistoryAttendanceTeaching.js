/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import TeachingClass from './TeachingClass';
import {List} from 'native-base';
import DateRangePicker from '../../components/common/DateRangePicker';
import moment from 'moment';
import theme from '../../styles';

@observer
class ListHistoryAttendanceTeaching extends React.Component {
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
    const {listAttendance} = this.props.store;

    if (listAttendance.length > 0) {
      return (
        <List
          ListHeaderComponent={this.headerComponent}
          dataArray={listAttendance}
          renderRow={(classData, index) => (
            <TeachingClass classData={classData} key={index} />
          )}
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

export default ListHistoryAttendanceTeaching;
