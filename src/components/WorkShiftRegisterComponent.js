import React from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  Image,
  Alert,
} from 'react-native';
import WorkShiftRegisterWeek from './workShiftRegister/WorkShiftRegisterWeek';
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
import {CustomPicker} from 'react-native-custom-picker';
import {Button, Text} from 'native-base';
import * as alert from '../constants/alert';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WorkShiftRegisterHoursReviewModal from './workShiftRegister/WorkShiftRegisterHoursReviewModal';
import {isIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper';
var {height, width} = Dimensions.get('window');
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DropdownPicker from './common/DropdownPicker';

class WorkShiftRegisterComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      index: 0,
      isVisible: false,
    };
  }

  renderShiftWeek = (index) => {
    return (
      <WorkShiftRegisterWeek
        week={this.props.workShiftRegisterData.weeks[index]}
        user={this.props.user}
        onRegister={this.props.onRegister}
        onUnregister={this.props.onUnregister}
      />
    );
  };

  showShift = (index) => {
    return (
      <View style={{marginBottom: 50}}>{this.renderShiftWeek(index)}</View>
    );
  };

  totalHours = (user) => {
    let total = 0;
    this.props.workShiftRegisterData.forEach((workShift) => {
      const subscribedUser = workShift.users.find(
        (subscriber) => subscriber.id === user.id,
      );
      if (subscribedUser) {
        const startTime = moment.unix(
          workShift.work_shift_session.start_time,
          'HH:mm',
        );
        const endTime = moment(workShift.work_shift_session.end_time, 'HH:mm');
        const hours = moment.duration(endTime.diff(startTime)).asHours();
        total += hours;
      }
    });
    return total;
  };

  setWeekIndex = (value, array) => {
    for (let i = 0; i < array.length; i++) {
      if (value === array[i]) {
        this.setState({index: i});
      }
    }
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

  setWeekIndexTest = (mode) => {
    if (mode === 'back') {
      if (this.state.index - 1 >= 0) {
        this.setState({index: this.state.index - 1});
      }
    }
    if (mode === 'next') {
      if (
        this.state.index + 1 <
        this.props.workShiftRegisterData.weeks.length
      ) {
        this.setState({index: this.state.index + 1});
      }
    }
  };

  render() {
    if (!this.props.isLoadingBases && !this.props.isLoadingWorkShiftRegister) {
      return (
        <View
          style={
            isIphoneX()
              ? {flex: 1, marginTop: getStatusBarHeight() + 10}
              : {flex: 1, marginTop: 20}
          }>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.props.isLoadingWorkShiftRegister}
                onRefresh={this.props.onRefresh}
              />
            }>
            <View style={styles.headerContainer}>
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Profile')}>
                  <Image
                    source={{uri: this.props.avatar_url}}
                    style={styles.headerAva}
                  />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Đăng ký làm việc</Text>
              </View>
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

            {/*<View style={styles.weekNavigatorContainer}>*/}
            {/*  <TouchableOpacity onPress={() => this.setWeekIndexTest('next')}>*/}
            {/*    <MaterialIcons*/}
            {/*      name={'navigate-before'}*/}
            {/*      color={'black'}*/}
            {/*      size={30}*/}
            {/*    />*/}
            {/*  </TouchableOpacity>*/}
            {/*  {this.props.workShiftRegisterData.weeks[this.state.index] && (*/}
            {/*    <View style={styles.dateContainer}>*/}
            {/*      <Text style={styles.bold}>*/}
            {/*        Tuần{' '}*/}
            {/*        {*/}
            {/*          this.props.workShiftRegisterData.weeks[this.state.index]*/}
            {/*            .week*/}
            {/*        }*/}
            {/*      </Text>*/}
            {/*      <Text>*/}
            {/*        {this.props.workShiftRegisterData.weeks[*/}
            {/*          this.state.index*/}
            {/*        ].dates[*/}
            {/*          this.props.workShiftRegisterData.weeks[this.state.index]*/}
            {/*            .dates.length - 1*/}
            {/*        ].date.slice(-10)}{' '}*/}
            {/*        -{' '}*/}
            {/*        {this.props.workShiftRegisterData.weeks[*/}
            {/*          this.state.index*/}
            {/*        ].dates[0].date.slice(-10)}*/}
            {/*      </Text>*/}
            {/*    </View>*/}
            {/*  )}*/}
            {/*  <TouchableOpacity onPress={() => this.setWeekIndexTest('back')}>*/}
            {/*    <MaterialIcons*/}
            {/*      name={'navigate-next'}*/}
            {/*      color={'black'}*/}
            {/*      size={30}*/}
            {/*    />*/}
            {/*  </TouchableOpacity>*/}
            {/*</View>*/}

            {/*{this.props.workShiftRegisterData.weeks.length > 0 &&*/}
            {/*!this.props.errorWorkShiftRegister ? (*/}
            {/*  <View style={{flex: 1}}>*/}
            {/*    <ScrollView>{this.showShift(this.state.index)}</ScrollView>*/}
            {/*    <WorkShiftRegisterHoursReviewModal*/}
            {/*      weekIndex={*/}
            {/*        this.props.workShiftRegisterData.weeks[this.state.index]*/}
            {/*          .week*/}
            {/*      }*/}
            {/*      isVisible={this.state.isVisible}*/}
            {/*      closeModal={() => this.toggleModal()}*/}
            {/*      dates={*/}
            {/*        this.props.workShiftRegisterData.weeks[this.state.index]*/}
            {/*          .dates*/}
            {/*      }*/}
            {/*    />*/}
            {/*  </View>*/}
            {/*) : (*/}
            {/*  <View>{this.errorData()}</View>*/}
            {/*)}*/}
          </ScrollView>
          <View style={styles.hoursContainer}>
            <View style={styles.hoursSubContainer}>
              <Image
                source={{uri: this.props.avatar_url}}
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
      return (
        <View style={styles.container}>
          <Spinkit
            isVisible
            color={theme.mainColor}
            type="Wave"
            size={width / 8}
          />
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerList: {
    borderTopColor: theme.borderColor,
    borderTopWidth: 1,
  },
  containerPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textError: {
    color: '#d9534f',
    textAlign: 'center',
  },
  switchGenBaseLoading: {
    marginTop: height * 0.05,
    alignItems: 'center',
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
    marginHorizontal: theme.mainHorizontal,
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
  headerIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  weekNavigatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  dateContainer: {
    alignItems: 'center',
  },
};

export default WorkShiftRegisterComponent;
