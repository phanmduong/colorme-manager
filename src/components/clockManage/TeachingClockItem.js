import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import theme from '../../styles';
import {Thumbnail} from 'native-base';
import {convertTimeToSecond} from '../../helper';
import {TEACHER_ASSISTANT_ROLE, TEACHER_ROLE} from '../../constants/constant';

class TeachingClockItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  checkInOutSpan = (teacher) => {
    let data = {
      checkInBackgroundColor: '#999999',
      checkOutBackgroundColor: '#999999',
    };

    if (
      teacher.start_teaching_time &&
      teacher.attendance &&
      teacher.attendance.check_in_time
    ) {
      const check_in_time = convertTimeToSecond(
        teacher.attendance.check_in_time,
      );
      const start_teaching_time = convertTimeToSecond(
        teacher.start_teaching_time,
      );
      if (check_in_time <= start_teaching_time) {
        data.checkInBackgroundColor = '#69C655';
      } else {
        data.checkInBackgroundColor = '#E53223';
      }
    }

    if (
      teacher.end_teaching_time &&
      teacher.attendance &&
      teacher.attendance.check_out_time
    ) {
      const check_out_time = convertTimeToSecond(
        teacher.attendance.check_out_time,
      );
      const end_teaching_time = convertTimeToSecond(teacher.end_teaching_time);
      if (check_out_time >= end_teaching_time) {
        data.checkOutBackgroundColor = '#69C655';
      } else {
        data.checkOutBackgroundColor = '#E53223';
      }
    }

    return data;
  };

  renderTeacher = (role) => {
    const {attendance_teachers, attendance_teacher_assistants} = this.props;
    let teachers =
      role === TEACHER_ROLE
        ? attendance_teachers
        : attendance_teacher_assistants;
    return teachers.map((teacher) => {
      const checkInOutSpan = this.checkInOutSpan(teacher);
      return (
        <View style={styles.checkInOutContainer}>
          <Text style={styles.shiftInfo}>
            {role === TEACHER_ROLE ? 'Giảng viên' : 'Trợ giảng'}:{' '}
            {teacher.staff && teacher.staff.name
              ? teacher.staff.name
              : 'Không có ai'}
          </Text>
          <View style={styles.checkInOutRow}>
            <View
              style={[
                styles.checkInOutInfoContainer,
                {
                  marginRight: 10,
                  backgroundColor: checkInOutSpan.checkInBackgroundColor,
                },
              ]}>
              <Text style={styles.checkInOutTime}>
                {teacher.attendance && teacher.attendance.check_in_time
                  ? teacher.attendance.check_in_time
                  : 'Chưa check in'}
              </Text>
            </View>
            <View
              style={[
                styles.checkInOutInfoContainer,
                {
                  backgroundColor: checkInOutSpan.checkOutBackgroundColor,
                },
              ]}>
              <Text style={styles.checkInOutTime}>
                {teacher.attendance && teacher.attendance.check_out_time
                  ? teacher.attendance.check_out_time
                  : 'Chưa check out'}
              </Text>
            </View>
          </View>
        </View>
      );
    });
  };

  render() {
    const {name, icon, description, room, study_time} = this.props;
    return (
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <View style={styles.headerContainer}>
            <Thumbnail small source={{uri: icon}} style={theme.mainAvatar} />
            <Text numberOfLines={1} style={styles.className}>
              {name}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.placeholderAva} />
            <View style={styles.infoContainer}>
              <View>
                {study_time ? (
                  <Text
                    numberOfLines={1}
                    style={[styles.classInfoContainer, {paddingTop: 0}]}>
                    {study_time}
                  </Text>
                ) : null}
                {description ? (
                  <Text numberOfLines={1} style={styles.classInfoContainer}>
                    {description}
                  </Text>
                ) : null}
                {room && room.name && room.address ? (
                  <Text numberOfLines={1} style={styles.classInfoContainer}>
                    {room.name} - {room.address}
                  </Text>
                ) : null}
                {this.renderTeacher(TEACHER_ROLE)}
                {this.renderTeacher(TEACHER_ASSISTANT_ROLE)}
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholderAva: theme.mainAvatar,
  infoContainer: {
    marginLeft: 15,
    flex: 1,
  },
  classInfoContainer: {
    paddingTop: 5,
    flex: 1,
    flexWrap: 'wrap',
    color: 'black',
  },
  checkInOutContainer: {
    marginTop: 5,
  },
  checkInOutRow: {
    flexDirection: 'row',
  },
  checkInOutInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginTop: 5,
  },
  checkInOutTime: {
    color: 'white',
  },
};

export default TeachingClockItem;
