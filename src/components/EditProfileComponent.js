import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import {CustomPicker} from 'react-native-custom-picker';
import {convertVietText, isEmptyInput} from '../helper';
import {LITERACY, MARITAL} from './ProfileComponent';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Spinkit from 'react-native-spinkit';
import Search from './common/Search';
import theme from '../styles';
var {width, height} = Dimensions.get('window');

class EditProfileComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      search: '',
      name: !isEmptyInput(this.props.profile.name)
        ? this.props.profile.name
        : '',
      email: !isEmptyInput(this.props.profile.email)
        ? this.props.profile.email
        : '',
      username: !isEmptyInput(this.props.profile.username)
        ? this.props.profile.username
        : '',
      age: !isEmptyInput(this.props.profile.age)
        ? '' + this.props.profile.age
        : '',
      address: !isEmptyInput(this.props.profile.address)
        ? this.props.profile.address
        : '',
      phone: !isEmptyInput(this.props.profile.phone)
        ? this.props.profile.phone
        : '',
      marital: this.props.profile.marital,
      homeland: !isEmptyInput(this.props.profile.homeland)
        ? this.props.profile.homeland
        : '',
      literacy: this.props.profile.literacy,
      start_company: moment(this.props.profile.start_company),
      color: this.props.profile.color,
      isDatePickerVisible: false,
    };
  }

  renderPickerFooter(action) {
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

  renderPickerOption = settings => {
    const {item, getLabel} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>{getLabel(item)}</Text>
      </View>
    );
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

  getItemName = (itemId, array) => {
    for (let item of array) {
      if (item.id === itemId) {
        return item.name;
      }
    }
    return '';
  };

  getDefaultMarital = () => {
    return {
      id: this.props.profile.marital,
      name: this.getItemName(this.props.profile.marital, MARITAL),
    };
  };

  getDefaultLiteracy = () => {
    return {
      id: this.props.profile.literacy,
      name: this.getItemName(parseInt(this.props.profile.literacy), LITERACY),
    };
  };

  openDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  handleDatePicked = date => {
    this.setState({isDatePickerVisible: false, start_company: moment(date)});
  };

  updateProfile = () => {
    if (isEmptyInput(this.state.name)) {
      Alert.alert('Thông báo', 'Bạn phải điền họ và tên');
    } else if (isEmptyInput(this.state.username)) {
      Alert.alert('Thông báo', 'Bạn phải điền tên đăng nhập');
    } else if (isEmptyInput(this.state.email)) {
      Alert.alert('Thông báo', 'Bạn phải điền email');
    } else {
      let profile = {
        name: this.state.name,
        email: this.state.email,
        username: this.state.username,
        age: parseInt(this.state.age),
        address: this.state.address,
        phone: this.state.phone,
        marital: this.state.marital,
        homeland: this.state.homeland,
        literacy: this.state.literacy,
        start_company: !isEmptyInput(this.state.start_company)
          ? this.state.start_company.format('YYYY-MM-DD')
          : '',
        color: this.props.profile.color,
      };
      this.props.updateProfile(profile);
      if (this.props.errorUpdatingProfile) {
        Alert.alert('Thông báo', 'Có lỗi xảy !');
      } else {
        Alert.alert('Thông báo', 'Đăng ký thành công!');
        this.props.navigation.navigate('Profile');
      }
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled>
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>
                Họ và tên <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.name}
                  onChangeText={data => this.setState({name: data})}
                  returnKeyType={'next'}
                  placeholder="Họ và tên"
                  blurOnSubmit={false}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>
                Email <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.email}
                  onChangeText={data => this.setState({email: data})}
                  returnKeyType={'next'}
                  placeholder="Email"
                  blurOnSubmit={false}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>
                Tên đăng nhập <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.username}
                  onChangeText={data => this.setState({username: data})}
                  returnKeyType={'next'}
                  placeholder="Tên đăng nhập"
                  blurOnSubmit={false}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Tuổi</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.age}
                  onChangeText={data => this.setState({age: data})}
                  returnKeyType={'next'}
                  placeholder="Tuổi"
                  blurOnSubmit={false}
                  keyboardType={'number-pad'}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Địa chỉ</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.address}
                  onChangeText={data => this.setState({address: data})}
                  returnKeyType={'next'}
                  placeholder="Địa chỉ"
                  blurOnSubmit={false}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Số điện thoại</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.phone}
                  onChangeText={data => this.setState({phone: data})}
                  returnKeyType={'next'}
                  placeholder="Số điện thoại"
                  keyboardType={'number-pad'}
                  blurOnSubmit={false}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Chọn tình trạng hôn nhân</Text>
              <CustomPicker
                options={this.getSearchedResults(MARITAL)}
                getLabel={item => item.name}
                defaultValue={this.getDefaultMarital()}
                placeholder={'Chọn tình trạng hôn nhân'}
                modalAnimationType={'fade'}
                onBlur={() => this.setState({search: ''})}
                optionTemplate={this.renderPickerOption}
                fieldTemplate={this.renderPickerField}
                headerTemplate={() =>
                  this.renderPickerHeader('Chọn tình trạng hôn nhân')
                }
                footerTemplate={this.renderPickerFooter}
                modalStyle={{
                  borderRadius: 6,
                }}
                onValueChange={value => {
                  this.setState({
                    marital: value.id,
                    search: '',
                  });
                }}
              />
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Quê quán</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.homeland}
                  onChangeText={data => this.setState({homeland: data})}
                  returnKeyType={'next'}
                  placeholder="Quê quán"
                  keyboardType={'number-pad'}
                  blurOnSubmit={false}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Chọn trình độ học vấn</Text>
              <CustomPicker
                options={this.getSearchedResults(LITERACY)}
                getLabel={item => item.name}
                defaultValue={this.getDefaultLiteracy()}
                placeholder={'Chọn trình độ học vấn'}
                modalAnimationType={'fade'}
                onBlur={() => this.setState({search: ''})}
                optionTemplate={this.renderPickerOption}
                fieldTemplate={this.renderPickerField}
                headerTemplate={() =>
                  this.renderPickerHeader('Chọn trình độ học vấn')
                }
                footerTemplate={this.renderPickerFooter}
                modalStyle={{
                  borderRadius: 6,
                }}
                onValueChange={value => {
                  this.setState({
                    literacy: value.id,
                    search: '',
                  });
                }}
              />
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Hoạt động trong công ty từ</Text>
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
                    {!isEmptyInput(this.state.start_company)
                      ? this.state.start_company.format('YYYY-MM-DD')
                      : 'YYYY-MM-DD'}
                  </Text>
                  <Text>▼</Text>
                </View>
              </TouchableOpacity>
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
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
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
  container: {
    marginHorizontal: theme.mainHorizontal,
    marginBottom: 10,
    flex: 1,
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
  searchContainer: {
    marginTop: 10,
    backgroundColor: '#f6f6f6',
    height: 40,
    width: width - 70,
    borderRadius: 27,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  searchInput: {
    fontSize: 16,
    color: '#707070',
    marginLeft: 10,
  },
  options: {
    marginVertical: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginHorizontal: 20,
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

export default EditProfileComponent;
