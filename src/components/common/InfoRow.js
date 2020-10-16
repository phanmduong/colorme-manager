import React from 'react';
import {Text, View} from 'react-native';
import {isEmptyInput} from '../../helper';

const InfoRow = ({title, value}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text numberOfLines={1} style={styles.value}>
        {isEmptyInput(value) ? 'Chưa có' : value}
      </Text>
    </View>
  );
};

const styles = {
  container: {
    marginTop: 25,
  },
  title: {
    fontSize: 16,
  },
  value: {
    paddingTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
};

export default InfoRow;
