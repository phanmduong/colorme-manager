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
  TextInput,
} from 'react-native';
import {observer} from 'mobx-react';
import {Form, Input, InputGroup, Item, Picker} from 'native-base';
import theme from '../../styles';
import DateTimePicker from 'react-native-modal-datetime-picker';
import withStyle from '../../components/HOC/withStyle';
import Loading from '../../components/common/Loading';
import LinearGradient from 'react-native-linear-gradient';
import MultiSelect from './MultiSelect/react-native-multi-select';
import {convertVietText, isEmptyInput} from '../../helper';
import Spinkit from 'react-native-spinkit';
import {action} from 'mobx';
import {CustomPicker} from 'react-native-custom-picker';

var {height, width} = Dimensions.get('window');

@observer
class EditStoreMeetingComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      isVisibleModalCreate: true,
      search: '',
    };
  }

  componentDidMount() {
    this.props.store.getFilterMeeting();
    this.props.store.loadMeetingDetail();
  }

  renderPickerOption = settings => {
    const {item, getLabel} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>{getLabel(item)}</Text>
      </View>
    );
  };

  renderPickerHeader = title => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>{title}</Text>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Tìm kiếm"
            autoCapitalize="none"
            onChangeText={search => {
              this.setState({search});
            }}
            value={this.state.search}
            style={styles.searchInput}
            clearButtonMode={'while-editing'}
          />
        </View>
      </View>
    );
  };

  renderPickerFooter(action) {
    return (
      <TouchableOpacity
        style={styles.headerFooterContainer}
        onPress={action.close.bind(this)}>
        <Text style={{color: '#C50000', fontSize: 19}}>Hủy</Text>
      </TouchableOpacity>
    );
  }

  renderRoomPickerField = settings => {
    const {selectedItem, defaultText, getLabel} = settings;
    return (
      <LinearGradient
        colors={['#F6F6F6', '#F6F6F6']}
        style={styles.inputContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{color: '#b7b7b7', fontSize: 15}}>{defaultText}</Text>
            <Text>▼</Text>
          </View>
        )}
        {selectedItem && (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{color: 'black', fontSize: 15}}>
              {getLabel(selectedItem)}
            </Text>
            <Text>▼</Text>
          </View>
        )}
      </LinearGradient>
    );
  };

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

  getSearchedResults = array => {
    let list = [];
    if (this.state.search === '') {
      return array;
    } else {
      for (let item of array) {
        let normalizedName = item.name;
        if (
          convertVietText(normalizedName).includes(
            convertVietText(this.state.search),
          )
        ) {
          list.push(item);
        }
      }
      return list;
    }
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
          .filter(province => meeting.provinces.includes(province.provinceid))
          .map(province => province.provinceid)
      : [];

    const departmentIds = filter.departments
      ? filter.departments
          .filter(department => meeting.departments.includes(department.id))
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
    const keyboardVerticalOffset =
      Platform.OS === 'ios' ? Dimensions.get('window').height * 0.11 : 0;
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <SafeAreaView style={styles.container}>
          {isLoading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Loading />
            </View>
          ) : (
            <ScrollView>
              <View style={{marginTop: 30}}>
                <Text style={styles.titleForm}>Tên cuộc họp</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    {...this.props}
                    value={meeting.name}
                    onChangeText={data => (meeting.name = data)}
                    returnKeyType={'next'}
                    placeholder="Tên cuộc họp"
                    blurOnSubmit={false}
                    editable={!this.props.isLoading}
                    style={{fontSize: 15}}
                  />
                </View>
              </View>
              <View style={{marginTop: 30}}>
                <Text style={styles.titleForm}>Mô tả cuộc họp</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    {...this.props}
                    value={meeting.description}
                    onChangeText={data => (meeting.description = data)}
                    returnKeyType={'next'}
                    placeholder="Mô tả cuộc họp"
                    blurOnSubmit={false}
                    editable={!this.props.isLoading}
                    style={{fontSize: 15}}
                  />
                </View>
              </View>
              <View style={{marginTop: 30}}>
                <Text style={styles.titleForm}>Ngày diễn ra</Text>
                <TouchableOpacity
                  style={styles.inputContainer}
                  onPress={this.openDatePicker}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                      }}>
                      {meeting.date.format('DD/MM/YYYY')}
                    </Text>
                    <Text>▼</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 30}}>
                <Text style={styles.titleForm}>Giờ diễn ra</Text>
                <TouchableOpacity
                  style={styles.inputContainer}
                  onPress={this.openTimePicker}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                      }}>
                      {meeting.date.format('HH:mm')}
                    </Text>
                    <Text>▼</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 30}}>
                <Text style={styles.titleForm}>Địa điểm diễn ra</Text>
                <CustomPicker
                  options={
                    filter.rooms ? this.getSearchedResults(filter.rooms) : []
                  }
                  getLabel={item => item.name}
                  placeholder={'Chọn địa điểm'}
                  modalAnimationType={'fade'}
                  onBlur={() => this.setState({search: ''})}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderRoomPickerField}
                  headerTemplate={() =>
                    this.renderPickerHeader('Chọn địa điểm')
                  }
                  footerTemplate={this.renderPickerFooter}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={value => this.onChangeRoom(value.id)}
                />
              </View>
              <View style={{marginTop: 40}}>
                <Text style={styles.titleForm}>Thành phố</Text>
                <View style={styles.containerTag}>
                  {filter.provinces &&
                    filter.provinces.map(function(province, index) {
                      if (meeting.provinces.includes(province.provinceid)) {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              let provinceIndex = meeting.provinces.indexOf(
                                province.provinceid,
                              );
                              if (provinceIndex > -1) {
                                meeting.provinces.splice(provinceIndex, 1);
                              }
                              province.selected = false;
                            }}>
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
                            onPress={() => {
                              meeting.provinces.push(province.provinceid);
                              province.selected = true;
                            }}>
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
                      if (meeting.departments.includes(department.id)) {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              let departmentIndex = meeting.departments.indexOf(
                                department.id,
                              );
                              if (departmentIndex > -1) {
                                meeting.departments.splice(departmentIndex, 1);
                              }
                              department.selected = false;
                            }}>
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
                            onPress={() => {
                              meeting.departments.push(department.id);
                              department.selected = true;
                            }}>
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
                    <Text style={{color: 'white'}}>Cập nhật cuộc họp</Text>
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
  titleForm: {
    color: 'black',
    fontSize: 14,
  },
  inputContainer: {
    marginTop: 8,
    height: 45,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
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
  options: {
    marginVertical: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginHorizontal: 20,
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
  searchInput: {
    fontSize: 16,
    color: '#707070',
    marginLeft: 10,
  },
  searchContainer: {
    marginTop: 10,
    backgroundColor: '#f6f6f6',
    height: 40,
    width: width - 70,
    borderRadius: 27,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
};

export default withStyle()(EditStoreMeetingComponent);
