import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  View,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import {CustomPicker} from 'react-native-custom-picker';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../styles';
import Spinkit from 'react-native-spinkit';
import Search from './common/Search';
import {convertVietText} from '../helper';
var {height, width} = Dimensions.get('window');

class MakeupClassComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedCourse: false,
      selectedLesson: false,
      selectedCourseIndex: 0,
      selectedHN: false,
      selectedSG: false,
      selectedAll: true,
      search: '',
    };
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

  renderPickerFooter(action) {
    return (
      <TouchableOpacity
        style={styles.headerFooterContainer}
        onPress={action.close.bind(this)}>
        <Text style={{color: '#C50000', fontSize: 19}}>Hủy</Text>
      </TouchableOpacity>
    );
  }

  renderPickerOption = settings => {
    const {item, getLabel} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>{getLabel(item)}</Text>
      </View>
    );
  };

  renderPickerField = settings => {
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
        {selectedItem && (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{color: 'black', fontSize: 16}}>
              {getLabel(selectedItem)}
            </Text>
            <Text>▼</Text>
          </View>
        )}
      </LinearGradient>
    );
  };

  getIndex = (array, value) => {
    return array.findIndex(x => x.name === value.name);
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

  getLessons = array => {
    let lessons = [];
    array.forEach(lesson => {
      lessons = [
        ...lessons,
        {
          id: lesson.id,
          name: 'Buổi ' + lesson.order + ': ' + lesson.name,
        },
      ];
    });

    return lessons;
  };

  renderBasedOnBase = () => {
    let HNBases = [3, 4, 8, 9];
    let data = {};
    for (let schedule of this.props.schedule) {
      let address = schedule.class.room.address;
      if (!(address in data)) {
        data[address] = [];
      }
      data[address].push(schedule);
    }
    if (this.state.selectedHN) {
      let filterData = {};
      for (let i in data) {
        let filterSchedules = data[i];
        for (let filterSchedule of filterSchedules) {
          if (HNBases.includes(filterSchedule.class.room.base_id)) {
            let filterAddress = filterSchedule.class.room.address;
            if (!(filterAddress in filterData)) {
              filterData[filterAddress] = [];
            }
            filterData[filterAddress].push(filterSchedule);
          }
        }
      }
      return filterData;
    } else if (this.state.selectedSG) {
      let filterData = {};
      for (let i in data) {
        let filterSchedules = data[i];
        for (let filterSchedule of filterSchedules) {
          if (!HNBases.includes(filterSchedule.class.room.base_id)) {
            let filterAddress = filterSchedule.class.room.address;
            if (!(filterAddress in filterData)) {
              filterData[filterAddress] = [];
            }
            filterData[filterAddress].push(filterSchedule);
          }
        }
      }
      return filterData;
    } else {
      return data;
    }
  };

  renderCourses = schedules => {
    return schedules.map(schedule => (
      <View style={{marginVertical: 15}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: schedule.class.course.icon_url}}
            style={styles.courseIcon}
          />
          <View style={{marginLeft: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.courseName}>{schedule.class.name}</Text>
              <Text style={{fontSize: 15, paddingLeft: 7}}>
                ► {schedule.class.room.name}
              </Text>
            </View>
            <Text style={{color: '#707070', marginTop: 7}}>
              ({getTime(schedule.start_time)}-{getTime(schedule.end_time)}){' '}
              {getDay(schedule.time)}, {convertDate(schedule.time)}
            </Text>
          </View>
        </View>
      </View>
    ));
  };

  render() {
    if (
      !this.props.isLoadingAllCourses &&
      this.props.courses &&
      this.props.courses[this.state.selectedCourseIndex]
    ) {
      let courseOptions = this.props.courses;
      let baseOptions = courseOptions[this.state.selectedCourseIndex].lessons;
      return (
        <ScrollView>
          <View style={{flex: 1, marginHorizontal: theme.mainHorizontal}}>
            <View style={{marginTop: 10}}>
              <Text style={styles.titleForm}>Chọn môn học</Text>
              <CustomPicker
                options={this.getSearchedResults(courseOptions)}
                getLabel={item => item.name}
                placeholder={'Chọn môn'}
                modalAnimationType={'fade'}
                optionTemplate={this.renderPickerOption}
                fieldTemplate={this.renderPickerField}
                headerTemplate={() => this.renderPickerHeader('Chọn môn')}
                footerTemplate={this.renderPickerFooter}
                onBlur={() => this.setState({search: ''})}
                modalStyle={{
                  borderRadius: 6,
                }}
                onValueChange={value => {
                  this.setState({
                    selectedCourse: true,
                    selectedLesson: false,
                    selectedCourseIndex: this.getIndex(courseOptions, value),
                    selectedHN: false,
                    selectedSG: false,
                    search: '',
                  });
                }}
              />
            </View>
            {this.state.selectedCourse ? (
              <View style={{marginTop: 30}}>
                <Text style={styles.titleForm}>Chọn buổi</Text>
                <CustomPicker
                  options={this.getSearchedResults(
                    this.getLessons(baseOptions),
                  )}
                  getLabel={item => item.name}
                  placeholder={'Chọn buổi'}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderPickerField}
                  headerTemplate={() => this.renderPickerHeader('Chọn buổi')}
                  footerTemplate={this.renderPickerFooter}
                  onBlur={() => this.setState({search: ''})}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={value => {
                    this.setState({selectedLesson: true, search: ''});
                    this.props.loadSchedule(value.id);
                  }}
                />
              </View>
            ) : null}
            {this.state.selectedLesson ? (
              <View style={styles.containerTag}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      selectedAll: true,
                      selectedHN: false,
                      selectedSG: false,
                    })
                  }>
                  <LinearGradient
                    colors={
                      this.state.selectedAll
                        ? ['#F6F6F6', '#F6F6F6']
                        : ['white', 'white']
                    }
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.tag}>
                    <Text style={{color: 'black'}}>Tất cả</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      selectedHN: true,
                      selectedAll: false,
                      selectedSG: false,
                    })
                  }>
                  <LinearGradient
                    colors={
                      this.state.selectedHN
                        ? ['#F6F6F6', '#F6F6F6']
                        : ['white', 'white']
                    }
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.tag}>
                    <Text style={{color: 'black'}}>Hà Nội</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      selectedSG: true,
                      selectedAll: false,
                      selectedHN: false,
                    })
                  }>
                  <LinearGradient
                    colors={
                      this.state.selectedSG
                        ? ['#F6F6F6', '#F6F6F6']
                        : ['white', 'white']
                    }
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.tag}>
                    <Text style={{color: 'black'}}>Sài Gòn</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : null}
            {this.props.isLoadingScheduleClasses ? (
              <View style={{flex: 1}}>
                <View style={styles.container}>
                  <Spinkit
                    isVisible
                    color={theme.mainColor}
                    type="Wave"
                    size={width / 8}
                  />
                </View>
              </View>
            ) : (
              Object.entries(this.renderBasedOnBase()).map(([key, value]) => (
                <View style={styles.courseContainer}>
                  <View style={styles.subCourseContainer}>
                    <Text style={styles.courseInfoContainer}>{key}</Text>
                  </View>
                  <View>{this.renderCourses(value)}</View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View style={styles.container}>
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

function convertDate(inputFormat) {
  function pad(s) {
    return s < 10 ? '0' + s : s;
  }
  let d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
}

function getDay(date) {
  let dt = new Date(date);
  let day = dt.getDay();
  switch (day) {
    case 0:
      return 'Chủ nhật';
    case 1:
      return 'Thứ 2';
    case 2:
      return 'Thứ 3';
    case 3:
      return 'Thứ 4';
    case 4:
      return 'Thứ 5';
    case 5:
      return 'Thứ 6';
    case 6:
      return 'Thứ 7';
  }
}

function getTime(time) {
  time = time.slice(0, 2);
  time = parseInt(time);
  return time + 'h';
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientSize: {
    marginTop: 8,
    height: 45,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
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
  tag: {
    paddingHorizontal: 20,
    marginRight: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTag: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 30,
  },
  courseIcon: theme.mainAvatar,
  courseName: {
    fontWeight: '600',
    fontSize: 22,
  },
  courseContainer: {
    marginTop: 30,
  },
  subCourseContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    flex: 1,
  },
  courseInfoContainer: {
    fontSize: 16,
    marginLeft: 7,
    flexWrap: 'wrap',
    flex: 1,
  },
  titleForm: {
    color: 'black',
    fontSize: 14,
  },
};

export default MakeupClassComponent;
