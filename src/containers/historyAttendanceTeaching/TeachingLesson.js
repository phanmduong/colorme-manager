import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'native-base';
import {calculatorAttendance} from '../../helper';
import theme from '../../styles';
import {observer} from 'mobx-react';

@observer
class TeachingLesson extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {lesson} = this.props;
    const data = this.getTimeAttendance(lesson);
    return (
      <View style={styles.register}>
        <Text style={styles.titleShift}>Buổi {lesson.order}</Text>
        {this.progressAttendance(data)}
        <View style={styles.timeAttendance}>
          <Text>
            {lesson.check_in ? (
              <Text style={{color: 'black'}}>{lesson.check_in.time}</Text>
            ) : (
              <Text style={styles.textTime}>--:--</Text>
            )}
            <Text style={styles.textTime}>/{lesson.start_time}</Text>
          </Text>
          <Text>
            {lesson.check_out ? (
              <Text style={{color: 'black'}}>{lesson.check_out.time}</Text>
            ) : (
              <Text style={styles.textTime}>--:--</Text>
            )}
            <Text style={styles.textTime}>/{lesson.end_time}</Text>
          </Text>
        </View>
      </View>
    );
  }

  getTimeAttendance(lesson) {
    const checkInTime = lesson.check_in ? lesson.check_in.time : '';
    const checkOutTime = lesson.check_out ? lesson.check_out.time : '';

    return calculatorAttendance(
      checkInTime,
      checkOutTime,
      lesson.start_time,
      lesson.end_time,
    );
  }

  progressAttendance(data) {
    // const checkedOut = !!lesson.check_out;
    return (
      <View style={styles.progressBar}>
        <View
          style={{
            ...styles.emptyArriveSpan,
            width: data.empty_arrive_span + '%',
          }}
        />
        <View
          style={{
            ...styles.earlyArriveSpan,
            width: data.early_arrive_span + '%',
          }}
        />
        <View
          style={{...styles.lateArriveSpan, width: data.late_arrive_span + '%'}}
        />
        <View
          style={{...styles.teachingSpan, width: data.teaching_span + '%'}}
        />
        <View
          style={{...styles.earlyLeaveSpan, width: data.early_leave_span + '%'}}
        />
        <View
          style={{...styles.lateLeaveSpan, width: data.late_leave_span + '%'}}
        />
      </View>
    );
  }
}

const heightProgress = 6;
const borderProgress = heightProgress / 2;

const styles = {
  register: {
    backgroundColor: '#FFF',
    marginVertical: 5,
    padding: 5,
    borderRadius: 3,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
  },
  titleShift: {
    color: 'blank',
    textAlign: 'left',
  },
  emptyArriveSpan: {
    backgroundColor: 'transparent',
  },
  progressBar: {
    width: '100%',
    backgroundColor: '#e9e9e9',
    flexDirection: 'row',
    height: heightProgress,
    marginVertical: 5,
    borderRadius: borderProgress,
  },
  earlyArriveSpan: {
    backgroundColor: theme.warningColor,
    borderBottomLeftRadius: borderProgress,
    borderTopLeftRadius: borderProgress,
  },
  lateArriveSpan: {
    backgroundColor: theme.dangerColor,
  },
  teachingSpan: {
    backgroundColor: theme.successColor,
  },
  earlyLeaveSpan: {
    backgroundColor: theme.dangerColor,
  },
  lateLeaveSpan: {
    backgroundColor: theme.warningColor,
    borderBottomRightRadius: borderProgress,
    borderTopRightRadius: borderProgress,
  },
  noCheckoutSpan: {
    backgroundColor: theme.warningColor,
  },
  timeAttendance: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  textTime: {
    color: '#898989',
  },
};

export default TeachingLesson;
