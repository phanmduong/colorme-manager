import React from 'react';
import {View, Text} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

function ListCourseExamItem({title, deadline, description, weight, lesson}) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FeatherIcon name={'corner-down-right'} size={30} color={'black'} />
        <View style={styles.contentContainer}>
          <Text style={styles.bold}>
            {title} - {description}
          </Text>
          <Text style={styles.info}>
            Hệ số {weight} - {lesson ? lesson.name : 'Không có buổi học'} - Hạn
            chót {deadline} ngày
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
    flex: 1,
  },
  bold: {
    fontWeight: '600',
  },
  info: {
    marginTop: 5,
    color: '#909090',
    flexWrap: 'wrap',
    flex: 1,
  },
};

export default ListCourseExamItem;
