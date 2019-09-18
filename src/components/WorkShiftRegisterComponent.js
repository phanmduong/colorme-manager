import React from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  Alert,
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
var {height, width} = Dimensions.get('window');

class WorkShiftRegisterComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      index: 0,
      isVisible: false,
    };
  }

  renderShiftWeek = () => {
    return this.props.workShiftRegisterData.weeks.map(week => (
      <WorkShiftRegisterWeek
        week={week}
        user={this.props.user}
        onRegister={this.props.onRegister}
        onUnregister={this.props.onUnregister}
      />
    ));
  };

  showShift = () => {
    return (
      <Swiper
        height={3350}
        loop={false}
        showsPagination={false}
        key={this.props.workShiftRegisterData.weeks.length}
        onIndexChanged={index => this.setState({index: index})}>
        {this.renderShiftWeek()}
      </Swiper>
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
        colors={['#E26800', '#E00000']}
        style={styles.gradientSize}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <Text style={{color: 'white'}}>Khóa {getLabel(defaultText)}</Text>
        )}
        {selectedItem && (
          <Text style={{color: 'white'}}>Khóa {getLabel(selectedItem)}</Text>
        )}
      </LinearGradient>
    );
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
        colors={['#E26800', '#E00000']}
        style={styles.gradientSize}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <Text style={{color: 'white'}}>{getLabel(defaultText)}</Text>
        )}
        {selectedItem && (
          <Text style={{color: 'white'}}>{getLabel(selectedItem)}</Text>
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

      return (
        <View style={{flex: 1}}>
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
              }}
            />
            <TouchableOpacity onPress={this.toggleModal}>
              <LinearGradient
                colors={['#E26800', '#E00000']}
                style={styles.gradientSize}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={{color: 'white'}}>Thống kê</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {this.props.workShiftRegisterData.weeks.length > 0 &&
          !this.props.errorWorkShiftRegister ? (
            <View style={{flex: 1}}>
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
                {this.showShift()}
              </ScrollView>
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
              <WorkShiftRegisterHoursReviewModal
                weekIndex={
                  this.props.workShiftRegisterData.weeks[this.state.index].week
                }
                isVisible={this.state.isVisible}
                closeModal={() => this.toggleModal()}
                dates={
                  this.props.workShiftRegisterData.weeks[this.state.index].dates
                }
              />
            </View>
          ) : (
            <View>{this.errorData()}</View>
          )}
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
};

export default WorkShiftRegisterComponent;
