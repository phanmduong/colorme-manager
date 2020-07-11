import React from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import theme from '../styles';
import ShiftClockItem from './clockManage/ShiftClockItem';
import Spinkit from 'react-native-spinkit';
import {convertTimeToSecond, isEmptyInput} from '../helper';
const {width, height} = Dimensions.get('window');

class ClockManageComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      week: [],
    };
  }

  componentDidMount = () => {
    this.setState({week: this.createWeek(new Date())});
  };

  createWeek = (dateData) => {
    let date = new Date(dateData);
    let week = [];
    for (let i = 1; i <= 7; i++) {
      let first;
      if (date.getDay() == 0) {
        first = date.getDate() - 7 + i;
      } else {
        first = date.getDate() - date.getDay() + i;
      }

      let day = new Date(date.setDate(first));
      week.push(day);
    }
    return week;
  };

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
    shifts.forEach((shift) => {
      if (shift.end_shift_time && shift.start_shift_time) {
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
    shifts.forEach((shift) => {
      if (shift.end_shift_time && shift.start_shift_time) {
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
    shifts.forEach((shift) => {
      if (shift.end_shift_time && shift.start_shift_time) {
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

  onSelectDate = (date) => {
    this.props.onSelectDate(date);
    this.props.loadShifts(date);
  };

  render() {
    let nameSelectedDate =
      moment.unix(this.props.selectedDate).locale('vi').format('dddd') +
      ' ' +
      moment.unix(this.props.selectedDate).locale('vi').format('L');
    nameSelectedDate =
      nameSelectedDate.charAt(0).toUpperCase() + nameSelectedDate.slice(1);
    return (
      <ScrollView style={styles.topContainer}>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Text style={styles.fullDateText}>{nameSelectedDate}</Text>
        </View>
        <View style={styles.weekAlign}>
          {this.state.week.map((date, index) => {
            let isSelectedDate =
              moment.unix(this.props.selectedDate).format('DD/MM/YYYY') ===
              moment(date).format('DD/MM/YYYY');
            return (
              <TouchableOpacity
                onPress={() => this.onSelectDate(moment(date).unix())}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.dateName}>
                    {index < 6 ? `T${index + 2}` : 'CN'}
                  </Text>
                  <View
                    style={
                      isSelectedDate
                        ? styles.selectedDateContainer
                        : styles.unselectedDateContainer
                    }>
                    <Text
                      style={
                        isSelectedDate
                          ? styles.selectedDateNumber
                          : styles.unselectedDateNumber
                      }>
                      {date.getDate()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        {this.props.isLoadingShifts ? (
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
        )}
      </ScrollView>
    );
  }
}

const styles = {
  list: {},
  topContainer: {
    flex: 1,
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: '#d9534f',
    textAlign: 'center',
  },
  fullDateText: {
    fontSize: 16,
    color: 'black',
  },
  weekAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: theme.mainHorizontal,
  },
  dateName: {
    color: 'black',
    fontSize: 13,
    marginBottom: 3,
  },
  selectedDateNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  unselectedDateNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: 'black',
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
  selectedDateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#69C655',
  },
  unselectedDateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DDDDDD',
  },
};

export default ClockManageComponent;
