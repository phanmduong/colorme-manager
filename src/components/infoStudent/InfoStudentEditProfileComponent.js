import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {CustomPicker} from 'react-native-custom-picker';
import {GENDER} from '../SaveRegisterComponent';
import LinearGradient from 'react-native-linear-gradient';
import Spinkit from 'react-native-spinkit';
import theme from '../../styles';
import {convertVietText, isEmptyInput} from '../../helper';
import {FORMAT_TIME_MYSQL} from '../../constants/constant';
var {height, width} = Dimensions.get('window');
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Search from '../common/Search';

class InfoStudentEditProfileComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    const {navigation} = this.props;
    let student = navigation.getParam('student');
    this.state = {
      id: student.id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      address: student.address,
      gender: student.gender,
      dob: isEmptyInput(student.dob) ? '' : moment(student.dob, 'DD/MM/YYYY'),
      university: student.university,
      work: student.work,
      how_know: student.how_know,
      facebook: student.facebook,
      description: student.description,
      isDatePickerVisible: false,
      search: '',
    };
  }

  renderCoursePickerOption = settings => {
    const {item, getLabel} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>{getLabel(item)}</Text>
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

  renderPickerHeader = title => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>{title}</Text>
        <Search
          placeholder="Tìm kiếm"
          onChangeText={search => {
            this.setState({search});
          }}
          value={this.state.search}
          extraStyle={{width: width - 70, marginLeft: 0}}
          extraInputStyle={{width: width - 38 - 70}}
        />
      </View>
    );
  };

  renderPickerField = settings => {
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

  getDataAddress = () => {
    if (!this.props.provinces || this.props.provinces.length <= 0) {
      return;
    }
    let address = [];

    this.props.provinces.forEach(province => {
      province.districts.forEach(district => {
        address = [
          ...address,
          {
            id: `${district.type} ${district.name}, ${province.type} ${
              province.name
            }`,
            name: `${district.type} ${district.name}, ${province.type} ${
              province.name
            }`,
          },
        ];
      });
    });
    return address;
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

  updateProfile = () => {
    if (isEmptyInput(this.state.name)) {
      Alert.alert('Thông báo', 'Bạn phải điền tên học viên');
    } else if (isEmptyInput(this.state.phone)) {
      Alert.alert('Thông báo', 'Bạn phải điền số điện thoại');
    } else if (isEmptyInput(this.state.email)) {
      Alert.alert('Thông báo', 'Bạn phải điền email');
    } else if (this.state.selectedClassId === -1) {
      Alert.alert('Thông báo', 'Bạn phải chọn lớp');
    } else {
      let register = {
        id: this.state.id,
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        dob: isEmptyInput(this.state.dob)
          ? ''
          : this.state.dob.format(FORMAT_TIME_MYSQL),
        address: this.state.address,
        facebook: this.state.facebook,
        gender: this.state.gender,
        how_know: this.state.how_know,
        university: this.state.university,
        work: this.state.work,
        description: this.state.description,
      };
      this.props.updateProfile(register);
      if (this.props.errorLoadingRegister) {
        Alert.alert('Thông báo', 'Có lỗi xảy ra!');
      } else {
        // this.reset();
        Alert.alert('Thông báo', 'Đăng ký thành công!');
        this.props.navigation.navigate('InfoStudentDetails');
      }
    }
  };

  openDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  handleDatePicked = date => {
    this.setState({isDatePickerVisible: false, dob: moment(date)});
  };

  getDefaultGender = () => {
    for (let gender of GENDER) {
      if (gender.id === this.state.gender) {
        return gender;
      }
    }
    return null;
  };

  getDefaultAddress = () => {
    if (!isEmptyInput(this.state.address)) {
      let allAddresses = this.getDataAddress();
      for (let address of allAddresses) {
        let splitAddress = address.id.split(',');
        let splitDefaultAddress = this.state.address.split(',');
        if (
          splitAddress[0] === splitDefaultAddress[0] &&
          splitAddress[1] === splitDefaultAddress[1]
        ) {
          return address;
        }
      }
    }
    return null;
  };

  render() {
    if (
      !this.props.isLoadingProvinces &&
      this.props.provinces &&
      this.getDataAddress()
    ) {
      return (
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          enabled>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>
                Tên học viên <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.name}
                  onChangeText={data => this.setState({name: data})}
                  returnKeyType={'next'}
                  placeholder="Tên học viên"
                  blurOnSubmit={false}
                  onSubmitEditing={event => {
                    this.refs.email.focus();
                  }}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>
                Email học viên <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.email}
                  autoCapitalize={'none'}
                  ref={'email'}
                  onChangeText={data => this.setState({email: data})}
                  returnKeyType={'next'}
                  placeholder="Email học viên"
                  blurOnSubmit={false}
                  onSubmitEditing={event => {
                    this.refs.phone.focus();
                  }}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>
                Số điện thoại học viên <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.phone}
                  ref={'phone'}
                  onChangeText={data => this.setState({phone: data})}
                  returnKeyType={'next'}
                  placeholder="Số điện thoại học viên"
                  blurOnSubmit={false}
                  onSubmitEditing={event => {
                    this.refs.coupon.focus();
                  }}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Chọn giới tính</Text>
              <CustomPicker
                options={this.getSearchedResults(GENDER)}
                defaultValue={this.getDefaultGender()}
                getLabel={item => item.name}
                placeholder={'Chọn giới tính'}
                modalAnimationType={'fade'}
                optionTemplate={this.renderCoursePickerOption}
                fieldTemplate={this.renderPickerField}
                headerTemplate={() => this.renderPickerHeader('Chọn giới tính')}
                footerTemplate={this.renderCoursePickerFooter}
                modalStyle={{
                  borderRadius: 6,
                }}
                onValueChange={value => {
                  this.setState({
                    gender: value.id,
                  });
                }}
              />
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Ngày sinh</Text>
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
                    {isEmptyInput(this.state.dob)
                      ? 'DD/MM/YYYY'
                      : this.state.dob.format('DD/MM/YYYY')}
                  </Text>
                  <Text>▼</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Địa chỉ</Text>
              <CustomPicker
                options={this.getSearchedResults(this.getDataAddress())}
                defaultValue={this.getDefaultAddress()}
                getLabel={item => item.name}
                placeholder={'Chọn địa chỉ'}
                modalAnimationType={'fade'}
                optionTemplate={this.renderCoursePickerOption}
                fieldTemplate={this.renderPickerField}
                headerTemplate={() => this.renderPickerHeader('Chọn địa chỉ')}
                footerTemplate={this.renderCoursePickerFooter}
                modalStyle={{
                  borderRadius: 6,
                }}
                onValueChange={value => {
                  this.setState({
                    address: value.id,
                  });
                }}
              />
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Trường học</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.university}
                  ref={'university'}
                  onChangeText={data => this.setState({university: data})}
                  returnKeyType={'next'}
                  placeholder="Trường học"
                  blurOnSubmit={false}
                  onSubmitEditing={event => {
                    this.refs.work.focus();
                  }}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Nơi làm việc</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.work}
                  ref={'work'}
                  onChangeText={data => this.setState({work: data})}
                  returnKeyType={'next'}
                  placeholder="Nơi làm việc"
                  blurOnSubmit={false}
                  onSubmitEditing={event => {
                    this.refs.how_know.focus();
                  }}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Lý do biết đến</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.how_know}
                  ref={'how_know'}
                  onChangeText={data => this.setState({how_know: data})}
                  returnKeyType={'next'}
                  placeholder="Lý do biết đến"
                  blurOnSubmit={false}
                  onSubmitEditing={event => {
                    this.refs.facebook.focus();
                  }}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Link Facebook</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.facebook}
                  ref={'facebook'}
                  onChangeText={data => this.setState({facebook: data})}
                  returnKeyType={'next'}
                  placeholder="Link Facebook"
                  blurOnSubmit={false}
                  onSubmitEditing={event => {
                    this.refs.description.focus();
                  }}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30, marginBottom: 20}}>
              <Text style={styles.titleForm}>Mô tả</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.description}
                  ref={'description'}
                  onChangeText={data => this.setState({description: data})}
                  returnKeyType={'next'}
                  placeholder="Mô tả"
                  blurOnSubmit={false}
                  onSubmitEditing={event => {
                    this.refs.description.blur();
                  }}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => this.updateProfile()}>
              <LinearGradient
                colors={['#E26800', '#E00000']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.btnSubmit}>
                {!this.props.isUpdatingProfile ? (
                  <Text style={{color: 'white'}}>Cập nhật</Text>
                ) : (
                  <Spinkit
                    isVisible
                    color="white"
                    type="ThreeBounce"
                    size={40}
                  />
                )}
              </LinearGradient>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={() => this.setState({isDatePickerVisible: false})}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Spinkit
              isVisible
              color={theme.mainColor}
              type="Wave"
              size={width / 8}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = {
  inputContainer: {
    marginTop: 8,
    height: 45,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  titleForm: {
    color: 'black',
    fontSize: 14,
  },
  container: {
    paddingHorizontal: 16,
    marginBottom: 10,
    flex: 1,
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
    marginTop: 40,
  },
};

export default InfoStudentEditProfileComponent;
