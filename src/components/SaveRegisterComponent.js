import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput,
} from 'react-native';
import theme from '../styles';
import {CustomPicker} from 'react-native-custom-picker';
import LinearGradient from 'react-native-linear-gradient';
import Spinkit from 'react-native-spinkit';
import {convertVietText, isEmptyInput} from '../helper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {FORMAT_TIME_MYSQL} from '../constants/constant';
import Search from './common/Search';
import SubmitButton from './common/SubmitButton';
var {height, width} = Dimensions.get('window');
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
    let name = this.props.navigation.getParam('name');
    let phone = this.props.navigation.getParam('phone');
    let email = this.props.navigation.getParam('email');
    let classId = this.props.navigation.getParam('classId');
    let courseId = this.props.navigation.getParam('courseId');
    if (!isEmptyInput(courseId)) {
      this.props.onSelectCourseId(courseId);
    }
    let baseId = this.props.navigation.getParam('baseId');
    this.state = {
      name: isEmptyInput(name) ? '' : name,
      phone: isEmptyInput(phone) ? '' : phone,
      email: isEmptyInput(email) ? '' : email,
      selectedCourse: !isEmptyInput(courseId),
      selectedCampaign: false,
      selectedGender: false,
      selectedAddress: false,
      selectedSource: false,
      selectedStatus: false,
      selectedClassId: isEmptyInput(classId) ? -1 : classId,
      selectedCourseId: isEmptyInput(courseId) ? -1 : courseId,
      selectedSaler: false,
      source_id: '',
      status_id: '',
      base_id: isEmptyInput(baseId) ? '' : baseId,
      coupon: '',
      dob: '',
      address: '',
      facebook: '',
      gender: '',
      how_know: '',
      university: '',
      work: '',
      campaign_id: '',
      description: '',
      father_name: '',
      saler_id: this.props.user.id,
      isDatePickerVisible: false,
      expanded: false,
      search: '',
    };
  }

  renderCoursePickerField = (settings) => {
    const {selectedItem, defaultText, getLabel} = settings;
    let courseId = this.props.navigation.getParam('courseId');
    return (
      <LinearGradient
        colors={['#F6F6F6', '#F6F6F6']}
        style={styles.inputContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem &&
          (isEmptyInput(courseId) ? (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: '#b7b7b7', fontSize: 15}}>
                {defaultText}
              </Text>
              <Text>▼</Text>
            </View>
          ) : (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 15}}>
                {getLabel(this.getPropsName(this.props.courses, courseId))}
              </Text>
              <Text>▼</Text>
            </View>
          ))}
        {selectedItem &&
          (this.state.selectedCourse ? (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 15}}>
                {getLabel(selectedItem)}
              </Text>
              <Text>▼</Text>
            </View>
          ) : (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: '#b7b7b7', fontSize: 15}}>
                {defaultText}
              </Text>
              <Text>▼</Text>
            </View>
          ))}
      </LinearGradient>
    );
  };

  renderBasePickerField = (settings) => {
    const {selectedItem, defaultText, getLabel} = settings;
    let baseId = this.props.navigation.getParam('baseId');
    return (
      <LinearGradient
        colors={['#F6F6F6', '#F6F6F6']}
        style={styles.inputContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem &&
          (isEmptyInput(baseId) ? (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: '#b7b7b7', fontSize: 15}}>
                {defaultText}
              </Text>
              <Text>▼</Text>
            </View>
          ) : (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 15}}>
                {getLabel(
                  this.getPropsName(
                    this.getSelectBase(this.props.baseData, this.props.classes),
                    baseId,
                  ),
                )}
              </Text>
              <Text>▼</Text>
            </View>
          ))}
        {selectedItem &&
          (this.state.selectedCourse ? (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 15}}>
                {getLabel(selectedItem)}
              </Text>
              <Text>▼</Text>
            </View>
          ) : (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: '#b7b7b7', fontSize: 15}}>
                {defaultText}
              </Text>
              <Text>▼</Text>
            </View>
          ))}
      </LinearGradient>
    );
  };

  renderClassPickerField = (settings) => {
    const {selectedItem, defaultText, getLabel} = settings;
    let classId = this.props.navigation.getParam('classId');
    return (
      <LinearGradient
        colors={['#F6F6F6', '#F6F6F6']}
        style={styles.inputContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem &&
          (isEmptyInput(classId) ? (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: '#b7b7b7', fontSize: 15}}>
                {defaultText}
              </Text>
              <Text>▼</Text>
            </View>
          ) : (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 15}}>
                {getLabel(
                  this.getPropsName(
                    this.filterBase(this.getClasses(this.props.classes)),
                    classId,
                  ),
                )}
              </Text>
              <Text>▼</Text>
            </View>
          ))}
        {selectedItem &&
          (this.state.selectedCourse ? (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 15}}>
                {getLabel(selectedItem)}
              </Text>
              <Text>▼</Text>
            </View>
          ) : (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: '#b7b7b7', fontSize: 15}}>
                {defaultText}
              </Text>
              <Text>▼</Text>
            </View>
          ))}
      </LinearGradient>
    );
  };

  renderCampaignPickerField = (settings) => {
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
        {selectedItem &&
          (this.state.selectedCampaign ? (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 15}}>
                {getLabel(selectedItem)}
              </Text>
              <Text>▼</Text>
            </View>
          ) : (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: '#b7b7b7', fontSize: 15}}>
                {defaultText}
              </Text>
              <Text>▼</Text>
            </View>
          ))}
      </LinearGradient>
    );
  };

  renderGenderPickerField = (settings) => {
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
        {selectedItem &&
          (this.state.selectedGender ? (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 15}}>
                {getLabel(selectedItem)}
              </Text>
              <Text>▼</Text>
            </View>
          ) : (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: '#b7b7b7', fontSize: 15}}>
                {defaultText}
              </Text>
              <Text>▼</Text>
            </View>
          ))}
      </LinearGradient>
    );
  };

  renderProvincePickerField = (settings) => {
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
        {selectedItem &&
          (this.state.selectedAddress ? (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 15}}>
                {getLabel(selectedItem)}
              </Text>
              <Text>▼</Text>
            </View>
          ) : (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: '#b7b7b7', fontSize: 15}}>
                {defaultText}
              </Text>
              <Text>▼</Text>
            </View>
          ))}
      </LinearGradient>
    );
  };

  renderSourcePickerField = (settings) => {
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
        {selectedItem &&
          (this.state.selectedSource ? (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 15}}>
                {getLabel(selectedItem)}
              </Text>
              <Text>▼</Text>
            </View>
          ) : (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: '#b7b7b7', fontSize: 15}}>
                {defaultText}
              </Text>
              <Text>▼</Text>
            </View>
          ))}
      </LinearGradient>
    );
  };

  renderSalerPickerField = (settings) => {
    const {selectedItem, defaultText, getLabel} = settings;
    return (
      <LinearGradient
        colors={['#F6F6F6', '#F6F6F6']}
        style={styles.inputContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{color: '#b7b7b7', fontSize: 15}}>
              {getLabel(defaultText)}
            </Text>
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

  renderStatusPickerField = (settings) => {
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
        {selectedItem &&
          (this.state.selectedStatus ? (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 15}}>
                {getLabel(selectedItem)}
              </Text>
              <Text>▼</Text>
            </View>
          ) : (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: '#b7b7b7', fontSize: 15}}>
                {defaultText}
              </Text>
              <Text>▼</Text>
            </View>
          ))}
      </LinearGradient>
    );
  };

  renderPickerOption = (settings) => {
    const {item, getLabel} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>{getLabel(item)}</Text>
      </View>
    );
  };

  renderPickerHeader = (title) => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>{title}</Text>
        <Search
          placeholder="Tìm kiếm"
          onChangeText={(search) => {
            this.setState({search});
          }}
          value={this.state.search}
          extraStyle={{width: width - 70, marginLeft: 0}}
          extraInputStyle={{width: width - 38 - 80}}
        />
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

  getSearchedResults = (array) => {
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

  getPropsName = (array, comparedId) => {
    for (let item of array) {
      if (item.id === comparedId) {
        return item;
      }
    }
    return {name: ''};
  };

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
        dob: !isEmptyInput(this.state.dob)
          ? this.state.dob.format(FORMAT_TIME_MYSQL)
          : '',
        address: this.state.address,
        facebook: this.state.facebook,
        gender: this.state.gender,
        how_know: this.state.how_know,
        university: this.state.university,
        work: this.state.work,
        campaign_id: this.state.campaign_id,
        description: this.state.description,
        course_id: this.state.selectedCourseId,
        saler_id: this.state.saler_id,
        father_name: this.state.father_name,
        source_id: this.state.source_id,
        status_id: this.state.status_id,
        base_id: this.state.base_id,
      };
      this.props.register(register);
      if (this.props.errorLoadingRegister) {
        Alert.alert('Thông báo', 'Có lỗi xảy !');
      } else {
        this.reset();
        Alert.alert('Thông báo', 'Đăng ký thành công!');
        this.props.navigation.navigate('RegisterList');
        this.props.reload();
      }
    }
  };

  reset = () => {
    this.setState({
      name: '',
      phone: '',
      email: '',
      selectedClassId: -1,
      coupon: '',
      dob: '',
      address: '',
      facebook: '',
      gender: '',
      how_know: '',
      university: '',
      work: '',
      campaign_id: '',
      description: '',
      father_name: '',
      source_id: '',
      status_id: '',
      base_id: '',
      saler_id: this.props.user.id,
      selectedCourseId: -1,
      selectedCourse: false,
      selectedCampaign: false,
      selectedGender: false,
      selectedAddress: false,
      expanded: false,
      search: '',
    });
  };

  openDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  handleDatePicked = (date) => {
    this.setState({isDatePickerVisible: false, dob: moment(date)});
  };

  getDataAddress = () => {
    if (!this.props.provinces || this.props.provinces.length <= 0) {
      return;
    }
    let address = [];

    this.props.provinces.forEach((province) => {
      province.districts.forEach((district) => {
        address = [
          ...address,
          {
            id: `${district.type} ${district.name}, ${province.type} ${province.name}`,
            name: `${district.type} ${district.name}, ${province.type} ${province.name}`,
          },
        ];
      });
    });
    return address;
  };

  getSelectBase = (items, studyClasses) => {
    return (
      items &&
      items.map((item) => {
        const count = studyClasses.filter(
          (sc) => sc.base && sc.base.id == item.id,
        ).length;
        return {
          id: item.id,
          name: `${item.name} - (${count} lớp) - ${item.address}`,
        };
      })
    );
  };

  getClasses = (items) => {
    return (
      items &&
      items.map((item) => {
        let label = item.name;
        if (item.date_start) {
          label += ' - ' + item.date_start;
        }
        if (item.study_time) {
          label += ' - ' + item.study_time;
        }
        return {
          id: item.id,
          base_id: item.base && item.base.id ? item.base.id : -1,
          name: label,
        };
      })
    );
  };

  getDefaultSaler = () => {
    return {id: this.props.user.id, name: this.props.user.name};
  };

  getSalerData = (salerList) => {
    let emptySaler = {id: '', name: ''};
    let data = [emptySaler].concat(salerList);
    return data;
  };

  toggleExpand = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  filterBase = (classes) => {
    if (this.state.base_id !== '') {
      let filterClasses = [];
      for (let _class of classes) {
        if (_class.base_id === parseInt(this.state.base_id)) {
          filterClasses.push(_class);
        }
      }
      return filterClasses;
    }
    return classes;
  };

  render() {
    if (
      !this.props.isLoadingCourses &&
      !isEmptyInput(this.props.courses) &&
      !this.props.isLoadingCampaigns &&
      !isEmptyInput(this.props.campaigns) &&
      !this.props.isLoadingProvinces &&
      !isEmptyInput(this.props.provinces) &&
      !isEmptyInput(this.getDataAddress()) &&
      !this.props.isLoadingSources &&
      !isEmptyInput(this.props.sources) &&
      !this.props.isLoadingStatuses &&
      !isEmptyInput(this.props.statuses) &&
      !this.props.isLoadingBase &&
      !isEmptyInput(this.props.baseData) &&
      !this.props.isLoadingSalers &&
      !isEmptyInput(this.props.salers)
    ) {
      return (
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          enabled
          keyboardVerticalOffset={100}>
          <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{marginTop: 30}}>
                <Text style={styles.titleForm}>
                  Tên học viên <Text style={{color: '#C50000'}}>*</Text>
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    {...this.props}
                    value={this.state.name}
                    onChangeText={(data) => this.setState({name: data})}
                    returnKeyType={'next'}
                    placeholder="Tên học viên"
                    blurOnSubmit={false}
                    onSubmitEditing={(event) => {
                      this.refs.father_name.focus();
                    }}
                    style={{fontSize: 15}}
                  />
                </View>
              </View>
              <View style={{marginTop: 30}}>
                <Text style={styles.titleForm}>Tên phụ huynh</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    {...this.props}
                    value={this.state.father_name}
                    onChangeText={(data) => this.setState({father_name: data})}
                    returnKeyType={'next'}
                    ref={'father_name'}
                    placeholder="Tên phụ huynh"
                    blurOnSubmit={false}
                    onSubmitEditing={(event) => {
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
                    onChangeText={(data) => this.setState({email: data})}
                    returnKeyType={'next'}
                    placeholder="Email học viên"
                    blurOnSubmit={false}
                    onSubmitEditing={(event) => {
                      this.refs.phone.focus();
                    }}
                    style={{fontSize: 15}}
                  />
                </View>
              </View>
              <View style={{marginTop: 30}}>
                <Text style={styles.titleForm}>
                  Số điện thoại học viên{' '}
                  <Text style={{color: '#C50000'}}>*</Text>
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    {...this.props}
                    value={this.state.phone}
                    ref={'phone'}
                    onChangeText={(data) => this.setState({phone: data})}
                    returnKeyType={'next'}
                    placeholder="Số điện thoại học viên"
                    blurOnSubmit={false}
                    onSubmitEditing={(event) => {
                      this.refs.coupon.focus();
                    }}
                    style={{fontSize: 15}}
                  />
                </View>
              </View>
              <View style={{marginTop: 30}}>
                <Text style={styles.titleForm}>Mã khuyến mãi</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    {...this.props}
                    value={this.state.coupon}
                    ref={'coupon'}
                    onChangeText={(data) => this.setState({coupon: data})}
                    returnKeyType={'next'}
                    placeholder="Mã khuyến mãi"
                    blurOnSubmit={false}
                    onSubmitEditing={(event) => {
                      if (this.state.expanded) {
                        this.refs.university.focus();
                      } else {
                        this.refs.coupon.blur();
                      }
                    }}
                    style={{fontSize: 15}}
                  />
                </View>
              </View>
              <View style={{marginTop: 30}}>
                <Text style={styles.titleForm}>
                  Chọn môn học <Text style={{color: '#C50000'}}>*</Text>
                </Text>
                <CustomPicker
                  options={this.getSearchedResults(this.props.courses)}
                  getLabel={(item) => item.name}
                  placeholder={'Chọn môn'}
                  modalAnimationType={'fade'}
                  onBlur={() => this.setState({search: ''})}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderCoursePickerField}
                  headerTemplate={() => this.renderPickerHeader('Chọn môn')}
                  footerTemplate={this.renderPickerFooter}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={(value) => {
                    this.setState({
                      selectedCourse: true,
                      selectedCourseId: value.id,
                      search: '',
                      base_id: '',
                    });
                    this.props.onSelectCourseId(value.id);
                  }}
                />
              </View>
              {this.state.selectedCourse && !this.props.isLoadingClasses ? (
                <View style={{marginTop: 30}}>
                  <Text style={styles.titleForm}>Chọn cơ sở</Text>
                  <CustomPicker
                    options={this.getSearchedResults(
                      this.getSelectBase(
                        this.props.baseData,
                        this.props.classes,
                      ),
                    )}
                    getLabel={(item) => item.name}
                    placeholder={'Chọn cơ sở'}
                    modalAnimationType={'fade'}
                    onBlur={() => this.setState({search: ''})}
                    optionTemplate={this.renderPickerOption}
                    fieldTemplate={this.renderBasePickerField}
                    headerTemplate={() => this.renderPickerHeader('Chọn cơ sở')}
                    footerTemplate={this.renderPickerFooter}
                    modalStyle={{
                      borderRadius: 6,
                    }}
                    onValueChange={(value) => {
                      this.setState({base_id: value.id, search: ''});
                    }}
                  />
                </View>
              ) : null}
              {this.state.selectedCourse && !this.props.isLoadingClasses ? (
                <View style={{marginTop: 30}}>
                  <Text style={styles.titleForm}>
                    Chọn lớp học <Text style={{color: '#C50000'}}>*</Text>
                  </Text>
                  <CustomPicker
                    options={this.getSearchedResults(
                      this.filterBase(this.getClasses(this.props.classes)),
                    )}
                    getLabel={(item) => item.name}
                    placeholder={'Chọn lớp'}
                    modalAnimationType={'fade'}
                    onBlur={() => this.setState({search: ''})}
                    optionTemplate={this.renderPickerOption}
                    fieldTemplate={this.renderClassPickerField}
                    headerTemplate={() => this.renderPickerHeader('Chọn lớp')}
                    footerTemplate={this.renderPickerFooter}
                    modalStyle={{
                      borderRadius: 6,
                    }}
                    onValueChange={(value) => {
                      this.setState({selectedClassId: value.id, search: ''});
                    }}
                  />
                </View>
              ) : null}
              <View style={{marginTop: 30}}>
                <Text style={styles.titleForm}>Chọn trạng thái</Text>
                <CustomPicker
                  options={this.getSearchedResults(this.props.statuses)}
                  getLabel={(item) => item.name}
                  placeholder={'Chọn trạng thái'}
                  modalAnimationType={'fade'}
                  onBlur={() => this.setState({search: ''})}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderStatusPickerField}
                  headerTemplate={() =>
                    this.renderPickerHeader('Chọn trạng thái')
                  }
                  footerTemplate={this.renderPickerFooter}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={(value) => {
                    this.setState({
                      selectedStatus: true,
                      status_id: value.id,
                      search: '',
                    });
                  }}
                />
              </View>
              <View style={{marginTop: 30}}>
                <Text style={styles.titleForm}>Chọn nguồn</Text>
                <CustomPicker
                  options={this.getSearchedResults(this.props.sources)}
                  getLabel={(item) => item.name}
                  placeholder={'Chọn nguồn'}
                  modalAnimationType={'fade'}
                  onBlur={() => this.setState({search: ''})}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderSourcePickerField}
                  headerTemplate={() => this.renderPickerHeader('Chọn nguồn')}
                  footerTemplate={this.renderPickerFooter}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={(value) => {
                    this.setState({
                      selectedSource: true,
                      source_id: value.id,
                      search: '',
                    });
                  }}
                />
              </View>
              <View style={{marginTop: 30}}>
                <Text style={styles.titleForm}>Chọn saler</Text>
                <CustomPicker
                  options={this.getSearchedResults(
                    this.getSalerData(this.props.salers),
                  )}
                  defaultValue={this.getDefaultSaler()}
                  getLabel={(item) => item.name}
                  placeholder={'Chọn saler'}
                  modalAnimationType={'fade'}
                  onBlur={() => this.setState({search: ''})}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderSalerPickerField}
                  headerTemplate={() => this.renderPickerHeader('Chọn saler')}
                  footerTemplate={this.renderPickerFooter}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={(value) => {
                    this.setState({
                      selectedSaler: true,
                      saler_id: value.id,
                      search: '',
                    });
                  }}
                />
              </View>
              <View style={{marginTop: 30}}>
                <Text style={styles.titleForm}>Chọn chiến dịch</Text>
                <CustomPicker
                  options={this.getSearchedResults(this.props.campaigns)}
                  getLabel={(item) => item.name}
                  placeholder={'Chọn chiến dịch'}
                  modalAnimationType={'fade'}
                  onBlur={() => this.setState({search: ''})}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderCampaignPickerField}
                  headerTemplate={() =>
                    this.renderPickerHeader('Chọn chiến dịch')
                  }
                  footerTemplate={this.renderPickerFooter}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={(value) => {
                    this.setState({
                      selectedCampaign: true,
                      campaign_id: value.id,
                      search: '',
                    });
                  }}
                />
              </View>

              <TouchableOpacity onPress={() => this.toggleExpand()}>
                <View style={styles.expandContainer}>
                  <Text style={styles.expandTitle}>Mở rộng</Text>
                  {!this.state.expanded ? (
                    <MaterialIcons
                      name={'expand-more'}
                      color={'black'}
                      size={20}
                    />
                  ) : (
                    <MaterialIcons
                      name={'expand-less'}
                      color={'black'}
                      size={20}
                    />
                  )}
                </View>
              </TouchableOpacity>

              {this.state.expanded ? (
                <View>
                  <View style={{marginTop: 30}}>
                    <Text style={styles.titleForm}>Chọn giới tính</Text>
                    <CustomPicker
                      options={this.getSearchedResults(GENDER)}
                      getLabel={(item) => item.name}
                      placeholder={'Chọn giới tính'}
                      modalAnimationType={'fade'}
                      onBlur={() => this.setState({search: ''})}
                      optionTemplate={this.renderPickerOption}
                      fieldTemplate={this.renderGenderPickerField}
                      headerTemplate={() =>
                        this.renderPickerHeader('Chọn giới tính')
                      }
                      footerTemplate={this.renderPickerFooter}
                      modalStyle={{
                        borderRadius: 6,
                      }}
                      onValueChange={(value) => {
                        this.setState({
                          selectedGender: true,
                          gender: value.id,
                          search: '',
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
                          {!isEmptyInput(this.state.dob)
                            ? this.state.dob.format('DD/MM/YYYY')
                            : 'DD/MM/YYYY'}
                        </Text>
                        <Text>▼</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop: 30}}>
                    <Text style={styles.titleForm}>Địa chỉ</Text>
                    <CustomPicker
                      options={this.getSearchedResults(this.getDataAddress())}
                      getLabel={(item) => item.name}
                      placeholder={'Chọn địa chỉ'}
                      modalAnimationType={'fade'}
                      onBlur={() => this.setState({search: ''})}
                      optionTemplate={this.renderPickerOption}
                      fieldTemplate={this.renderProvincePickerField}
                      headerTemplate={() =>
                        this.renderPickerHeader('Chọn địa chỉ')
                      }
                      footerTemplate={this.renderPickerFooter}
                      modalStyle={{
                        borderRadius: 6,
                      }}
                      onValueChange={(value) => {
                        this.setState({
                          selectedAddress: true,
                          address: value.id,
                          search: '',
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
                        onChangeText={(data) =>
                          this.setState({university: data})
                        }
                        returnKeyType={'next'}
                        placeholder="Trường học"
                        blurOnSubmit={false}
                        onSubmitEditing={(event) => {
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
                        onChangeText={(data) => this.setState({work: data})}
                        returnKeyType={'next'}
                        placeholder="Nơi làm việc"
                        blurOnSubmit={false}
                        onSubmitEditing={(event) => {
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
                        onChangeText={(data) => this.setState({how_know: data})}
                        returnKeyType={'next'}
                        placeholder="Lý do biết đến"
                        blurOnSubmit={false}
                        onSubmitEditing={(event) => {
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
                        onChangeText={(data) => this.setState({facebook: data})}
                        returnKeyType={'next'}
                        placeholder="Link Facebook"
                        blurOnSubmit={false}
                        onSubmitEditing={(event) => {
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
                        onChangeText={(data) =>
                          this.setState({description: data})
                        }
                        returnKeyType={'next'}
                        placeholder="Mô tả"
                        blurOnSubmit={false}
                        onSubmitEditing={(event) => {
                          this.refs.description.blur();
                        }}
                        style={{fontSize: 15}}
                      />
                    </View>
                  </View>
                </View>
              ) : null}
              <SubmitButton
                title={'Hoàn tất'}
                loading={this.props.isLoadingRegister}
                onPress={this.submitRegister}
                containerStyle={styles.btnSubmit}
              />
            </ScrollView>
            <DateTimePicker
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={() => this.setState({isDatePickerVisible: false})}
            />
          </SafeAreaView>
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
  titleForm: {
    color: 'black',
    fontSize: 14,
  },
  container: {
    paddingHorizontal: theme.mainHorizontal,
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
    marginTop: 40,
  },
  textForm: {
    paddingHorizontal: 10,
    height: 40,
    borderBottomColor: '#D9D5DC',
    borderBottomWidth: 1 / 3,
    justifyContent: 'center',
  },
  inputContainer: {
    marginTop: 8,
    height: 45,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  expandContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  expandIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  expandTitle: {
    fontSize: 18,
    color: 'black',
  },
};

export default SaveRegisterComponent;
