import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import TeachingClockItem from './TeachingClockItem';
import theme from '../../styles';
import Spinkit from 'react-native-spinkit';
import moment from 'moment';
const {width, height} = Dimensions.get('window');

class ClockManageTeachingComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderTeachingClockItems = (classes) => {
    return classes.map((classItem) => (
      <TeachingClockItem
        key={classItem.id}
        name={classItem.name}
        icon={classItem.course.icon_url}
        room={classItem.room}
        description={classItem.description}
        study_time={classItem.study_time}
        attendance_teachers={classItem.attendance_teachers}
        attendance_teacher_assistants={classItem.attendance_teacher_assistants}
      />
    ));
  };

  renderCurrentClasses = () => {
    let currentClasses = [];
    const {classes} = this.props;
    if (classes) {
      classes.forEach((classItem) => {
        if (classItem.start_time && classItem.end_time) {
          const currentTime = moment();
          const startTime = moment(
            moment.unix(this.props.selectedDate).format('YYYY-MM-DD') +
              ' ' +
              classItem.start_time,
          );
          const endTime = moment(
            moment.unix(this.props.selectedDate).format('YYYY-MM-DD') +
              ' ' +
              classItem.end_time,
          );
          if (currentTime.isAfter(startTime) && currentTime.isBefore(endTime)) {
            currentClasses.push(classItem);
          }
        }
      });
    }

    if (currentClasses.length > 0) {
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Đang diễn ra</Text>
          {this.renderTeachingClockItems(currentClasses)}
        </View>
      );
    }
  };

  renderPastClasses = () => {
    let pastClasses = [];
    const {classes} = this.props;
    if (classes) {
      classes.forEach((classItem) => {
        if (classItem.start_time && classItem.end_time) {
          const currentTime = moment();
          const endTime = moment(
            moment.unix(this.props.selectedDate).format('YYYY-MM-DD') +
              ' ' +
              classItem.end_time,
          );
          if (currentTime.isAfter(endTime)) {
            pastClasses.push(classItem);
          }
        }
      });
    }

    if (pastClasses.length > 0) {
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Đã diễn ra</Text>
          {this.renderTeachingClockItems(pastClasses)}
        </View>
      );
    }
  };

  renderFutureClasses = () => {
    let futureClasses = [];
    const {classes} = this.props;
    if (classes) {
      classes.forEach((classItem) => {
        if (classItem.start_time && classItem.end_time) {
          const currentTime = moment();
          const startTime = moment(
            moment.unix(this.props.selectedDate).format('YYYY-MM-DD') +
              ' ' +
              classItem.start_time,
          );
          if (currentTime.isBefore(startTime)) {
            futureClasses.push(classItem);
          }
        }
      });
    }

    if (futureClasses.length > 0) {
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Chưa diễn ra</Text>
          {this.renderTeachingClockItems(futureClasses)}
        </View>
      );
    }
  };

  render() {
    return this.props.isLoadingClasses ? (
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
      <View>
        <View>{this.renderCurrentClasses()}</View>
        <View>{this.renderPastClasses()}</View>
        <View>{this.renderFutureClasses()}</View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    flex: 1,
    marginHorizontal: theme.mainHorizontal,
    marginTop: 16,
  },
  sectionTitle: {
    fontWeight: theme.title.fontWeight,
    fontSize: theme.title.fontSize,
  },
};

export default ClockManageTeachingComponent;
