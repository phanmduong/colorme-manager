import React from 'react';
import {View, Text, Image} from 'react-native';
import * as Progress from 'react-native-progress';
import theme from '../../styles';
import {dotNumber} from '../../helper';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';

const AnalyticsKPIItem = ({name, kpi, revenue, avatar_url}) => {
  const getPercentage = () => {
    if (kpi !== 0) {
      const percentage = Math.round((revenue / kpi) * 100);
      if (percentage <= 100) {
        return percentage;
      }
      return 100;
    }
    return 0;
  };

  return (
    <View style={styles.kpiContainer}>
      {avatar_url ? (
        <Image source={{uri: avatar_url}} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.iconContainer]}>
          <FA5Icon name={'money-bill-alt'} size={15} color={'white'} />
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Progress.Bar
          width={null}
          height={4}
          progress={kpi === 0 ? 0 : revenue / kpi}
          color={'#32CA41'}
          unfilledColor={'#E0E0E0'}
          borderColor={'white'}
          borderRadius={10}
          style={{marginTop: 10}}
        />
        <View style={styles.statsContainer}>
          <Text style={styles.stats}>
            {dotNumber(revenue)} đ / {dotNumber(kpi)} đ
          </Text>
          <Text style={styles.stats}>{getPercentage()}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  kpiContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: theme.mainHorizontal,
    marginTop: 15,
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontWeight: theme.title.fontWeight,
    fontSize: theme.title.fontSize,
  },
  avatar: theme.mainAvatar,
  statsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stats: {
    color: 'black',
    fontSize: 13,
  },
  iconContainer: {
    backgroundColor: '#65DA3A',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default AnalyticsKPIItem;
