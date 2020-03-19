import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import Search from './common/Search';
import {CustomPicker} from 'react-native-custom-picker';
import LinearGradient from 'react-native-linear-gradient';
import {CITY, GENDER, RATE} from '../constants/constant';
import Spinkit from 'react-native-spinkit';
import {convertVietText, isEmptyInput} from '../helper';
import theme from '../styles';
var {height, width} = Dimensions.get('window');

class AddLeadsComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: '',
      name: '',
      email: '',
      phone: '',
      rate: 5,
      status: '',
      note: '',
      father_name: '',
      interest: '',
      university: '',
      city: '',
      gender: '',
      status_id: '',
      address: '',
      search: '',
      expanded: false,
    };
  }

  renderPickerOption = settings => {
    const {item, getLabel} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>{getLabel(item)}</Text>
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

  getDefault = (id, array) => {
    for (let item of array) {
      if (item.id === id) {
        return item;
      }
    }
    return array[0];
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

  toggleExpand = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
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

  saveLead = () => {
    if (isEmptyInput(this.state.name)) {
      Alert.alert('Thông báo', 'Bạn phải điền tên học viên');
    } else if (isEmptyInput(this.state.phone)) {
      Alert.alert('Thông báo', 'Bạn phải điền số điện thoại');
    } else if (isEmptyInput(this.state.email)) {
      Alert.alert('Thông báo', 'Bạn phải điền email');
    } else {
      let lead = {
        id: this.state.id,
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        rate: this.state.rate,
        status: this.state.status,
        note: this.state.note,
        father_name: this.state.father_name,
        interest: this.state.interest,
        university: this.state.university,
        city: this.state.city,
      };
      this.props.saveLead(lead);
      if (this.props.errorSaveLead) {
        Alert.alert('Thông báo', 'Có lỗi xảy ra!');
      } else {
        Alert.alert('Thông báo', 'Đăng ký thành công!');
        this.props.navigation.navigate('Leads');
      }
    }
  };

  render() {
    if (this.props.isLoadingProvinces || this.props.isLoadingStatuses) {
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
    } else {
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
                Tên <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.name}
                  onChangeText={data => this.setState({name: data})}
                  returnKeyType={'next'}
                  placeholder="Tên"
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
                Email <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.email}
                  autoCapitalize={'none'}
                  ref={'email'}
                  onChangeText={data => this.setState({email: data})}
                  returnKeyType={'next'}
                  placeholder="Email"
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
                Số điện thoại <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.phone}
                  ref={'phone'}
                  onChangeText={data => this.setState({phone: data})}
                  returnKeyType={'next'}
                  placeholder="Số điện thoại"
                  blurOnSubmit={false}
                  onSubmitEditing={event => {
                    this.refs.phone.blur();
                  }}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Chọn thành phố</Text>
              <CustomPicker
                options={this.getSearchedResults(CITY)}
                getLabel={item => item.name}
                placeholder={'Chọn thành phố'}
                modalAnimationType={'fade'}
                optionTemplate={this.renderPickerOption}
                fieldTemplate={this.renderPickerField}
                headerTemplate={() => this.renderPickerHeader('Chọn thành phố')}
                footerTemplate={this.renderPickerFooter}
                onBlur={() => this.setState({search: ''})}
                modalStyle={{
                  borderRadius: 6,
                }}
                onValueChange={value => {
                  this.setState({
                    city: value.id,
                    search: '',
                  });
                }}
              />
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Chọn đánh giá</Text>
              <CustomPicker
                options={this.getSearchedResults(RATE)}
                defaultValue={this.getDefault(this.state.rate, RATE)}
                getLabel={item => item.name}
                placeholder={'Chọn đánh giá'}
                modalAnimationType={'fade'}
                optionTemplate={this.renderPickerOption}
                fieldTemplate={this.renderPickerField}
                headerTemplate={() => this.renderPickerHeader('Chọn đánh giá')}
                footerTemplate={this.renderPickerFooter}
                onBlur={() => this.setState({search: ''})}
                modalStyle={{
                  borderRadius: 6,
                }}
                onValueChange={value => {
                  this.setState({
                    rate: value.id,
                    search: '',
                  });
                }}
              />
            </View>
            <TouchableOpacity onPress={() => this.toggleExpand()}>
              <View style={styles.expandContainer}>
                <Text style={styles.expandTitle}>Mở rộng</Text>
                {!this.state.expanded ? (
                  <Image
                    source={require('../../assets/img/expand-arrow.png')}
                    style={styles.expandIcon}
                  />
                ) : (
                  <Image
                    source={require('../../assets/img/collapse-arrow.png')}
                    style={styles.expandIcon}
                  />
                )}
              </View>
            </TouchableOpacity>
            {this.state.expanded ? (
              <View>
                <View style={{marginTop: 30}}>
                  <Text style={styles.titleForm}>Tên phụ huynh</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      {...this.props}
                      value={this.state.father_name}
                      ref={'father_name'}
                      onChangeText={data => this.setState({father_name: data})}
                      returnKeyType={'next'}
                      placeholder="Tên phụ huynh"
                      blurOnSubmit={false}
                      onSubmitEditing={event => {
                        this.refs.father_name.blur();
                      }}
                      style={{fontSize: 15}}
                    />
                  </View>
                </View>
                <View style={{marginTop: 30}}>
                  <Text style={styles.titleForm}>Địa chỉ</Text>
                  <CustomPicker
                    options={this.getSearchedResults(this.getDataAddress())}
                    getLabel={item => item.name}
                    placeholder={'Chọn địa chỉ'}
                    modalAnimationType={'fade'}
                    onBlur={() => this.setState({search: ''})}
                    optionTemplate={this.renderPickerOption}
                    fieldTemplate={this.renderPickerField}
                    headerTemplate={() =>
                      this.renderPickerHeader('Chọn địa chỉ')
                    }
                    footerTemplate={this.renderPickerFooter}
                    modalStyle={{
                      borderRadius: 6,
                    }}
                    onValueChange={value => {
                      this.setState({
                        address: value.id,
                        search: '',
                      });
                    }}
                  />
                </View>
                <View style={{marginTop: 30}}>
                  <Text style={styles.titleForm}>Chọn giới tính</Text>
                  <CustomPicker
                    options={this.getSearchedResults(GENDER)}
                    getLabel={item => item.name}
                    placeholder={'Chọn giới tính'}
                    modalAnimationType={'fade'}
                    optionTemplate={this.renderPickerOption}
                    fieldTemplate={this.renderPickerField}
                    headerTemplate={() =>
                      this.renderPickerHeader('Chọn giới tính')
                    }
                    footerTemplate={this.renderPickerFooter}
                    onBlur={() => this.setState({search: ''})}
                    modalStyle={{
                      borderRadius: 6,
                    }}
                    onValueChange={value => {
                      this.setState({
                        gender: value.id,
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
                      onChangeText={data => this.setState({university: data})}
                      returnKeyType={'next'}
                      placeholder="Trường học"
                      blurOnSubmit={false}
                      onSubmitEditing={event => {
                        this.refs.interest.focus();
                      }}
                      style={{fontSize: 15}}
                    />
                  </View>
                </View>
                <View style={{marginTop: 30}}>
                  <Text style={styles.titleForm}>Quan tâm</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      {...this.props}
                      value={this.state.interest}
                      ref={'interest'}
                      onChangeText={data => this.setState({interest: data})}
                      returnKeyType={'next'}
                      placeholder="Quan tâm"
                      blurOnSubmit={false}
                      onSubmitEditing={event => {
                        this.refs.interest.blur();
                      }}
                      style={{fontSize: 15}}
                    />
                  </View>
                </View>
                <View style={{marginTop: 30}}>
                  <Text style={styles.titleForm}>Chọn trạng thái</Text>
                  <CustomPicker
                    options={this.getSearchedResults(this.props.statuses)}
                    getLabel={item => item.name}
                    placeholder={'Chọn trạng thái'}
                    modalAnimationType={'fade'}
                    optionTemplate={this.renderPickerOption}
                    fieldTemplate={this.renderPickerField}
                    headerTemplate={() =>
                      this.renderPickerHeader('Chọn trạng thái')
                    }
                    footerTemplate={this.renderPickerFooter}
                    onBlur={() => this.setState({search: ''})}
                    modalStyle={{
                      borderRadius: 6,
                    }}
                    onValueChange={value => {
                      this.setState({
                        status_id: value.id,
                        search: '',
                      });
                    }}
                  />
                </View>
                <View style={{marginTop: 30}}>
                  <Text style={styles.titleForm}>Ghi chú</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      {...this.props}
                      value={this.state.note}
                      ref={'note'}
                      onChangeText={data => this.setState({note: data})}
                      returnKeyType={'next'}
                      placeholder="Ghi chú"
                      blurOnSubmit={false}
                      onSubmitEditing={event => {
                        this.refs.note.blur();
                      }}
                      style={{fontSize: 15}}
                    />
                  </View>
                </View>
              </View>
            ) : null}
            <TouchableOpacity onPress={() => this.saveLead()}>
              <LinearGradient
                colors={['#E26800', '#E00000']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.btnSubmit}>
                {!this.props.isSavingLead ? (
                  <Text style={{color: 'white'}}>Tạo lead</Text>
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
        </KeyboardAvoidingView>
      );
    }
  }
}

const styles = {
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
  btnSubmit: {
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
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
    color: theme.secondColor,
  },
};

export default AddLeadsComponent;
