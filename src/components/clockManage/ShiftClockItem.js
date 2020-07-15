import React from 'react';
import {View, Text} from 'react-native';
import theme from '../../styles';
import {convertTimeToSecond} from '../../helper';

class ShiftClockItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  checkInOutSpan = (shift) => {
    let data = {
      checkInBackgroundColor: '#999999',
      checkOutBackgroundColor: '#999999',
    };

    if (shift.start_shift_time && shift.check_in_time) {
      const check_in_time = convertTimeToSecond(shift.check_in_time);
      const start_shift_time = convertTimeToSecond(shift.start_shift_time);
      if (check_in_time <= start_shift_time) {
        data.checkInBackgroundColor = '#69C655';
      } else {
        data.checkInBackgroundColor = '#E53223';
      }
    }

    if (shift.end_shift_time && shift.check_out_time) {
      const check_out_time = convertTimeToSecond(shift.check_out_time);
      const end_shift_time = convertTimeToSecond(shift.end_shift_time);
      if (check_out_time >= end_shift_time) {
        data.checkOutBackgroundColor = '#69C655';
      } else {
        data.checkOutBackgroundColor = '#E53223';
      }
    }

    return data;
  };

  renderItem = () => {
    const {shifts} = this.props;
    return shifts.map((shift) => {
      const checkInOutSpan = this.checkInOutSpan(shift);
      return (
        <View style={styles.checkInOutContainer}>
          <Text style={styles.shiftInfo}>
            {shift.base && shift.base.name ? shift.base.name : null}:{' '}
            {shift.staff && shift.staff.name ? shift.staff.name : 'Không có ai'}
          </Text>
          <View style={styles.checkInOutRow}>
            <View
              style={[
                styles.checkInOutInfoContainer,
                {
                  marginRight: 10,
                  backgroundColor: checkInOutSpan.checkInBackgroundColor,
                },
              ]}>
              <Text style={styles.checkInOutTime}>
                {shift.check_in_time ? shift.check_in_time : 'Chưa check in'}
              </Text>
            </View>
            <View
              style={[
                styles.checkInOutInfoContainer,
                {backgroundColor: checkInOutSpan.checkOutBackgroundColor},
              ]}>
              <Text style={styles.checkInOutTime}>
                {shift.check_out_time ? shift.check_out_time : 'Chưa check out'}
              </Text>
            </View>
          </View>
        </View>
      );
    });
  };

  render() {
    const {shiftName} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.shiftName}>{shiftName ? shiftName : null}</Text>
        {this.renderItem()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: 16,
  },
  shiftName: theme.title,
  shiftInfo: {
    color: 'black',
  },
  checkInOutContainer: {
    marginTop: 5,
  },
  checkInOutRow: {
    flexDirection: 'row',
  },
  checkInOutInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginTop: 5,
  },
  checkInOutTime: {
    color: 'white',
  },
};

export default ShiftClockItem;
