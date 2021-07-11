import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import theme from '../../styles';
import {displayUnixDate} from '../../helper';

function TeachingScheduleItem({
  avatar_url,
  name,
  start_time,
  end_time,
  classData,
  onSelectClass,
}) {
  return (
    <TouchableOpacity onPress={() => onSelectClass(classData)}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Image source={{uri: avatar_url}} style={styles.avatar} />
          <Text style={styles.name}>{name}</Text>
        </View>
        <Text>
          {displayUnixDate(start_time, 'time')} -{' '}
          {displayUnixDate(end_time, 'time')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: theme.mainHorizontal,
    marginTop: 20,
  },
  name: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: theme.mainAvatar,
};

export default TeachingScheduleItem;
