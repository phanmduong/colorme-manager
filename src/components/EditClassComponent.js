import React from 'react';
import {
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {convertVietText, isEmptyInput} from '../helper';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import LinearGradient from 'react-native-linear-gradient';
import Spinkit from 'react-native-spinkit';
import {CustomPicker} from 'react-native-custom-picker';
import theme from '../styles';
import Search from './common/Search';
var {height, width} = Dimensions.get('window');

export const TYPE_CLASSES = [
  {
    name: 'Hoạt động',
    id: 'active',
  },
  {
    name: 'Chờ',
    id: 'waiting',
  },
];

class EditClassComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    let classData = this.props.navigation.getParam('classData');
    this.state = {
      id: !classData.id ? '' : classData.id,
      name: !classData.name ? '' : classData.name,
      description: !classData.description ? '' : classData.description,
      target: !classData.target ? '' : '' + classData.target,
      regis_target: !classData.regis_target
        ? ''
        : '' + classData.regis_target,
      link_drive: !classData.link_drive ? '' : classData.link_drive,
      study_time: !classData.study_time ? '' : classData.study_time,
      datestart: !classData.datestart_en ? '' : moment(classData.datestart_en),
      room_id: !classData.room ? '' : classData.room.id,
      schedule_id: !classData.schedule_id ? '' : classData.schedule_id,
      type: !classData.type ? '' : classData.type,
      course_id: !classData.course ? '' : classData.course.id,
      gen_id: !classData.gen ? '' : classData.gen.id,
      teacher_id:
        !classData.teacher || !classData.teacher.id ? '' : classData.teacher.id,
      teaching_assistant_id:
        !classData.teacher_assistant || !classData.teacher_assistant.id
          ? ''
          : classData.teacher_assistant.id,
      status: !classData.status ? '' : classData.status,
      teachers: [],
      teaching_assistants: [],
      date_end: !classData.datestart_en ? '' : moment(classData.datestart_en),
      enroll_start_date: !classData.enroll_start_date
        ? ''
        : moment(classData.enroll_start_date),
      enroll_end_date: !classData.enroll_end_date
        ? ''
        : moment(classData.enroll_end_date),
      isDateStartPickerVisible: false,
      isDateEndPickerVisible: false,
      isEnrollStartPickerVisible: false,
      isEnrollEndPickerVisible: false,
      search: '',
    };
  }

  openDateStartPicker = () => {
    this.setState({isDateStartPickerVisible: true});
  };

  openDateEndPicker = () => {
    this.setState({isDateEndPickerVisible: true});
  };

  openEnrollStartPicker = () => {
    this.setState({isEnrollStartPickerVisible: true});
  };

  openEnrollEndPicker = () => {
    this.setState({isEnrollEndPickerVisible: true});
  };

  handleDateStartPicked = date => {
    this.setState({isDateStartPickerVisible: false, datestart: moment(date)});
  };

  handleDateEndPicked = date => {
    this.setState({isDateEndPickerVisible: false, date_end: moment(date)});
  };

  handleEnrollStartPicked = date => {
    this.setState({
      isEnrollStartPickerVisible: false,
      enroll_start_date: moment(date),
    });
  };

  handleEnrollEndPicked = date => {
    this.setState({
      isEnrollEndPickerVisible: false,
      enroll_end_date: moment(date),
    });
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

  getDefault = (array, comparedId) => {
    for (let item of array) {
      if (item.id === comparedId) {
        return item;
      }
    }
    return null;
  };

  getRooms = () => {
    let rooms = [];
    this.props.rooms.forEach(room => {
      rooms = [
        ...rooms,
        {
          id: room.id,
          name: room.base + ' - ' + room.address + ' - ' + room.name,
        },
      ];
    });
    return rooms;
  };

  submitClass = () => {
    if (
      isEmptyInput(this.state.name) ||
      isEmptyInput(this.state.target) ||
      isEmptyInput(this.state.regis_target) ||
      isEmptyInput(this.state.study_time) ||
      isEmptyInput(this.state.room_id) ||
      isEmptyInput(this.state.type) ||
      isEmptyInput(this.state.course_id) ||
      isEmptyInput(this.state.gen_id)
    ) {
      Alert.alert('Thông báo', 'Bạn phải nhập đủ thông tin');
    } else {
      let classData = {
        id: this.state.id,
        datestart: isEmptyInput(this.state.datestart)
          ? ''
          : this.state.datestart.format('YYYY-MM-DD'),
        name: this.state.name,
        schedule_id: this.state.schedule_id,
        room_id: this.state.room_id,
        description: this.state.description,
        link_drive: this.state.link_drive,
        gen_id: this.state.gen_id,
        target: this.state.target,
        regis_target: this.state.regis_target,
        course_id: this.state.course_id,
        teaching_assistant_id: this.state.teaching_assistant_id,
        teacher_id: this.state.teacher_id,
        study_time: this.state.study_time,
        type: this.state.type,
        status: this.state.status,
        teachers: [],
        teaching_assistants: [],
      };
      this.props.addClass(classData);
      if (this.props.errorUpdatingClass) {
        Alert.alert('Thông báo', 'Có lỗi xảy ra!');
      } else {
        Alert.alert('Thông báo', 'Cập nhật thành công');
        this.props.navigation.navigate('Class');
      }
    }
  };

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
          extraInputStyle={{width: width - 38 - 80}}
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

  render() {
    if (this.props.loadingInfoCreateClass) {
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
          enabled
          keyboardVerticalOffset={100}>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>
                Chọn môn học <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <CustomPicker
                options={this.getSearchedResults(this.props.courses)}
                defaultValue={this.getDefault(
                  this.props.courses,
                  this.state.course_id,
                )}
                getLabel={item => item.name}
                placeholder={'Chọn môn học'}
                modalAnimationType={'fade'}
                optionTemplate={this.renderPickerOption}
                fieldTemplate={this.renderPickerField}
                headerTemplate={() => this.renderPickerHeader('Chọn môn học')}
                footerTemplate={this.renderPickerFooter}
                onBlur={() => this.setState({search: ''})}
                modalStyle={{
                  borderRadius: 6,
                }}
                onValueChange={value => {
                  this.setState({
                    course_id: value.id,
                    search: '',
                  });
                }}
              />
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>
                Chọn phòng học <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <CustomPicker
                options={this.getSearchedResults(this.getRooms())}
                defaultValue={this.getDefault(
                  this.props.rooms,
                  this.state.room_id,
                )}
                getLabel={item => item.name}
                placeholder={'Chọn phòng học'}
                modalAnimationType={'fade'}
                optionTemplate={this.renderPickerOption}
                fieldTemplate={this.renderPickerField}
                headerTemplate={() => this.renderPickerHeader('Chọn phòng học')}
                footerTemplate={this.renderPickerFooter}
                onBlur={() => this.setState({search: ''})}
                modalStyle={{
                  borderRadius: 6,
                }}
                onValueChange={value => {
                  this.setState({
                    room_id: value.id,
                    search: '',
                  });
                }}
              />
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>
                Tên lớp <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.name}
                  onChangeText={data => this.setState({name: data})}
                  returnKeyType={'next'}
                  placeholder="Tên lớp"
                  blurOnSubmit={false}
                  onSubmitEditing={event => {
                    this.refs.description.focus();
                  }}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Mô tả ngắn</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.description}
                  autoCapitalize={'none'}
                  ref={'description'}
                  onChangeText={data => this.setState({description: data})}
                  returnKeyType={'next'}
                  placeholder="Mô tả"
                  blurOnSubmit={false}
                  style={{fontSize: 15}}
                  onSubmitEditing={event => {
                    this.refs.target.focus();
                  }}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>
                Số học viên tối đa <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.target}
                  autoCapitalize={'none'}
                  keyboardType={'number-pad'}
                  ref={'target'}
                  onChangeText={data => this.setState({target: data})}
                  returnKeyType={'next'}
                  placeholder="Chỉ tiêu nộp tiền"
                  blurOnSubmit={false}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>
                Số đăng kí tối đa <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.regis_target}
                  autoCapitalize={'none'}
                  keyboardType={'number-pad'}
                  ref={'regis_target'}
                  onChangeText={data => this.setState({regis_target: data})}
                  returnKeyType={'next'}
                  placeholder="Chỉ tiêu đăng kí"
                  blurOnSubmit={false}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Chọn lịch học</Text>
              <CustomPicker
                options={this.getSearchedResults(this.props.schedules)}
                defaultValue={this.getDefault(
                  this.props.schedules,
                  this.state.schedule_id,
                )}
                getLabel={item => item.name}
                placeholder={'Chọn lịch học'}
                modalAnimationType={'fade'}
                optionTemplate={this.renderPickerOption}
                fieldTemplate={this.renderPickerField}
                headerTemplate={() => this.renderPickerHeader('Chọn lịch học')}
                footerTemplate={this.renderPickerFooter}
                modalStyle={{
                  borderRadius: 6,
                }}
                onValueChange={value => {
                  this.setState({
                    schedule_id: value.id,
                    search: '',
                  });
                }}
              />
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Ngày khai giảng</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={this.openDateStartPicker}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                    }}>
                    {isEmptyInput(this.state.datestart)
                      ? 'YYYY-MM-DD'
                      : this.state.datestart.format('YYYY-MM-DD')}
                  </Text>
                  <Text>▼</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Ngày bế giảng (dự kiến)</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={this.openDateEndPicker}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                    }}>
                    {isEmptyInput(this.state.date_end)
                      ? 'YYYY-MM-DD'
                      : this.state.date_end.format('YYYY-MM-DD')}
                  </Text>
                  <Text>▼</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>
                Chọn khóa học <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <CustomPicker
                options={this.getSearchedResults(this.props.genData)}
                defaultValue={this.getDefault(
                  this.props.genData,
                  this.state.gen_id,
                )}
                getLabel={item => 'Khóa ' + item.name}
                placeholder={'Chọn khóa học'}
                modalAnimationType={'fade'}
                optionTemplate={this.renderPickerOption}
                fieldTemplate={this.renderPickerField}
                headerTemplate={() => this.renderPickerHeader('Chọn khóa học')}
                footerTemplate={this.renderPickerFooter}
                modalStyle={{
                  borderRadius: 6,
                }}
                onValueChange={value => {
                  this.setState({
                    gen_id: value.id,
                    search: '',
                  });
                }}
              />
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Bắt đầu tuyển sinh từ</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={this.openEnrollStartPicker}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                    }}>
                    {isEmptyInput(this.state.enroll_start_date)
                      ? 'YYYY-MM-DD'
                      : this.state.enroll_start_date.format('YYYY-MM-DD')}
                  </Text>
                  <Text>▼</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Kết thúc tuyển sinh sau</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={this.openEnrollEndPicker}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                    }}>
                    {isEmptyInput(this.state.enroll_end_date)
                      ? 'YYYY-MM-DD'
                      : this.state.enroll_end_date.format('YYYY-MM-DD')}
                  </Text>
                  <Text>▼</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>
                Chọn thể loại lớp <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <CustomPicker
                options={this.getSearchedResults(TYPE_CLASSES)}
                defaultValue={this.getDefault(TYPE_CLASSES, this.state.type)}
                getLabel={item => item.name}
                placeholder={'Chọn thể loại'}
                modalAnimationType={'fade'}
                optionTemplate={this.renderPickerOption}
                fieldTemplate={this.renderPickerField}
                headerTemplate={() => this.renderPickerHeader('Chọn thể loại')}
                footerTemplate={this.renderPickerFooter}
                modalStyle={{
                  borderRadius: 6,
                }}
                onValueChange={value => {
                  this.setState({
                    type: value.id,
                    search: '',
                  });
                }}
              />
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Link Driver</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.link_drive}
                  autoCapitalize={'none'}
                  ref={'link_drive'}
                  onChangeText={data => this.setState({link_drive: data})}
                  returnKeyType={'next'}
                  placeholder="Link Driver"
                  blurOnSubmit={false}
                  onSubmitEditing={event => {
                    this.refs.study_time.focus();
                  }}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>
                Giờ học <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.study_time}
                  onChangeText={data => this.setState({study_time: data})}
                  returnKeyType={'next'}
                  ref={'study_time'}
                  placeholder="Giờ học"
                  blurOnSubmit={false}
                  onSubmitEditing={event => {
                    this.refs.study_time.focus();
                  }}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Chọn giảng viên</Text>
              <CustomPicker
                options={this.getSearchedResults(this.props.staffs)}
                defaultValue={this.getDefault(
                  this.props.staffs,
                  this.state.teacher_id,
                )}
                getLabel={item => item.name}
                placeholder={'Chọn giảng viên'}
                modalAnimationType={'fade'}
                optionTemplate={this.renderPickerOption}
                fieldTemplate={this.renderPickerField}
                headerTemplate={() =>
                  this.renderPickerHeader('Chọn giảng viên')
                }
                footerTemplate={this.renderPickerFooter}
                onBlur={() => this.setState({search: ''})}
                modalStyle={{
                  borderRadius: 6,
                }}
                onValueChange={value => {
                  this.setState({
                    teacher_id: value.id,
                    search: '',
                  });
                }}
              />
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Chọn trợ giảng</Text>
              <CustomPicker
                options={this.getSearchedResults(this.props.staffs)}
                defaultValue={this.getDefault(
                  this.props.staffs,
                  this.state.teaching_assistant_id,
                )}
                getLabel={item => item.name}
                placeholder={'Chọn trợ giảng'}
                modalAnimationType={'fade'}
                optionTemplate={this.renderPickerOption}
                fieldTemplate={this.renderPickerField}
                headerTemplate={() => this.renderPickerHeader('Chọn trợ giảng')}
                footerTemplate={this.renderPickerFooter}
                onBlur={() => this.setState({search: ''})}
                modalStyle={{
                  borderRadius: 6,
                }}
                onValueChange={value => {
                  this.setState({
                    teaching_assistant_id: value.id,
                    search: '',
                  });
                }}
              />
            </View>

            <TouchableOpacity onPress={() => this.submitClass()}>
              <LinearGradient
                colors={['#E26800', '#E00000']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.btnSubmit}>
                {!this.props.isUpdatingClass ? (
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
              isVisible={this.state.isDateStartPickerVisible}
              onConfirm={this.handleDateStartPicked}
              onCancel={() => this.setState({isDateStartPickerVisible: false})}
            />
            <DateTimePicker
              isVisible={this.state.isDateEndPickerVisible}
              onConfirm={this.handleDateEndPicked}
              onCancel={() => this.setState({isDateEndPickerVisible: false})}
            />
            <DateTimePicker
              isVisible={this.state.isEnrollStartPickerVisible}
              onConfirm={this.handleEnrollStartPicked}
              onCancel={() =>
                this.setState({isEnrollStartPickerVisible: false})
              }
            />
            <DateTimePicker
              isVisible={this.state.isEnrollEndPickerVisible}
              onConfirm={this.handleEnrollEndPicked}
              onCancel={() => this.setState({isEnrollEndPickerVisible: false})}
            />
          </ScrollView>
        </KeyboardAvoidingView>
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
    paddingHorizontal: theme.mainHorizontal,
    marginBottom: 10,
    flex: 1,
  },
  btnSubmit: {
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
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
};

export default EditClassComponent;
