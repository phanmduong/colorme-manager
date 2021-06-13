import React from 'react';
import {Text, View} from 'react-native';
import {Thumbnail} from 'native-base';
import theme from '../../styles';
import * as Progress from 'react-native-progress';
import ImagePlaceholder from '../common/ImagePlaceholder';

function WorkShiftStatisticsItem(props) {
  const {user, statistics} = props;

  function hoursOf(unix) {
    return unix / 60;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {user.avatar_url ? (
          <Thumbnail
            small
            source={{uri: user.avatar_url}}
            style={theme.mainAvatar}
          />
        ) : (
          <ImagePlaceholder />
        )}
        <Text numberOfLines={1} style={styles.name}>
          {user.name}
        </Text>
      </View>
      <View style={styles.row}>
        <Thumbnail style={theme.mainAvatar} />
        <View style={styles.infoContainer}>
          <View style={styles.processAndText}>
            <Progress.Bar
              progress={hoursOf(statistics.total_time) / 20}
              unfilledColor={'#F6F6F6'}
              color={'#17a2b8'}
              borderWidth={0}
            />
            <Text style={styles.textProcess}>
              {hoursOf(statistics.total_time)}/20 số giờ đăng kí
            </Text>
          </View>
          <View style={styles.processAndText}>
            <Progress.Bar
              progress={
                statistics.total_time > 0
                  ? hoursOf(statistics.total_valid_time) /
                    hoursOf(statistics.total_time)
                  : 0
              }
              unfilledColor={'#F6F6F6'}
              color={'#32CA41'}
              borderWidth={0}
            />
            <Text style={styles.textProcess}>
              {hoursOf(statistics.total_valid_time)}/
              {hoursOf(statistics.total_time)} số giờ hợp lệ
            </Text>
          </View>
          <View style={styles.processAndText}>
            <Progress.Bar
              progress={
                statistics.total_time > 0
                  ? hoursOf(statistics.total_invalid_time) /
                    hoursOf(statistics.total_time)
                  : 0
              }
              unfilledColor={'#F6F6F6'}
              color={'#DC3545'}
              borderWidth={0}
            />
            <Text style={styles.textProcess}>
              {hoursOf(statistics.total_invalid_time)}/
              {hoursOf(statistics.total_time)} số giờ vi phạm
            </Text>
          </View>
          <View style={styles.processAndText}>
            <Progress.Bar
              progress={
                statistics.total_time > 0
                  ? hoursOf(
                      statistics.total_time -
                        (statistics.total_invalid_time +
                          statistics.total_valid_time),
                    ) / hoursOf(statistics.total_time)
                  : 0
              }
              unfilledColor={'#F6F6F6'}
              color={'#FFC107'}
              borderWidth={0}
            />
            <Text style={styles.textProcess}>
              {hoursOf(
                statistics.total_time -
                  (statistics.total_invalid_time + statistics.total_valid_time),
              )}
              /{hoursOf(statistics.total_time)} số giờ chưa diễn ra
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = {
  container: {
    paddingVertical: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  name: {
    fontSize: theme.title.fontSize,
    fontWeight: theme.title.fontWeight,
    marginLeft: 15,
    marginRight: 5,
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
  },
  processAndText: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textProcess: {
    marginLeft: 10,
  },
};

export default WorkShiftStatisticsItem;
