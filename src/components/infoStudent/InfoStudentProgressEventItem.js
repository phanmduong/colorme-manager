import React from 'react';
import {View, Text} from 'react-native';
import theme from '../../styles';

function InfoStudentProgressEventItem({event}) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>
          <Text style={styles.bold}>Buổi {event.order}:</Text>
          {'   '}
          {event.status === 'done' ? 'Hoàn thành' : 'Chưa hoàn thành'}
        </Text>
        <Text>{event.time}</Text>
      </View>
      <View style={styles.commentContainer}>
        <Text>{event.data}</Text>
      </View>
    </View>
  );
}

const styles = {
  container: {
    paddingHorizontal: theme.mainHorizontal,
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bold: {
    fontWeight: '600',
  },
  commentContainer: {
    backgroundColor: '#f7f7f7',
    borderRadius: 6,
    marginTop: 15,
    padding: 10,
  },
};

export default InfoStudentProgressEventItem;
