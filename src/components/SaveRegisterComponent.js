import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Input, InputGroup} from 'native-base';
import theme from '../styles';
import {CustomPicker} from 'react-native-custom-picker';
import LinearGradient from 'react-native-linear-gradient';
import Spinkit from 'react-native-spinkit';
import {isEmptyInput} from '../helper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {FORMAT_TIME_MYSQL} from '../constants/constant';
var {height, width} = Dimensions.get('window');

export const GENDER = [
  {
    name: 'Nam',
    id: '1',
    label: 'Nam',
    value: '1',
  },
  {
    name: 'Nữ',
    id: '2',
    label: 'Nữ',
    value: '2',
  },

  {
    name: 'Khác',
    id: '0',
    label: 'Khác',
    value: '0',
  },
];

class SaveRegisterComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      phone: '',
      email: '',
      selectedCourse: false,
      selectedCampaign: false,
      selectedGender: false,
      selectedAddress: false,
      selectedClassId: -1,
      coupon: '',
      dob: moment(),
      address: '',
      facebook: '',
      gender: '',
      how_know: '',
      university: '',
      work: '',
      campaign_id: '',
      description: '',
      isDatePickerVisible: false,
    };
  }

  renderCoursePickerField = settings => {
    const {selectedItem, defaultText, getLabel} = settings;
    return (
      <LinearGradient
        colors={['#EDEDED', '#EDEDED']}
        style={styles.gradientSize}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{color: 'black', fontSize: 16}}>{defaultText}</Text>
            <Text>▼</Text>
          </View>
        )}
        {selectedItem &&
          (this.state.selectedCourse ? (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 16}}>
                {getLabel(selectedItem)}
              </Text>
              <Text>▼</Text>
            </View>
          ) : (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 16}}>{defaultText}</Text>
              <Text>▼</Text>
            </View>
          ))}
      </LinearGradient>
    );
  };

  renderCampaignPickerField = settings => {
    const {selectedItem, defaultText, getLabel} = settings;
    return (
      <LinearGradient
        colors={['#EDEDED', '#EDEDED']}
        style={styles.gradientSize}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{color: 'black', fontSize: 16}}>{defaultText}</Text>
            <Text>▼</Text>
          </View>
        )}
        {selectedItem &&
          (this.state.selectedCampaign ? (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 16}}>
                {getLabel(selectedItem)}
              </Text>
              <Text>▼</Text>
            </View>
          ) : (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 16}}>{defaultText}</Text>
              <Text>▼</Text>
            </View>
          ))}
      </LinearGradient>
    );
  };

  renderGenderPickerField = settings => {
    const {selectedItem, defaultText, getLabel} = settings;
    return (
      <LinearGradient
        colors={['#EDEDED', '#EDEDED']}
        style={styles.gradientSize}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{color: 'black', fontSize: 16}}>{defaultText}</Text>
            <Text>▼</Text>
          </View>
        )}
        {selectedItem &&
          (this.state.selectedGender ? (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 16}}>
                {getLabel(selectedItem)}
              </Text>
              <Text>▼</Text>
            </View>
          ) : (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 16}}>{defaultText}</Text>
              <Text>▼</Text>
            </View>
          ))}
      </LinearGradient>
    );
  };

  renderProvincePickerField = settings => {
    const {selectedItem, defaultText, getLabel} = settings;
    return (
      <LinearGradient
        colors={['#EDEDED', '#EDEDED']}
        style={styles.gradientSize}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{color: 'black', fontSize: 16}}>{defaultText}</Text>
            <Text>▼</Text>
          </View>
        )}
        {selectedItem &&
          (this.state.selectedAddress ? (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 16}}>
                {getLabel(selectedItem)}
              </Text>
              <Text>▼</Text>
            </View>
          ) : (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 16}}>{defaultText}</Text>
              <Text>▼</Text>
            </View>
          ))}
      </LinearGradient>
    );
  };

  renderCoursePickerOption = settings => {
    const {item, getLabel} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>{getLabel(item)}</Text>
      </View>
    );
  };

  renderCoursePickerHeader = () => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>Chọn môn</Text>
      </View>
    );
  };

  renderClassPickerHeader = () => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>Chọn lớp</Text>
      </View>
    );
  };

  renderCampaignPickerHeader = () => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>Chọn chiến dịch</Text>
      </View>
    );
  };

  renderProvincePickerHeader = () => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>Chọn địa chỉ</Text>
      </View>
    );
  };

  renderGenderPickerHeader = () => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>Chọn giới tính</Text>
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

  submitRegister = () => {
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
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        class_id: this.state.selectedClassId,
        coupon: this.state.coupon,
        dob: this.state.dob.format(FORMAT_TIME_MYSQL),
        address: this.state.address,
        facebook: this.state.facebook,
        gender: this.state.gender,
        how_know: this.state.how_know,
        university: this.state.university,
        work: this.state.work,
        campaign_id: this.state.campaign_id,
        description: this.state.description,
      };
      this.props.register(register);
      if (!this.props.errorLoadingRegister) {
        this.reset();
        Alert.alert('Thông báo', 'Đăng ký thành công!');
      } else {
        Alert.alert('Thông báo', 'Có lỗi xảy !');
      }
    }
  };

  reset = () => {
    this.setState({
      name: '',
      phone: '',
      email: '',
      class_id: -1,
      coupon: '',
      dob: moment(),
      address: '',
      facebook: '',
      gender: '',
      how_know: '',
      university: '',
      work: '',
      campaign_id: '',
      description: '',
      selectedCourse: false,
      selectedCampaign: false,
      selectedGender: false,
      selectedAddress: false,
    });
  };

  openDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  handleDatePicked = date => {
    this.setState({isDatePickerVisible: false, dob: moment(date)});
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
            value: `${district.type} ${district.name}, ${province.type} ${
              province.name
            }`,
            label: `${district.type} ${district.name}, ${province.type} ${
              province.name
            }`,
          },
        ];
      });
    });
    return address;
  };

  render() {
    if (
      !this.props.isLoadingCourses &&
      this.props.courses &&
      !this.props.isLoadingCampaigns &&
      this.props.campaigns &&
      !this.props.isLoadingProvinces &&
      this.props.provinces &&
      this.getDataAddress()
    ) {
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Tên học viên *</Text>
              <InputGroup style={{width: width - 20}}>
                <Input
                  value={this.state.name}
                  onChangeText={data => this.setState({name: data})}
                  returnKeyType={'next'}
                  placeholder="Tên học viên"
                  blurOnSubmit={false}
                  style={{
                    lineHeight: 20,
                    height: 40,
                    fontSize: 15,
                  }}
                />
              </InputGroup>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Email học viên *</Text>
              <InputGroup style={{width: width - 20}}>
                <Input
                  value={this.state.email}
                  autoCapitalize={'none'}
                  onChangeText={data => this.setState({email: data})}
                  returnKeyType={'next'}
                  placeholder="Email học viên"
                  blurOnSubmit={false}
                  style={{
                    lineHeight: 20,
                    height: 40,
                    fontSize: 15,
                  }}
                />
              </InputGroup>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Số điện thoại học viên *</Text>
              <InputGroup style={{width: width - 20}}>
                <Input
                  value={this.state.phone}
                  onChangeText={data => this.setState({phone: data})}
                  returnKeyType={'next'}
                  placeholder="Số điện thoại học viên"
                  blurOnSubmit={false}
                  style={{
                    lineHeight: 20,
                    height: 40,
                    fontSize: 15,
                  }}
                />
              </InputGroup>
            </View>
            <View style={{marginTop: 30, marginBottom: 20}}>
              <Text style={styles.titleForm}>Mã khuyến mãi</Text>
              <InputGroup style={{width: width - 20}}>
                <Input
                  value={this.state.coupon}
                  onChangeText={data => this.setState({coupon: data})}
                  returnKeyType={'next'}
                  placeholder="Mã khuyến mãi"
                  blurOnSubmit={false}
                  style={{
                    lineHeight: 20,
                    height: 40,
                    fontSize: 15,
                  }}
                />
              </InputGroup>
            </View>
            <CustomPicker
              options={this.props.courses}
              getLabel={item => item.name}
              placeholder={'Chọn môn'}
              modalAnimationType={'fade'}
              optionTemplate={this.renderCoursePickerOption}
              fieldTemplate={this.renderCoursePickerField}
              headerTemplate={this.renderCoursePickerHeader}
              footerTemplate={this.renderCoursePickerFooter}
              modalStyle={{
                borderRadius: 6,
              }}
              onValueChange={value => {
                this.setState({
                  selectedCourse: true,
                });
                this.props.onSelectCourseId(value.id);
              }}
            />
            {this.state.selectedCourse && !this.props.isLoadingClasses ? (
              <CustomPicker
                options={this.props.classes}
                getLabel={item => item.name}
                placeholder={'Chọn lớp'}
                modalAnimationType={'fade'}
                optionTemplate={this.renderCoursePickerOption}
                fieldTemplate={this.renderCoursePickerField}
                headerTemplate={this.renderClassPickerHeader}
                footerTemplate={this.renderCoursePickerFooter}
                modalStyle={{
                  borderRadius: 6,
                }}
                onValueChange={value => {
                  this.setState({selectedClassId: value.id});
                }}
              />
            ) : null}
            <CustomPicker
              options={this.props.campaigns}
              getLabel={item => item.name}
              style={{marginTop: 15}}
              placeholder={'Chọn chiến dịch'}
              modalAnimationType={'fade'}
              optionTemplate={this.renderCoursePickerOption}
              fieldTemplate={this.renderCampaignPickerField}
              headerTemplate={this.renderCampaignPickerHeader}
              footerTemplate={this.renderCoursePickerFooter}
              modalStyle={{
                borderRadius: 6,
              }}
              onValueChange={value => {
                this.setState({
                  selectedCampaign: true,
                  campaign_id: value.id,
                });
              }}
            />
            <CustomPicker
              options={GENDER}
              getLabel={item => item.name}
              style={{marginTop: 15}}
              placeholder={'Chọn giới tính'}
              modalAnimationType={'fade'}
              optionTemplate={this.renderCoursePickerOption}
              fieldTemplate={this.renderGenderPickerField}
              headerTemplate={this.renderGenderPickerHeader}
              footerTemplate={this.renderCoursePickerFooter}
              modalStyle={{
                borderRadius: 6,
              }}
              onValueChange={value => {
                this.setState({
                  selectedGender: true,
                  gender: value.id,
                });
              }}
            />
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Ngày sinh</Text>
              <TouchableOpacity
                style={[styles.textForm, {marginRight: 10}]}
                onPress={this.openDatePicker}>
                <Text
                  style={{
                    fontSize: 15,
                  }}>
                  {this.state.dob.format('DD/MM/YYYY')}
                </Text>
              </TouchableOpacity>
            </View>
            <CustomPicker
              options={this.getDataAddress()}
              getLabel={item => item.value}
              style={{marginTop: 15}}
              placeholder={'Chọn địa chỉ'}
              modalAnimationType={'fade'}
              optionTemplate={this.renderCoursePickerOption}
              fieldTemplate={this.renderProvincePickerField}
              headerTemplate={this.renderProvincePickerHeader}
              footerTemplate={this.renderCoursePickerFooter}
              modalStyle={{
                borderRadius: 6,
              }}
              onValueChange={value => {
                this.setState({
                  selectedAddress: true,
                  address: value.value,
                });
              }}
            />
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Trường học</Text>
              <InputGroup style={{width: width - 20}}>
                <Input
                  value={this.state.university}
                  onChangeText={data => this.setState({university: data})}
                  returnKeyType={'next'}
                  placeholder="Trường học"
                  blurOnSubmit={false}
                  style={{
                    lineHeight: 20,
                    height: 40,
                    fontSize: 15,
                  }}
                />
              </InputGroup>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Nơi làm việc</Text>
              <InputGroup style={{width: width - 20}}>
                <Input
                  value={this.state.work}
                  onChangeText={data => this.setState({work: data})}
                  returnKeyType={'next'}
                  placeholder="Nơi làm việc"
                  blurOnSubmit={false}
                  style={{
                    lineHeight: 20,
                    height: 40,
                    fontSize: 15,
                  }}
                />
              </InputGroup>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Lý do biết đến</Text>
              <InputGroup style={{width: width - 20}}>
                <Input
                  value={this.state.how_know}
                  onChangeText={data => this.setState({how_know: data})}
                  returnKeyType={'next'}
                  placeholder="Lý do biết đến"
                  blurOnSubmit={false}
                  style={{
                    lineHeight: 20,
                    height: 40,
                    fontSize: 15,
                  }}
                />
              </InputGroup>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Link Facebook</Text>
              <InputGroup style={{width: width - 20}}>
                <Input
                  value={this.state.facebook}
                  onChangeText={data => this.setState({facebook: data})}
                  returnKeyType={'next'}
                  placeholder="Link Facebook"
                  blurOnSubmit={false}
                  style={{
                    lineHeight: 20,
                    height: 40,
                    fontSize: 15,
                  }}
                />
              </InputGroup>
            </View>
            <View style={{marginTop: 30, marginBottom: 20}}>
              <Text style={styles.titleForm}>Mô tả</Text>
              <InputGroup style={{width: width - 20}}>
                <Input
                  value={this.state.description}
                  onChangeText={data => this.setState({description: data})}
                  returnKeyType={'next'}
                  placeholder="Mô tả"
                  blurOnSubmit={false}
                  style={{
                    lineHeight: 20,
                    height: 40,
                    fontSize: 15,
                  }}
                />
              </InputGroup>
            </View>
            <TouchableOpacity onPress={() => this.submitRegister()}>
              <LinearGradient
                colors={['#E26800', '#E00000']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.btnSubmit}>
                {!this.props.isLoadingRegister ? (
                  <Text style={{color: 'white'}}>Tạo đăng ký</Text>
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
          </ScrollView>
          <DateTimePicker
            isVisible={this.state.isDatePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={() => this.setState({isDatePickerVisible: false})}
          />
        </SafeAreaView>
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
  titleForm: {
    color: theme.mainColor,
    fontSize: 12,
  },
  container: {
    paddingHorizontal: 20,
    marginBottom: 10,
    flex: 1,
  },
  gradientSize: {
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginTop: 15,
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
  btnSubmit: {
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  textForm: {
    paddingHorizontal: 10,
    height: 40,
    borderBottomColor: '#D9D5DC',
    borderBottomWidth: 1 / 3,
    justifyContent: 'center',
  },
};

export default SaveRegisterComponent;
