import React from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import theme from '../styles';
import {Button, List, Text} from 'native-base';
import * as alert from '../constants/alert';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WorkShiftRegisterHoursReviewModal from './workShiftRegister/WorkShiftRegisterHoursReviewModal';
import {isIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper';
var {height, width} = Dimensions.get('window');
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DropdownPicker from './common/DropdownPicker';
import DateRangePicker from './common/DateRangePicker';
import Loading from './common/Loading';
import {groupBy} from '../helper';
import WorkShiftRegisterDate from './workShiftRegister/WorkShiftRegisterDate';

class WorkShiftRegisterComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      index: 0,
      isVisible: false,
    };
  }

  renderShiftByDate = (item) => {
    return (
      <WorkShiftRegisterDate
        date={item.date}
        shifts={item.shifts}
        user={this.props.user}
        onRegister={this.props.onRegister}
        onUnregister={this.props.onUnregister}
      />
    );
  };

  totalHours = (user) => {
    let total = 0;
    this.props.workShiftRegisterData.forEach((workShift) => {
      const subscribedUser = workShift.users.find(
        (subscriber) => subscriber.id === user.id,
      );
      if (subscribedUser) {
        const startTime = moment.unix(workShift.work_shift_session.start_time);
        const endTime = moment.unix(workShift.work_shift_session.end_time);
        const hours = moment.duration(endTime.diff(startTime)).asHours();
        total += hours;
      }
    });
    return total;
  };

  errorData() {
    return (
      <View style={{marginTop: height * 0.3, alignItems: 'center'}}>
        <Text style={styles.textError}>
          {this.props.errorWorkShiftRegister
            ? alert.LOAD_DATA_ERROR
            : alert.NO_DATA_WORK_SHIFT_REGISTER}
        </Text>
        <Button
          iconLeft
          danger
          small
          onPress={this.props.onRefresh}
          style={{marginTop: 10, alignSelf: null}}>
          <MaterialCommunityIcons name="reload" color="white" size={20} />
          <Text>Thử lại</Text>
        </Button>
      </View>
    );
  }

  greenBarLength = () => {
    let barLen;
    let totalHours = this.totalHours(this.props.user);
    if (totalHours > 20) {
      barLen = width - 80;
    } else {
      barLen = (width - 80) * (totalHours / 20);
    }
    return barLen;
  };

  greenBar = () => {
    return {
      width: this.greenBarLength(),
      height: 8,
      borderRadius: 6,
      backgroundColor: '#32CA41',
    };
  };

  toggleModal = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  headerComponent = () => {
    return (
      <>
        <View style={styles.headerContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Image
                source={{uri: this.props.user.avatar_url}}
                style={styles.headerAva}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Đăng ký làm việc</Text>
          </View>

          {/*TODO: Work shift reports*/}

          {/*<View style={styles.row}>*/}
          {/*  <TouchableOpacity onPress={this.toggleModal}>*/}
          {/*    <View style={[styles.headerIconContainer, {marginRight: 10}]}>*/}
          {/*      <Entypo name={'bar-graph'} size={20} color={'black'} />*/}
          {/*    </View>*/}
          {/*  </TouchableOpacity>*/}
          {/*  <TouchableOpacity*/}
          {/*    onPress={() =>*/}
          {/*      this.props.navigation.navigate(*/}
          {/*        'ListDetailShiftsRegistered',*/}
          {/*        {*/}
          {/*          week: this.props.workShiftRegisterData.weeks[*/}
          {/*            this.state.index*/}
          {/*          ].week,*/}
          {/*          dates: this.props.workShiftRegisterData.weeks[*/}
          {/*            this.state.index*/}
          {/*          ].dates,*/}
          {/*        },*/}
          {/*      )*/}
          {/*    }>*/}
          {/*    <View style={styles.headerIconContainer}>*/}
          {/*      <MaterialCommunityIcons*/}
          {/*        name={'information'}*/}
          {/*        size={20}*/}
          {/*        color={'black'}*/}
          {/*      />*/}
          {/*    </View>*/}
          {/*  </TouchableOpacity>*/}
          {/*</View>*/}
        </View>
        <View style={styles.containerPicker}>
          <DropdownPicker
            options={this.props.baseData}
            selectedId={this.props.selectedBaseId}
            onChangeValue={this.props.onSelectBaseId}
          />
        </View>
        <DateRangePicker
          endDate={this.props.endTime}
          startDate={this.props.startTime}
          onSelectEndDate={this.props.onSelectEndTime}
          onSelectStartDate={this.props.onSelectStartTime}
          apply={this.props.onRefresh}
          mode={'filter'}
          containerStyle={styles.datePicker}
        />
      </>
    );
  };

  render() {
    if (!this.props.isLoadingBases) {
      const workShifts = groupBy(
        this.props.workShiftRegisterData,
        (workShift) => workShift.date,
        ['date', 'shifts'],
      );
      return (
        <View
          style={
            isIphoneX()
              ? {flex: 1, marginTop: getStatusBarHeight() + 10}
              : {flex: 1, marginTop: 20}
          }>
          <List
            dataArray={workShifts}
            contentContainerStyle={{flexGrow: 1, marginHorizontal: 16}}
            renderRow={this.renderShiftByDate}
            refreshControl={
              <RefreshControl
                refreshing={this.props.refreshing}
                onRefresh={this.props.onRefresh}
              />
            }
            ListHeaderComponent={this.headerComponent}
            ListEmptyComponent={
              this.props.isLoadingWorkShiftRegister && <Loading />
            }
          />

          {/*  /!*TODO: Render work shift dates instead of weeks*!/*/}

          {/*  /!*{this.props.workShiftRegisterData.weeks.length > 0 &&*!/*/}
          {/*  /!*!this.props.errorWorkShiftRegister ? (*!/*/}
          {/*  /!*  <View style={{flex: 1}}>*!/*/}
          {/*  /!*    <ScrollView>{this.showShift(this.state.index)}</ScrollView>*!/*/}
          {/*  /!*    <WorkShiftRegisterHoursReviewModal*!/*/}
          {/*  /!*      weekIndex={*!/*/}
          {/*  /!*        this.props.workShiftRegisterData.weeks[this.state.index]*!/*/}
          {/*  /!*          .week*!/*/}
          {/*  /!*      }*!/*/}
          {/*  /!*      isVisible={this.state.isVisible}*!/*/}
          {/*  /!*      closeModal={() => this.toggleModal()}*!/*/}
          {/*  /!*      dates={*!/*/}
          {/*  /!*        this.props.workShiftRegisterData.weeks[this.state.index]*!/*/}
          {/*  /!*          .dates*!/*/}
          {/*  /!*      }*!/*/}
          {/*  /!*    />*!/*/}
          {/*  /!*  </View>*!/*/}
          {/*  /!*) : (*!/*/}
          {/*  /!*  <View>{this.errorData()}</View>*!/*/}
          {/*  /!*)}*!/*/}
          <View style={styles.hoursContainer}>
            <View style={styles.hoursSubContainer}>
              <Image
                source={{uri: this.props.user.avatar_url}}
                style={styles.hoursAva}
              />
              <View>
                <View style={styles.hoursTextContainer}>
                  <Text style={styles.hoursText}>Bạn đã đăng kí</Text>
                  <Text style={styles.hoursText}>
                    {this.totalHours(this.props.user)}H/20H
                  </Text>
                </View>
                <View style={styles.grayBar}>
                  <View style={this.greenBar()} />
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return <Loading />;
    }
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textError: {
    color: '#d9534f',
    textAlign: 'center',
  },
  hoursContainer: {
    backgroundColor: 'white',
    width: width,
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
  },
  hoursSubContainer: {
    flexDirection: 'row',
    paddingBottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hoursTextContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  hoursText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  grayBar: {
    backgroundColor: '#CFD0CF',
    height: 8,
    borderRadius: 6,
    width: width - 80,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: theme.mainTextColor,
    fontSize: theme.header.fontSize,
    fontWeight: theme.header.fontWeight,
    marginLeft: 10,
  },
  hoursAva: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerAva: theme.mainAvatar,
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePicker: {
    marginTop: 5,
  },
};

export default WorkShiftRegisterComponent;
