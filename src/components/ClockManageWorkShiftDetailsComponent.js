import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import WorkShiftClockDate from './clockManage/WorkShiftClockDate';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../styles';
import Spinkit from 'react-native-spinkit';
const {width, height} = Dimensions.get('window');

class ClockManageWorkShiftDetailsComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      week: [],
    };
  }

  componentDidMount = () => {
    const {selectedDate} = this.props;
    this.setState({
      week: this.createWeek(new Date(selectedDate * 1000)),
    });
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

  nextWeek = () => {
    const lastDate = new Date(this.state.week[6]);
    this.setState({
      week: this.createWeek(lastDate.setDate(lastDate.getDate() + 2)),
    });
  };

  previousWeek = () => {
    const firstDate = new Date(this.state.week[0]);
    this.setState({
      week: this.createWeek(firstDate.setDate(firstDate.getDate() - 2)),
    });
  };

  onSelectDate = (date) => {
    this.props.onSelectDate(date);
    this.props.loadWorkShifts(date);
  };

  renderWorkShift = () => {
    const {selectedEmployee} = this.props;
    if (selectedEmployee && selectedEmployee.work_shifts) {
      return <WorkShiftClockDate shifts={selectedEmployee.work_shifts} />;
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.emptyShiftsText}>Không có ca làm việc</Text>
        </View>
      );
    }
  };

  render() {
    let nameSelectedDate =
      moment.unix(this.props.employeeSelectedDate).locale('vi').format('dddd') +
      ' ' +
      moment.unix(this.props.employeeSelectedDate).locale('vi').format('L');
    nameSelectedDate =
      nameSelectedDate.charAt(0).toUpperCase() + nameSelectedDate.slice(1);
    return (
      <ScrollView style={styles.topContainer}>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Text style={styles.fullDateText}>{nameSelectedDate}</Text>
        </View>
        <View style={styles.weekAlign}>
          <TouchableOpacity onPress={this.previousWeek}>
            <Icon name={'keyboard-arrow-left'} color={'#000000'} size={34} />
          </TouchableOpacity>
          {this.state.week.map((date, index) => {
            let isSelectedDate =
              moment
                .unix(this.props.employeeSelectedDate)
                .format('DD/MM/YYYY') === moment(date).format('DD/MM/YYYY');
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
          <TouchableOpacity onPress={this.nextWeek}>
            <Icon name={'keyboard-arrow-right'} color={'#000000'} size={34} />
          </TouchableOpacity>
        </View>
        {this.props.isLoadingWorkShiftData ? (
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
          <View style={styles.workShiftContainer}>
            {this.renderWorkShift()}
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
  workShiftContainer: {
    marginTop: 20,
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
  tabContainer: {
    marginTop: 20,
    flexDirection: 'row',
    paddingHorizontal: theme.mainHorizontal,
  },
  gradientSize: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 104,
    height: 35,
    borderRadius: 24,
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
  emptyShiftsText: {
    color: '#777777',
  },
};

export default ClockManageWorkShiftDetailsComponent;
