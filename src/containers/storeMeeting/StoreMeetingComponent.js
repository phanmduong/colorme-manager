/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {observer} from 'mobx-react';
import {Form, Input, InputGroup, Item, Picker} from 'native-base';
import theme from '../../styles';
import DateTimePicker from 'react-native-modal-datetime-picker';
import withStyle from '../../components/HOC/withStyle';
import Loading from '../../components/common/Loading';
import LinearGradient from 'react-native-linear-gradient';
import MultiSelect from './MultiSelect/react-native-multi-select';
import {isEmptyInput} from '../../helper';
import Spinkit from 'react-native-spinkit';

var {height, width} = Dimensions.get('window');

@observer
class StoreMeetingComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      isVisibleModalCreate: true,
    };
  }

  componentDidMount() {
    this.props.store.getFilterMeeting();
  }

  openDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  openTimePicker = () => {
    this.setState({isTimePickerVisible: true});
  };

  handleDatePicked = date => {
    const {meeting} = this.props.store;
    meeting.date.set({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    });
    this.setState({isDatePickerVisible: false});
  };

  handleTimePicked = time => {
    const {meeting} = this.props.store;
    meeting.date.set({
      hour: time.getHours(),
      minute: time.getMinutes(),
    });
    this.setState({isTimePickerVisible: false});
  };

  onChangeRoom = roomId => {
    const {meeting} = this.props.store;
    meeting.room_id = roomId;
  };

  onSelectedIgnoreUserChange = selectedItems => {
    this.props.store.ignoreUsers = selectedItems;
  };

  getFilterUsers = users => {
    const {meeting, filter} = this.props.store;
    const provinceIDs = filter.provinces
      ? filter.provinces
          .filter(province => province.selected)
          .map(province => province.provinceid)
      : [];

    const departmentIds = filter.departments
      ? filter.departments
          .filter(department => department.selected)
          .map(department => department.id)
      : [];

    if (provinceIDs.length > 0) {
      users = users.filter(user => provinceIDs.indexOf(user.province_id) >= 0);
    }

    if (departmentIds.length > 0) {
      users = users.filter(
        user => departmentIds.indexOf(user.department_id) >= 0,
      );
    }

    return users;
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  submitStoreMeeting = () => {
    console.log('submit');
    const {meeting} = this.props.store;
    if (isEmptyInput(meeting.name)) {
      Alert.alert('Thông báo', 'Bạn phải đặt tên cuộc họp');
      return;
    }
    if (isEmptyInput(meeting.room_id)) {
      Alert.alert('Thông báo', 'Bạn phải chọn địa điểm diễn ra');
      return;
    }
    this.props.store.storeMeeting(this.goBack);
  };

  render() {
    let {meeting, isLoading, filter, isStoring} = this.props.store;
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled>
        <SafeAreaView style={styles.container}>
          {/*<Text style={styles.title}>Tạo cuộc họp</Text>*/}
          {isLoading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Loading />
            </View>
          ) : (
            <ScrollView>
              <View style={{marginTop: 20}}>
                <Text style={styles.titleForm}>Tên cuộc họp</Text>
                <InputGroup style={{width: width - 20}}>
                  <Input
                    value={meeting.name}
                    onChangeText={data => (meeting.name = data)}
                    returnKeyType={'next'}
                    placeholder="Tên cuộc họp"
                    blurOnSubmit={false}
                    editable={!this.props.isLoading}
                    style={{
                      lineHeight: 20,
                      height: 40,
                      fontSize: 15,
                    }}
                  />
                </InputGroup>
              </View>
              <View style={{marginTop: 40}}>
                <Text style={styles.titleForm}>Mô tả cuộc họp</Text>
                <InputGroup style={{width: width - 20}}>
                  <Input
                    value={meeting.description}
                    onChangeText={data => (meeting.description = data)}
                    returnKeyType={'next'}
                    placeholder="Mô tả cuộc họp"
                    blurOnSubmit={false}
                    editable={!this.props.isLoading}
                    style={{
                      lineHeight: 20,
                      height: 40,
                      fontSize: 15,
                    }}
                  />
                </InputGroup>
              </View>
              <View style={[{marginTop: 40}, styles.flexRow]}>
                <View style={styles.flex1}>
                  <Text style={styles.titleForm}>Ngày diễn ra</Text>
                  <TouchableOpacity
                    style={[styles.textForm, {marginRight: 10}]}
                    onPress={this.openDatePicker}>
                    <Text
                      style={{
                        fontSize: 15,
                      }}>
                      {meeting.date.format('DD/MM/YYYY')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.flex1}>
                  <Text style={styles.titleForm}>Giờ diễn ra</Text>
                  <TouchableOpacity
                    style={styles.textForm}
                    onPress={this.openTimePicker}>
                    <Text
                      style={{
                        fontSize: 15,
                      }}>
                      {meeting.date.format('HH:mm')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: 40}}>
                <Text style={styles.titleForm}>Địa điểm diễn ra</Text>
                <Picker
                  style={{
                    width: width - 40,
                    paddingLeft: 10,
                    paddingRight: 10,
                    margin: 0,
                    borderBottomColor: '#D9D5DC',
                    borderBottomWidth: 1 / 3,
                  }}
                  iosHeader="Chọn địa điểm"
                  mode="dialog"
                  placeholder={'Chọn địa điểm'}
                  itemStyle={{padding: 10}}
                  selectedValue={meeting.room_id}
                  onValueChange={this.onChangeRoom}>
                  {filter.rooms &&
                    filter.rooms.map(function(room, index) {
                      return (
                        <Item label={room.name} value={room.id} key={index} />
                      );
                    })}
                </Picker>
              </View>
              <View style={{marginTop: 40}}>
                <Text style={styles.titleForm}>Thành phố</Text>
                <View style={styles.containerTag}>
                  {filter.provinces &&
                    filter.provinces.map(function(province, index) {
                      if (province.selected) {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => (province.selected = false)}>
                            <LinearGradient
                              colors={['#E26800', '#E00000']}
                              start={{x: 0, y: 0}}
                              end={{x: 1, y: 0}}
                              style={styles.tag}>
                              <Text style={{color: 'white'}}>
                                {province.name} ({province.number_staff})
                              </Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        );
                      } else {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={styles.tag}
                            onPress={() => (province.selected = true)}>
                            <Text>
                              {province.name} ({province.number_staff})
                            </Text>
                          </TouchableOpacity>
                        );
                      }
                    })}
                </View>
              </View>
              <View style={{marginTop: 40}}>
                <Text style={styles.titleForm}>Bộ phận</Text>
                <View style={styles.containerTag}>
                  {filter.departments &&
                    filter.departments.map(function(department, index) {
                      if (department.selected) {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => (department.selected = false)}>
                            <LinearGradient
                              colors={['#E26800', '#E00000']}
                              start={{x: 0, y: 0}}
                              end={{x: 1, y: 0}}
                              style={styles.tag}>
                              <Text style={{color: 'white'}}>
                                {department.name} ({department.number_staff})
                              </Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        );
                      } else {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={styles.tag}
                            onPress={() => (department.selected = true)}>
                            <Text>
                              {department.name} ({department.number_staff})
                            </Text>
                          </TouchableOpacity>
                        );
                      }
                    })}
                </View>
              </View>
              <View style={{marginTop: 40, marginBottom: 40}}>
                <Text style={styles.titleForm}>Loại trừ</Text>
                <MultiSelect
                  styleMainWrapper={{marginTop: 10}}
                  items={this.getFilterUsers(filter.staffs)}
                  uniqueKey="id"
                  onSelectedItemsChange={this.onSelectedIgnoreUserChange}
                  selectedItems={this.props.store.ignoreUsers}
                  selectText="Chọn nhân viên"
                  searchInputPlaceholderText="Tìm nhân viên"
                  tagRemoveIconColor="#E00000"
                  tagBorderColor="#D9D5DC"
                  tagTextColor="black"
                  selectedItemTextColor="#E00000"
                  selectedItemIconColor="#E00000"
                  displayKey="name"
                  submitButtonColor="#E00000"
                  submitButtonText="Lưu"
                  avatarKey="avatar_url"
                />
              </View>
              <TouchableOpacity
                onPress={() => (isStoring ? null : this.submitStoreMeeting())}>
                <LinearGradient
                  colors={['#E26800', '#E00000']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.btnSubmit}>
                  {isStoring ? (
                    <Spinkit
                      isVisible
                      color="white"
                      type="ThreeBounce"
                      size={40}
                    />
                  ) : (
                    <Text style={{color: 'white'}}>Tạo cuộc họp</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          )}

          <DateTimePicker
            isVisible={this.state.isDatePickerVisible}
            onConfirm={this.handleDatePicked}
            date={meeting.date.toDate()}
            onCancel={() => this.setState({isDatePickerVisible: false})}
          />
          <DateTimePicker
            mode="time"
            locale="en_GB"
            isVisible={this.state.isTimePickerVisible}
            onConfirm={this.handleTimePicked}
            date={meeting.date.toDate()}
            onCancel={() => this.setState({isTimePickerVisible: false})}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  container: {
    marginBottom: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  titleForm: {
    color: theme.mainColor,
    fontSize: 12,
  },
  flex1: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  textForm: {
    paddingHorizontal: 10,
    height: 40,
    borderBottomColor: '#D9D5DC',
    borderBottomWidth: 1 / 3,
    justifyContent: 'center',
  },
  tag: {
    paddingHorizontal: 20,
    marginRight: 20,
    borderRadius: 20,
    borderColor: '#D9D5DC',
    borderWidth: 1 / 2,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnSubmit: {
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTag: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 10,
  },
};

export default withStyle()(StoreMeetingComponent);
