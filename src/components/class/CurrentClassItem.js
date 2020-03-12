import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Thumbnail} from 'native-base';
import theme from '../../styles';
import {getShortName, isEmptyInput} from '../../helper';
import moment from 'moment';

var {height, width} = Dimensions.get('window');
var maxWidthProcess = width / 4;

class CurrentClassItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  getCurrentLesson = () => {
    const {selectedDate, class_lesson} = this.props;
    for (let lesson of class_lesson) {
      if (lesson.time === selectedDate) {
        return lesson;
      }
    }
    return null;
  };

  render() {
    const {
      name,
      icon,
      teacher,
      teacher_assistant,
      base,
      room,
      schedule,
      classItem,
    } = this.props;
    let currentLesson = this.getCurrentLesson();
    let total_took_attendances = !isEmptyInput(currentLesson)
      ? currentLesson.analytics_attendance.total_took_attendances
      : 0;
    let total_attendances = !isEmptyInput(currentLesson)
      ? currentLesson.analytics_attendance.total_attendances
      : 0;
    let tmpTotalAttendance =
      total_attendances < total_took_attendances
        ? total_attendances
        : total_took_attendances;
    let nameSelectedDate = !isEmptyInput(currentLesson)
      ? moment(this.props.selectedDate)
          .locale('vi')
          .format('dddd') +
        ' ' +
        moment(this.props.selectedDate)
          .locale('vi')
          .format('L')
      : null;
    nameSelectedDate = !isEmptyInput(nameSelectedDate)
      ? nameSelectedDate.charAt(0).toUpperCase() + nameSelectedDate.slice(1)
      : '';
    let startTime = !isEmptyInput(currentLesson)
      ? currentLesson.start_time.substring(0, 5).replace(':', 'h')
      : '';
    let endTime = !isEmptyInput(currentLesson)
      ? currentLesson.end_time.substring(0, 5).replace(':', 'h')
      : '';
    return (
      <TouchableOpacity
        onPress={() => {
          let classModifiedItem = {
            ...classItem,
            lesson: [this.getCurrentLesson()],
          };
          this.props.onSelectedItem(classModifiedItem);
        }}>
        <View style={styles.itemContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Thumbnail small source={{uri: icon}} style={theme.mainAvatar} />
              <Text numberOfLines={1} style={styles.className}>
                {name}
              </Text>
            </View>
            <Image
              source={require('../../../assets/img/icons8-more-than-100.png')}
              style={{width: 15, height: 15}}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.placeholderAva} />
            <View style={styles.infoContainer}>
              <View style={styles.containerSubTitle}>
                {!isEmptyInput(currentLesson) &&
                !isEmptyInput(currentLesson.lesson) &&
                !isEmptyInput(currentLesson.lesson.order) ? (
                  <View
                    style={{
                      ...styles.card,
                      ...{
                        backgroundColor: '#2ACC4C',
                        marginRight: 5,
                      },
                    }}>
                    <Text style={styles.saler}>
                      Buổi {currentLesson.lesson.order}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
                {teacher ? (
                  <View
                    style={{
                      ...styles.card,
                      ...{
                        backgroundColor:
                          !teacher.color || teacher.color === ''
                            ? theme.processColor1
                            : '#' + teacher.color,
                        marginRight: 5,
                      },
                    }}>
                    <Text style={styles.saler}>
                      {getShortName(teacher.name)}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
                {teacher_assistant ? (
                  <View
                    style={{
                      ...styles.card,
                      ...{
                        backgroundColor:
                          !teacher_assistant.color ||
                          teacher_assistant.color === ''
                            ? theme.processColor1
                            : '#' + teacher_assistant.color,
                      },
                    }}>
                    <Text style={styles.saler}>
                      {getShortName(teacher_assistant.name)}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
              </View>
              <View>
                {!isEmptyInput(nameSelectedDate) &&
                !isEmptyInput(startTime) &&
                !isEmptyInput(endTime) ? (
                  <Text
                    numberOfLines={1}
                    style={[styles.classInfoContainer, {paddingTop: 0}]}>
                    {nameSelectedDate} - {startTime}-{endTime}
                  </Text>
                ) : null}
                {schedule ? (
                  <Text numberOfLines={1} style={styles.classInfoContainer}>
                    {schedule.name}
                  </Text>
                ) : null}
                {room && base ? (
                  <Text numberOfLines={1} style={styles.classInfoContainer}>
                    {room.name} - {base.name}
                  </Text>
                ) : null}
              </View>
              <View style={styles.processAndText}>
                <View
                  style={{
                    ...styles.process,
                    ...styles.containerProcess,
                    ...{
                      backgroundColor: '#F6F6F6',
                    },
                  }}>
                  <Animated.View
                    style={[
                      styles.process,
                      styles.bar,
                      {
                        width:
                          total_took_attendances !== 0
                            ? (maxWidthProcess * tmpTotalAttendance) /
                              total_took_attendances
                            : maxWidthProcess,
                        backgroundColor: '#2ACC4C',
                      },
                    ]}
                  />
                </View>
                <Text style={styles.textProcess}>
                  {total_attendances}/{total_took_attendances} học viên
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    let classModifiedItem = {
                      ...classItem,
                      lesson: [this.getCurrentLesson()],
                    };
                    this.props.openQrCode(classModifiedItem);
                  }}>
                  <View style={styles.button}>
                    <Text style={{fontSize: 16}}>Điểm danh</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  className: {
    fontSize: theme.title.fontSize,
    fontWeight: theme.title.fontWeight,
    marginLeft: 15,
    marginRight: 5,
  },
  itemContainer: {
    paddingVertical: 16,
  },
  placeholderAva: theme.mainAvatar,
  infoContainer: {
    marginLeft: 15,
    flex: 1,
  },
  card: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saler: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  containerSubTitle: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#F6F6F6',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  classInfoContainer: {
    paddingTop: 5,
    flex: 1,
    flexWrap: 'wrap',
    color: '#707070',
  },
  processAndText: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerProcess: {
    marginVertical: 5,
    backgroundColor: theme.secondColorOpacity,
    width: maxWidthProcess,
  },
  process: {
    borderRadius: 5,
    height: 5,
    backgroundColor: theme.secondColor,
  },
  textProcess: {
    marginLeft: 15,
  },
};

export default CurrentClassItem;
