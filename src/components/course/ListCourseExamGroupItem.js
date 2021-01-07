import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import theme from '../../styles';
import ListCourseExamItem from './ListCourseExamItem';

function ListCourseExamGroupItem({
  name,
  exam_templates,
  lessons,
  avatar_url,
  id,
}) {
  const [isCollapsed, setCollapsed] = useState(true);

  function toggleCollapsed() {
    setCollapsed(!isCollapsed);
  }

  function filterExams() {
    return exam_templates.filter((exam) => exam.group_exam_id === id);
  }

  function renderExams() {
    return filterExams().map((exam) => (
      <ListCourseExamItem
        key={exam.id}
        title={exam.title}
        description={exam.description}
        deadline={exam.deadline}
        lesson_id={exam.lesson_id}
        lessons={lessons}
        weight={exam.weight}
      />
    ));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapsed}>
        <View style={styles.row}>
          <Image source={{uri: avatar_url}} style={styles.ava} />
          <Text style={styles.title}>{name}</Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>{renderExams()}</Collapsible>
    </View>
  );
}

const styles = {
  container: {
    paddingHorizontal: theme.mainHorizontal,
    paddingVertical: 16,
  },
  ava: theme.mainAvatar,
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: theme.title.fontSize,
    fontWeight: theme.title.fontWeight,
    marginLeft: 10,
    alignSelf: 'center',
  },
  contentContainer: {
    marginLeft: 10,
  },
};

export default ListCourseExamGroupItem;
