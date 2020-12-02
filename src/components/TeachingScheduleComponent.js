import React, {useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import CalendarSchedule from './common/CalendarSchedule';
import Loading from './common/Loading';
import TeachingScheduleItem from './teachingSchedule/TeachingScheduleItem';
import moment from 'moment';
import DateRangePicker from './common/DateRangePicker';
const {width} = Dimensions.get('window');
import theme from '../styles';
import TeachingScheduleFilter from './teachingSchedule/TeachingScheduleFilter';

function TeachingScheduleComponent(props) {
  const [selectedDate, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [isFilterVisible, setVisible] = useState(false);

  function renderScheduleItems() {
    return props.classes.map((classItem) => {
      const filteredLessons = classItem.lessons.filter(
        (lesson) => lesson.time === selectedDate,
      );
      return filteredLessons.map((lesson) => (
        <TeachingScheduleItem
          name={classItem.name}
          avatar_url={classItem.course.icon_url}
          end_time={lesson.end_time}
          start_time={lesson.start_time}
        />
      ));
    });
  }

  function toggleFilter() {
    setVisible(!isFilterVisible);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <View style={{flex: 1}}>
          <DateRangePicker
            mode={'filter'}
            dateType={'normal'}
            startDate={moment(props.startTime)}
            endDate={moment(props.endTime)}
            onSelectEndDate={props.onSelectEndDate}
            onSelectStartDate={props.onSelectStartDate}
            apply={props.loadSchedules}
          />
        </View>
        <TouchableOpacity onPress={toggleFilter}>
          <View style={styles.filterContainer}>
            <Image
              source={require('../../assets/img/icons8-sorting_options_filled.png')}
              style={{width: 18, height: 18}}
            />
          </View>
        </TouchableOpacity>
      </View>
      {!props.loading ? (
        <>
          <CalendarSchedule classes={props.classes} onSelectDate={setDate} />
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderScheduleItems()}
          </ScrollView>
        </>
      ) : (
        <Loading size={width / 8} />
      )}
      <TeachingScheduleFilter
        isVisible={isFilterVisible}
        closeModal={toggleFilter}
        apply={props.loadSchedules}
        onSelectProvinceId={props.onSelectProvinceId}
        onSelectBaseId={props.onSelectBaseId}
        onSelectCourseId={props.onSelectCourseId}
        {...props}
      />
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: theme.mainHorizontal,
  },
  filterContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },
};

export default TeachingScheduleComponent;
