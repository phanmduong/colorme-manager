import React from 'react';
import {View, Text} from 'react-native';
import theme from '../../styles';
import ListCourseExamItem from './ListCourseExamItem';

function ListCourseExamGroupItem({name, exam_templates, id}) {
  function filterExams() {
    return exam_templates.filter((exam) => {
      if (id === -1) {
        return !exam.group_exam;
      } else {
        return exam.group_exam && exam.group_exam.id === id;
      }
    });
  }

  function renderExams() {
    return filterExams().map((exam) => (
      <ListCourseExamItem
        key={exam.id}
        title={exam.title}
        description={exam.description}
        deadline={exam.deadline}
        lesson={exam.lesson}
        weight={exam.weight}
      />
    ));
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{name}</Text>
      </View>
      {renderExams()}
    </View>
  );
}

const styles = {
  container: {
    paddingHorizontal: theme.mainHorizontal,
    paddingTop: 16,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: theme.title.fontSize,
    fontWeight: theme.title.fontWeight,
    marginLeft: 10,
    alignSelf: 'center',
  },
};

export default ListCourseExamGroupItem;
