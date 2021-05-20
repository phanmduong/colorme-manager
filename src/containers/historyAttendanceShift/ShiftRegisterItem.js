import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import {calculatorAttendance} from '../../helper';
import theme from '../../styles';
import {observer} from 'mobx-react';
import moment from 'moment';

@observer
class ShiftRegisterItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {shift} = this.props;
    const data = this.getTimeAttendance(shift);
    return (
      <View style={styles.register}>
        <Text style={styles.titleShift}>
          {shift.work_shift.work_shift_session.name}
        </Text>
        {this.progressAttendance(data)}
        <View style={styles.timeAttendance}>
          <Text>
            {shift.check_in ? (
              <Text style={{color: 'black'}}>
                {moment
                  .unix(shift.check_in.time)
                  .utcOffset('+0700')
                  .format('HH:mm')}
              </Text>
            ) : (
              <Text style={styles.textTime}>--:--</Text>
            )}
            <Text style={styles.textTime}>
              /
              {moment
                .unix(shift.work_shift.work_shift_session.start_time)
                .utcOffset('+0700')
                .format('HH:mm')}
            </Text>
          </Text>
          <Text>
            {shift.check_out ? (
              <Text style={{color: 'black'}}>
                {moment
                  .unix(shift.check_out.time)
                  .utcOffset('+0700')
                  .format('HH:mm')}
              </Text>
            ) : (
              <Text style={styles.textTime}>--:--</Text>
            )}
            <Text style={styles.textTime}>
              /
              {moment
                .unix(shift.work_shift.work_shift_session.end_time)
                .utcOffset('+0700')
                .format('HH:mm')}
            </Text>
          </Text>
        </View>
      </View>
    );
  }

  getTimeAttendance(shift) {
    const checkInTime = shift.check_in
      ? moment.unix(shift.check_in.time).utcOffset('+0700').format('HH:mm')
      : '';
    const checkOutTime = shift.check_out
      ? moment.unix(shift.check_out.time).utcOffset('+0700').format('HH:mm')
      : '';
    const startTime = moment
      .unix(shift.work_shift.work_shift_session.start_time)
      .utcOffset('+0700')
      .format('HH:mm');
    const endTime = moment
      .unix(shift.work_shift.work_shift_session.end_time)
      .utcOffset('+0700')
      .format('HH:mm');

    return calculatorAttendance(checkInTime, checkOutTime, startTime, endTime);
  }

  progressAttendance(data) {
    return (
      <View style={styles.progressBar}>
        <View
          style={{
            ...styles.emptyArriveSpan,
            width: data.empty_arrive_span + '%',
          }}
        />
        <View
          style={{
            ...styles.earlyArriveSpan,
            width: data.early_arrive_span + '%',
          }}
        />
        <View
          style={{...styles.lateArriveSpan, width: data.late_arrive_span + '%'}}
        />
        <View
          style={{...styles.teachingSpan, width: data.teaching_span + '%'}}
        />
        <View
          style={{...styles.earlyLeaveSpan, width: data.early_leave_span + '%'}}
        />
        <View
          style={{...styles.lateLeaveSpan, width: data.late_leave_span + '%'}}
        />
      </View>
    );
  }
}

const heightProgress = 6;
const borderProgress = heightProgress / 2;

const styles = {
  register: {
    backgroundColor: '#FFF',
    marginVertical: 5,
    padding: 5,
    borderRadius: 3,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
  },
  titleShift: {
    color: 'blank',
    textAlign: 'left',
  },
  emptyArriveSpan: {
    backgroundColor: 'transparent',
  },
  progressBar: {
    width: '100%',
    backgroundColor: '#e9e9e9',
    flexDirection: 'row',
    height: heightProgress,
    marginVertical: 5,
    borderRadius: borderProgress,
  },
  earlyArriveSpan: {
    backgroundColor: theme.warningColor,
    borderBottomLeftRadius: borderProgress,
    borderTopLeftRadius: borderProgress,
  },
  lateArriveSpan: {
    backgroundColor: theme.dangerColor,
  },
  teachingSpan: {
    backgroundColor: theme.successColor,
  },
  earlyLeaveSpan: {
    backgroundColor: theme.dangerColor,
  },
  lateLeaveSpan: {
    backgroundColor: theme.warningColor,
    borderBottomRightRadius: borderProgress,
    borderTopRightRadius: borderProgress,
  },
  noCheckoutSpan: {
    backgroundColor: theme.warningColor,
  },
  timeAttendance: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  textTime: {
    color: '#898989',
  },
};

export default ShiftRegisterItem;
