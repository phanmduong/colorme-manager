import React from 'react';
import {Dimensions, Animated, Platform} from 'react-native';
import {View, Text} from 'native-base';
import * as Progress from 'react-native-progress';
import theme from '../../styles';
import {dotNumber} from '../../helper';

var {height, width} = Dimensions.get('window');
class SlideTarget extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    var {totalMoney, countPaid, countTotal, bonus, targetRevenue} = this.props;
    return (
      <View style={styles.slide}>
        <Progress.Circle
          size={Platform.isPad ? 150 : 100}
          progress={
            isNaN(totalMoney / targetRevenue) ? 0 : totalMoney / targetRevenue
          }
          indeterminate={false}
          color={theme.mainColor}
          showsText
          formatText={progressValue => {
            if (isNaN(totalMoney / targetRevenue)) {
              return '0%';
            } else {
              return parseInt((totalMoney / targetRevenue) * 100) + '%';
            }
          }}
        />
        <Text style={styles.note}>
          {dotNumber(totalMoney)}đ/{dotNumber(targetRevenue)}đ
        </Text>
        {countPaid ? (
          <View style={styles.containerContentProcess}>
            <View style={{...styles.process, ...styles.containerProcess}}>
              <Animated.View
                style={[
                  styles.process,
                  styles.bar,
                  {width: (countPaid * (width - width / 10)) / countTotal},
                ]}
              />
            </View>
            <View style={styles.containerText}>
              <View style={styles.contentSpaceBetween}>
                <Text style={styles.text}>{'Tỉ lệ chốt đơn'}</Text>
                <Text style={{...styles.text, ...styles.textNote}}>
                  {countPaid +
                    '/' +
                    countTotal +
                    ' (' +
                    Math.round((countPaid * 100) / countTotal) +
                    '%)'}
                </Text>
              </View>
              {bonus ? (
                <View style={styles.contentSpaceBetween}>
                  <Text style={styles.text}>{'Thưởng của bạn'}</Text>
                  <Text style={{...styles.text, ...styles.textNote}}>
                    {bonus + ''}
                  </Text>
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const styles = {
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  note: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '500',
    color: '#555555',
  },
  containerContentProcess: {
    marginVertical: 25,
    width: width - width / 10,
  },
  containerProcess: {
    backgroundColor: theme.secondColorOpacity,
  },
  bar: {},
  process: {
    borderRadius: 5,
    height: 5,
    backgroundColor: theme.secondColor,
  },
  text: {
    color: '#7d7d7d',
    fontSize: 12,
  },
  textNote: {
    fontWeight: '900',
  },
  containerText: {
    marginTop: 5,
    marginHorizontal: 5,
  },
  contentSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export default SlideTarget;
