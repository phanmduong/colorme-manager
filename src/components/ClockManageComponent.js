import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import theme from '../styles';
import ClockManageShiftContainer from '../containers/clockManage/ClockManageShiftContainer';
import LinearGradient from 'react-native-linear-gradient';
import ClockManageTeachingContainer from '../containers/clockManage/ClockManageTeachingContainer';

class ClockManageComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      week: [],
      tabIndex: 0,
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

  onSelectDate = (date) => {
    this.props.onSelectDate(date);
    this.props.loadShifts(date);
    this.props.loadClasses(date);
  };

  changeTab = (index) => {
    this.setState({tabIndex: index});
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
        <View style={styles.tabContainer}>
          <LinearGradient
            colors={
              this.state.tabIndex === 0
                ? ['#F6F6F6', '#F6F6F6']
                : ['#FFFFFF', '#FFFFFF']
            }
            style={styles.gradientSize}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <TouchableOpacity onPress={() => this.changeTab(0)}>
              <Text style={styles.tabText}>Trực</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={
              this.state.tabIndex === 1
                ? ['#F6F6F6', '#F6F6F6']
                : ['#FFFFFF', '#FFFFFF']
            }
            style={styles.gradientSize}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <TouchableOpacity onPress={() => this.changeTab(1)}>
              <Text style={styles.tabText}>Giảng dạy</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        {this.state.tabIndex === 0 ? <ClockManageShiftContainer /> : null}
        {this.state.tabIndex === 1 ? <ClockManageTeachingContainer /> : null}
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
};

export default ClockManageComponent;
