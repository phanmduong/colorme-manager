import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {isEmptyInput} from '../../helper';
import ShiftClockItem from './ShiftClockItem';
import moment from 'moment';
import Spinkit from 'react-native-spinkit';
import theme from '../../styles';
const {width, height} = Dimensions.get('window');

class ClockManageShiftComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  groupShifts = (shifts) => {
    let shiftMap = {};
    if (!isEmptyInput(shifts)) {
      shifts.forEach((shift) => {
        const shiftName = `${shift.name}: (${shift.start_shift_time} - ${shift.end_shift_time})`;
        if (!(shiftName in shiftMap)) {
          shiftMap[shiftName] = [shift];
        } else {
          shiftMap[shiftName].push(shift);
        }
      });
    }
    return shiftMap;
  };

  renderShiftClockItems = (shiftMap) => {
    return Object.keys(shiftMap).map((key, index) => (
      <ShiftClockItem shiftName={key} shifts={shiftMap[key]} />
    ));
  };

  renderCurrentShifts = () => {
    let currentShifts = [];
    const {shifts} = this.props;
    if (shifts) {
      shifts.forEach((shift) => {
        if (shift.start_shift_time && shift.end_shift_time) {
          const currentTime = moment();
          const startTime = moment(
            moment.unix(this.props.selectedDate).format('YYYY-MM-DD') +
              ' ' +
              shift.start_shift_time,
          );
          const endTime = moment(
            moment.unix(this.props.selectedDate).format('YYYY-MM-DD') +
              ' ' +
              shift.end_shift_time,
          );
          if (currentTime.isAfter(startTime) && currentTime.isBefore(endTime)) {
            currentShifts.push(shift);
          }
        }
      });
    }

    if (currentShifts.length > 0) {
      const shiftMap = this.groupShifts(currentShifts);
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Đang diễn ra</Text>
          {this.renderShiftClockItems(shiftMap)}
        </View>
      );
    }
  };

  renderPastShifts = () => {
    let pastShifts = [];
    const {shifts} = this.props;
    if (shifts) {
      shifts.forEach((shift) => {
        if (shift.start_shift_time && shift.end_shift_time) {
          const currentTime = moment();
          const endTime = moment(
            moment.unix(this.props.selectedDate).format('YYYY-MM-DD') +
              ' ' +
              shift.end_shift_time,
          );
          if (currentTime.isAfter(endTime)) {
            pastShifts.push(shift);
          }
        }
      });
    }

    if (pastShifts.length > 0) {
      const shiftMap = this.groupShifts(pastShifts);
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Đã diễn ra</Text>
          {this.renderShiftClockItems(shiftMap)}
        </View>
      );
    }
  };

  renderFutureShifts = () => {
    let futureShifts = [];
    const {shifts} = this.props;
    if (shifts) {
      shifts.forEach((shift) => {
        if (shift.start_shift_time && shift.end_shift_time) {
          const currentTime = moment();
          const startTime = moment(
            moment.unix(this.props.selectedDate).format('YYYY-MM-DD') +
              ' ' +
              shift.start_shift_time,
          );
          if (currentTime.isBefore(startTime)) {
            futureShifts.push(shift);
          }
        }
      });
    }

    if (futureShifts.length > 0) {
      const shiftMap = this.groupShifts(futureShifts);
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Chưa diễn ra</Text>
          {this.renderShiftClockItems(shiftMap)}
        </View>
      );
    }
  };

  render() {
    return this.props.isLoadingShifts ? (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Spinkit
            isVisible
            color={theme.mainColor}
            type="Wave"
            size={width / 8}
          />
        </View>
      </View>
    ) : (
      <View>
        <View>{this.renderCurrentShifts()}</View>
        <View>{this.renderPastShifts()}</View>
        <View>{this.renderFutureShifts()}</View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: '#d9534f',
    textAlign: 'center',
  },
  sectionContainer: {
    flex: 1,
    marginHorizontal: theme.mainHorizontal,
    marginTop: 16,
  },
  sectionTitle: {
    fontWeight: theme.title.fontWeight,
    fontSize: theme.title.fontSize,
  },
};

export default ClockManageShiftComponent;
