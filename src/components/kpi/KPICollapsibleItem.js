import React from 'react';
import {View, Text} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {dotNumber, getShortName, isEmptyInput} from '../../helper';
import * as Progress from 'react-native-progress';
import theme from '../../styles';

const KPICollapsibleItem = ({quantity, saler, total_done_kpi, unit}) => {
  const getPercentage = () => {
    if (quantity !== 0) {
      const percentage = Math.round((total_done_kpi / quantity) * 100);
      if (percentage <= 100) {
        return percentage;
      }
      return 100;
    }
    return 0;
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FeatherIcon name={'corner-down-right'} size={30} color={'black'} />
        <View style={styles.infoContainer}>
          {saler && (
            <View
              style={[
                styles.tag,
                {
                  backgroundColor: !isEmptyInput(saler.color)
                    ? saler.color
                    : theme.processColor1,
                },
              ]}>
              <Text style={styles.nameTag}>{getShortName(saler.name)}</Text>
            </View>
          )}
          <View style={styles.statsContainer}>
            <Text style={styles.stats}>
              {dotNumber(total_done_kpi)} / {dotNumber(quantity)} {unit}
            </Text>
            <Text style={styles.stats}>{getPercentage()}%</Text>
          </View>
          <Progress.Bar
            width={null}
            height={4}
            progress={getPercentage() / 100}
            color={'#32CA41'}
            unfilledColor={'#E0E0E0'}
            borderColor={'white'}
            borderRadius={10}
            style={{marginTop: 10}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
  },
  tag: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  nameTag: {
    color: 'white',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  statsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stats: {
    color: 'black',
  },
};

export default KPICollapsibleItem;
