import React from 'react';
import {View, Text} from 'react-native';

function InfoStudentProgressExamChild({exam}) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>{exam.title}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text>{exam.score}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text>
          Nhập bởi <Text style={styles.inputBy}>{exam.inputTeacher.name}</Text>
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text>{exam.created_at}</Text>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
  },
  infoContainer: {
    flex: 2,
  },
  scoreContainer: {
    flex: 1,
  },
  inputBy: {
    fontWeight: 'bold',
  },
};

export default InfoStudentProgressExamChild;
