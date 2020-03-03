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

  renderCoursePickerFooter(action) {
    return (
      <TouchableOpacity
        style={styles.headerFooterContainer}
        onPress={action.close.bind(this)}>
        <Text style={{color: '#C50000', fontSize: 19}}>Hủy</Text>
      </TouchableOpacity>
    );
  }

  renderLessonPickerHeader = () => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>Chọn buổi</Text>
      </View>
    );
  };

  renderLessonPickerOption = settings => {
    const {item, getLabel} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>
          Buổi {item.order}: {getLabel(item)}
        </Text>
      </View>
    );
  };

  renderLessonPickerField = settings => {
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
              Buổi {selectedItem.order}: {getLabel(selectedItem)}
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

  renderBasedOnBase = () => {
    let HNbase = [3, 4, 8, 9];
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
      for (var i in data) {
        let filterSchedules = data[i];
        for (let filterSchedule of filterSchedules) {
          if (HNbase.includes(filterSchedule.class.room.base_id)) {
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
      for (var i in data) {
        let filterSchedules = data[i];
        for (let filterSchedule of filterSchedules) {
          if (!HNbase.includes(filterSchedule.class.room.base_id)) {
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
          <View style={{flex: 1, marginHorizontal: 16}}>
            <View style={{marginTop: 10}}>
              <Text style={styles.titleForm}>Chọn môn học</Text>
              <CustomPicker
                options={courseOptions}
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
                    selectedLesson: false,
                    selectedCourseIndex: this.getIndex(courseOptions, value),
                    selectedHN: false,
                    selectedSG: false,
                  });
                }}
              />
            </View>
            {this.state.selectedCourse ? (
              <View style={{marginTop: 30}}>
                <Text style={styles.titleForm}>Chọn buổi</Text>
                <CustomPicker
                  options={baseOptions}
                  getLabel={item => item.name}
                  placeholder={'Chọn buổi'}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderLessonPickerOption}
                  fieldTemplate={this.renderLessonPickerField}
                  headerTemplate={this.renderLessonPickerHeader}
                  footerTemplate={this.renderCoursePickerFooter}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={value => {
                    this.setState({selectedLesson: true});
                    this.props.loadSchedule(value.id);
                  }}
                />
              </View>
            ) : null}
            {this.state.selectedLesson ? (
              <View style={styles.containerTag}>
                {this.state.selectedAll ? (
                  <TouchableOpacity>
                    <LinearGradient
                      colors={['#E26800', '#E00000']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={styles.tag}>
                      <Text style={{color: 'white'}}>Tất cả</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.tag}
                    onPress={() =>
                      this.setState({
                        selectedAll: true,
                        selectedHN: false,
                        selectedSG: false,
                      })
                    }>
                    <Text>Tất cả</Text>
                  </TouchableOpacity>
                )}
                {this.state.selectedHN ? (
                  <TouchableOpacity>
                    <LinearGradient
                      colors={['#E26800', '#E00000']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={styles.tag}>
                      <Text style={{color: 'white'}}>Hà Nội</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.tag}
                    onPress={() =>
                      this.setState({
                        selectedHN: true,
                        selectedAll: false,
                        selectedSG: false,
                      })
                    }>
                    <Text>Hà Nội</Text>
                  </TouchableOpacity>
                )}
                {this.state.selectedSG ? (
                  <TouchableOpacity>
                    <LinearGradient
                      colors={['#E26800', '#E00000']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={styles.tag}>
                      <Text style={{color: 'white'}}>Sài Gòn</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.tag}
                    onPress={() =>
                      this.setState({
                        selectedSG: true,
                        selectedAll: false,
                        selectedHN: false,
                      })
                    }>
                    <Text>Sài Gòn</Text>
                  </TouchableOpacity>
                )}
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
  courseIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
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
