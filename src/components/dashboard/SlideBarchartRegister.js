import React from 'react';
import {Dimensions} from 'react-native';
import {View, Text} from 'native-base';
import BarchartItem from '../common/BarchartItem';
import {dotNumber, maxArray} from '../../helper';
import _ from 'lodash';
var {height, width} = Dimensions.get('window');

class SlideBarchartRegister extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    var {
      dateArray,
      registersByDate,
      paidByDate,
      paidNumber,
      registerNumber,
    } = this.props;
    return (
      <View style={styles.slide}>
        <View style={styles.barchart}>
          {dateArray.map(function(date, index) {
            return (
              <BarchartItem
                key={index}
                maxData={maxArray(registersByDate)}
                dataColMax={registersByDate[index]}
                dataColMin={paidByDate[index]}
                width={width / (2 * (dateArray.length + 2))}
              />
            );
          })}
        </View>
        <Text style={styles.note}>
          {dotNumber(paidNumber) +
            ' đóng tiền/' +
            dotNumber(registerNumber) +
            ' đăng kí học'}
        </Text>
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
  barchart: {
    flexDirection: 'row',
  },
  note: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '500',
    color: '#555555',
  },
};

export default SlideBarchartRegister;
