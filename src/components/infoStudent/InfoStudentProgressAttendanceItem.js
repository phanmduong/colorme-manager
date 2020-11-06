import React from 'react';
import {View, Text} from 'react-native';
import theme from '../../styles';
import {isEmptyInput} from '../../helper';

function InfoStudentProgressAttendanceItem({order, status, date, note}) {
  function getStatus() {
    switch (status) {
      case 0:
        return {color: '#C50000', name: 'Vắng mặt'};
      case 1:
        return {color: '#2ACC4C', name: 'Có mặt'};
      default:
        return null;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.orderContainer}>
          <Text style={styles.order}>Buổi {order}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={{color: getStatus().color}}>
            {getStatus() && getStatus().name}
          </Text>
        </View>
        <View style={styles.dateContainer}>
          <Text>{date}</Text>
        </View>
      </View>
      {!isEmptyInput(note) && (
        <View style={styles.row}>
          <View style={styles.orderContainer} />
          <View style={styles.noteContainer}>
            <Text>{note}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: theme.mainHorizontal,
  },
  row: {
    flexDirection: 'row',
    marginTop: 15,
  },
  orderContainer: {
    flex: 1,
  },
  order: {
    fontWeight: 'bold',
  },
  statusContainer: {
    flex: 2,
  },
  dateContainer: {
    flex: 1,
  },
  noteContainer: {
    flex: 3,
    backgroundColor: '#f6f6f6',
    padding: 10,
    borderRadius: 6,
  },
};

export default InfoStudentProgressAttendanceItem;
