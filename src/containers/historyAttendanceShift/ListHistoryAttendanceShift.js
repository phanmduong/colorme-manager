/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {RefreshControl, View} from 'react-native';
import {observer} from 'mobx-react';
import ShiftRegisterDate from './ShiftRegisterDate';
import {List} from 'native-base';
import DateRangePicker from '../../components/common/DateRangePicker';
import theme from '../../styles';
import Loading from '../../components/common/Loading';
import EmptyMessage from '../../components/common/EmptyMessage';

@observer
class ListHistoryAttendanceShift extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  headerComponent = () => {
    const {startTime, endTime} = this.props.store;
    return (
      <DateRangePicker
        startDate={startTime}
        endDate={endTime}
        onSelectStartDate={this.props.onSelectStartTime}
        onSelectEndDate={this.props.onSelectEndTime}
        containerStyle={styles.container}
        mode={'filter'}
        apply={this.props.loadData}
      />
    );
  };

  render() {
    if (this.props.shiftType === 'work_shift') {
      const {listWorkShift, isLoading, error, refreshing} = this.props.store;
      return (
        <List
          ListHeaderComponent={this.headerComponent}
          dataArray={listWorkShift}
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.props.reload}
            />
          }
          renderRow={(date) => (
            <ShiftRegisterDate
              dateData={date}
              shiftType={this.props.shiftType}
            />
          )}
          ListEmptyComponent={
            isLoading ? (
              <Loading />
            ) : (
              (error || listWorkShift.length <= 0) && <EmptyMessage />
            )
          }
        />
      );
    } else if (this.props.shiftType === 'shift') {
      const {listShift, isLoading, error, refreshing} = this.props.store;
      return (
        <List
          ListHeaderComponent={this.headerComponent}
          dataArray={listShift}
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.props.reload}
            />
          }
          renderRow={(date) => (
            <ShiftRegisterDate
              dateData={date}
              shiftType={this.props.shiftType}
            />
          )}
          ListEmptyComponent={
            isLoading ? (
              <Loading />
            ) : (
              (error || listShift.length <= 0) && <EmptyMessage />
            )
          }
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
