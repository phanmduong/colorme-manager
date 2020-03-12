import React from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';
import WorkShiftRegisterWeek from './workShiftRegister/WorkShiftRegisterWeek';
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
import {CustomPicker} from 'react-native-custom-picker';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Text} from 'native-base';
import * as alert from '../constants/alert';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WorkShiftRegisterHoursReviewModal from './workShiftRegister/WorkShiftRegisterHoursReviewModal';
import {isIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper';
var {height, width} = Dimensions.get('window');

class WorkShiftRegisterComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      index: 0,
      isVisible: false,
      resetIndex: false,
    };
  }

  renderShiftWeek = index => {
    return (
      <WorkShiftRegisterWeek
        week={this.props.workShiftRegisterData.weeks[index]}
        user={this.props.user}
        onRegister={this.props.onRegister}
        onUnregister={this.props.onUnregister}
      />
    );
  };

  showShift = index => {
    return (
      <View style={{marginBottom: 50}}>{this.renderShiftWeek(index)}</View>
    );
  };

  totalHours = (index, user) => {
    let total = 0;
    for (
      let i = 0;
      i < this.props.workShiftRegisterData.weeks[index].dates.length;
      i++
    ) {
      for (
        let j = 0;
        j <
        this.props.workShiftRegisterData.weeks[index].dates[i].shifts.length;
        j++
      ) {
        for (
          let k = 0;
          k <
          this.props.workShiftRegisterData.weeks[index].dates[i].shifts[j].users
            .length;
          k++
        ) {
          if (
            this.props.workShiftRegisterData.weeks[index].dates[i].shifts[j]
              .users[k].id === user.id
          ) {
            total++;
          }
        }
      }
    }
    return total;
  };

  renderCoursePickerField = settings => {
    const {selectedItem, defaultText, getLabel} = settings;
    return (
      <LinearGradient
        colors={['white', 'white']}
        style={styles.gradientSize}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <Text style={{color: 'black', fontSize: 16}}>
            Khóa {getLabel(defaultText)} ▼
          </Text>
        )}
        {selectedItem && (
          <Text style={{color: 'black', fontSize: 16}}>
            Khóa {getLabel(selectedItem)} ▼
          </Text>
        )}
      </LinearGradient>
    );
  };

  setWeekIndex = (value, array) => {
    for (let i = 0; i < array.length; i++) {
      if (value === array[i]) {
        this.setState({index: i});
      }
    }
  };

  renderCoursePickerOption = settings => {
    const {item, getLabel} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>Khóa {getLabel(item)}</Text>
      </View>
    );
  };

  renderCoursePickerHeader = () => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>Chọn khóa học</Text>
      </View>
    );
  };

  renderCoursePickerFooter(action) {
    return (
      <TouchableOpacity
        style={styles.headerFooterContainer}
        onPress={action.close.bind(this)}>
        <Text style={{color: '#C50000', fontSize: 19}}>Hủy</Text>
      </TouchableOpacity>
    );
  }

  renderBasePickerHeader = () => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>Chọn cơ sở</Text>
      </View>
    );
  };

  renderBasePickerField = settings => {
    const {selectedItem, defaultText, getLabel} = settings;
    return (
      <LinearGradient
        colors={['white', 'white']}
        style={styles.gradientSize}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <Text style={{color: 'black', fontSize: 16}}>
            {getLabel(defaultText)} ▼
          </Text>
        )}
        {selectedItem && (
          <Text style={{color: 'black', fontSize: 16}}>
            {getLabel(selectedItem)} ▼
          </Text>
        )}
      </LinearGradient>
    );
  };

  renderBasePickerOption = settings => {
    const {item, getLabel} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>{getLabel(item)}</Text>
      </View>
    );
  };

  renderWeekPickerOption = settings => {
    const {item} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>{item}</Text>
      </View>
    );
  };

  renderWeekPickerHeader = () => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>Chọn tuần</Text>
      </View>
    );
  };

  renderWeekPickerField = settings => {
    const {selectedItem, defaultText} = settings;
    let weekOptions = [];
    for (
      let i = this.props.workShiftRegisterData.weeks.length - 1;
      i >= 0;
      i--
    ) {
      weekOptions.push('Tuần ' + (i + 1));
    }
    return (
      <LinearGradient
        colors={['white', 'white']}
        style={styles.gradientSize}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <Text style={{color: 'black', fontSize: 16}}>{defaultText} ▼</Text>
        )}
        {selectedItem && !this.state.resetIndex ? (
          <Text style={{color: 'black', fontSize: 16}}>{selectedItem} ▼</Text>
        ) : (
          <Text style={{color: 'black', fontSize: 16}}>{weekOptions[0]} ▼</Text>
        )}
      </LinearGradient>
    );
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

  greenBarLength = index => {
    let barLen = 0;
    let totalHours = this.totalHours(index, this.props.user);
    if (totalHours > 20) {
      barLen = width - 20;
    } else {
      barLen = (width - 20) * (totalHours / 20);
    }
    return barLen;
  };

  greenBar = () => {
    return {
      width: this.greenBarLength(this.state.index),
      height: 8,
      borderRadius: 6,
      backgroundColor: '#00B241',
    };
  };

  toggleModal = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  render() {
    if (
      this.props.workShiftRegisterData &&
      this.props.workShiftRegisterData.weeks
    ) {
      let courseOptions = [];
      for (let i = 0; i < this.props.genData.length; i++) {
        courseOptions.push(this.props.genData[i]);
      }

      let baseOptions = [];
      for (let i = 0; i < this.props.baseData.length; i++) {
        baseOptions.push(this.props.baseData[i]);
      }

      let weekOptions = [];
      for (
        let i = this.props.workShiftRegisterData.weeks.length - 1;
        i >= 0;
        i--
      ) {
        weekOptions.push('Tuần ' + (i + 1));
      }

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
                titleColor={theme.mainColor}
                title="Đang tải..."
                tintColor="#d9534f"
                colors={['#d9534f']}
              />
            }>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Profile')}>
                <Image
                  source={{uri: this.props.avatar_url}}
                  style={styles.headerAva}
                />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Đăng ký làm việc</Text>
            </View>
            <View style={styles.containerPicker}>
              <CustomPicker
                options={courseOptions}
                defaultValue={courseOptions[0]}
                getLabel={item => item.name}
                modalAnimationType={'fade'}
                optionTemplate={this.renderCoursePickerOption}
                fieldTemplate={this.renderCoursePickerField}
                headerTemplate={this.renderCoursePickerHeader}
                footerTemplate={this.renderCoursePickerFooter}
                modalStyle={{
                  borderRadius: 6,
                }}
                onValueChange={value => {
                  this.props.onSelectGenId(value.id);
                  this.setState({index: 0, resetIndex: true});
                }}
              />
              <CustomPicker
                options={baseOptions}
                defaultValue={baseOptions[0]}
                getLabel={item => item.name}
                modalAnimationType={'fade'}
                optionTemplate={this.renderBasePickerOption}
                fieldTemplate={this.renderBasePickerField}
                headerTemplate={this.renderBasePickerHeader}
                footerTemplate={this.renderCoursePickerFooter}
                modalStyle={{
                  borderRadius: 6,
                }}
                onValueChange={value => {
                  this.props.onSelectBaseId(value.id);
                  this.setState({index: 0, resetIndex: true});
                }}
              />
              <CustomPicker
                options={weekOptions}
                defaultValue={weekOptions[0] ? weekOptions[0] : ' '}
                modalAnimationType={'fade'}
                optionTemplate={this.renderWeekPickerOption}
                fieldTemplate={this.renderWeekPickerField}
                headerTemplate={this.renderWeekPickerHeader}
                footerTemplate={this.renderCoursePickerFooter}
                modalStyle={{
                  borderRadius: 6,
                }}
                onValueChange={value => {
                  this.setWeekIndex(value, weekOptions);
                  this.setState({resetIndex: false});
                }}
              />
            </View>
            <View style={[styles.containerPicker, {marginTop: 5}]}>
              <TouchableOpacity onPress={this.toggleModal}>
                <LinearGradient
                  colors={['#E26800', '#E00000']}
                  style={styles.gradientSize}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <Text style={{color: 'white'}}>Thống kê</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ListDetailShiftsRegistered', {
                    week: this.props.workShiftRegisterData.weeks[
                      this.state.index
                    ].week,
                    dates: this.props.workShiftRegisterData.weeks[
                      this.state.index
                    ].dates,
                  })
                }>
                <LinearGradient
                  colors={['#E26800', '#E00000']}
                  style={styles.gradientSize}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <Text style={{color: 'white'}}>Chi tiết</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            {this.props.workShiftRegisterData.weeks.length > 0 &&
            !this.props.errorWorkShiftRegister ? (
              <View style={{flex: 1}}>
                <ScrollView>{this.showShift(this.state.index)}</ScrollView>
                <WorkShiftRegisterHoursReviewModal
                  weekIndex={
                    this.props.workShiftRegisterData.weeks[this.state.index]
                      .week
                  }
                  isVisible={this.state.isVisible}
                  closeModal={() => this.toggleModal()}
                  dates={
                    this.props.workShiftRegisterData.weeks[this.state.index]
                      .dates
                  }
                />
              </View>
            ) : (
              <View>{this.errorData()}</View>
            )}
          </ScrollView>
          {this.props.workShiftRegisterData.weeks.length > 0 &&
          !this.props.errorWorkShiftRegister ? (
            <View style={styles.hoursContainer}>
              <View style={styles.hoursText}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                  Tổng thời gian
                </Text>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  {this.totalHours(this.state.index, this.props.user)}H/20H
                </Text>
              </View>
              <View style={styles.grayBar}>
                <View style={this.greenBar()} />
              </View>
            </View>
          ) : null}
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
  gradientSize: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginLeft: 10,
  },
  headerFooterContainer: {
    padding: 10,
    alignItems: 'center',
  },
  headerFooterText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
  },
  options: {
    marginVertical: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginHorizontal: 20,
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
  hoursText: {
    flexDirection: 'row',
    paddingBottom: 5,
    justifyContent: 'space-between',
  },
  grayBar: {
    backgroundColor: '#CFD0CF',
    height: 8,
    borderRadius: 6,
    width: width - 20,
  },
  headerContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: theme.mainTextColor,
    fontSize: theme.header.fontSize,
    fontWeight: theme.header.fontWeight,
    marginLeft: 10,
  },
  headerAva: theme.mainAvatar,
};

export default WorkShiftRegisterComponent;
