/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {observer} from 'mobx-react';
import TeachingClass from './TeachingClass';
import {List} from 'native-base';
import DateRangePicker from '../../components/common/DateRangePicker';
import moment from 'moment';
import theme from '../../styles';
import Loading from '../../components/common/Loading';
import EmptyMessage from '../../components/common/EmptyMessage';

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
    const {listAttendance, isLoading, error} = this.props.store;

    return (
      <List
        ListHeaderComponent={this.headerComponent}
        dataArray={listAttendance}
        contentContainerStyle={{flexGrow: 1}}
        renderRow={(classData, index) => (
          <TeachingClass classData={classData} key={index} />
        )}
        ListEmptyComponent={
          isLoading ? (
            <Loading />
          ) : (
            (error || listAttendance.length <= 0) && <EmptyMessage />
          )
        }
      />
    );
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
