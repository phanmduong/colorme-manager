import React from 'react';
import {View, Text} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import theme from '../../styles';

function ListCourseExamItem({
  title,
  deadline,
  description,
  weight,
  lesson_id,
  lessons,
}) {
  function getLesson() {
    if (lesson_id) {
      const lesson = lessons.find((lesson) => lesson.id === lesson_id);
      if (lesson) {
        return lesson.name;
      }
    }
    return 'Buổi diễn ra';
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FeatherIcon name={'corner-down-right'} size={30} color={'black'} />
        <View style={styles.contentContainer}>
          <Text style={styles.bold}>
            {title} - {description}
          </Text>
          <Text style={styles.info}>
            Hệ số {weight} - {getLesson()} - {deadline} ngày
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = {
  container: {
    marginLeft: 20,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
  },
  contentContainer: {
    marginLeft: 10,
  },
  bold: {
    fontWeight: '600',
  },
  info: {
    marginTop: 5,
    color: '#909090',
  },
};

export default ListCourseExamItem;
