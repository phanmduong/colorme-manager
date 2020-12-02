import React from 'react';
import {View, Image, Text} from 'react-native';
import theme from '../../styles';

function TeachingScheduleItem({avatar_url, name, start_time, end_time}) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{uri: avatar_url}} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text>
        {start_time.slice(0, 5)} - {end_time.slice(0, 5)}
      </Text>
    </View>
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
