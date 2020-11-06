import React from 'react';
import {View, Text} from 'react-native';
import InfoStudentProgressExamChild from './InfoStudentProgressExamChild';
import theme from '../../styles';

function InfoStudentProgressExamItem({exams, group}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{group.name}</Text>
      {exams.map((exam) => (
        <InfoStudentProgressExamChild exam={exam} />
      ))}
    </View>
  );
}

const styles = {
  container: {
    paddingHorizontal: theme.mainHorizontal,
  },
  title: {
    fontWeight: 'bold',
  },
};

export default InfoStudentProgressExamItem;
