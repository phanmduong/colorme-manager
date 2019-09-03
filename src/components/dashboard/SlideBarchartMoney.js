import React from 'react';
import {Dimensions} from 'react-native';
import {View, Text} from 'native-base';
import {maxArray} from '../../helper';
import BarchartItem from '../common/BarchartItem';
var {height, width} = Dimensions.get('window');

class SlideBarchartRegister extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    var {dateArray, moneyByDate, moneyToday} = this.props;
    return (
      <View style={styles.slide}>
        <View style={styles.barchart}>
          {dateArray.map(function(date, index) {
            return (
              <BarchartItem
                key={index}
                maxData={maxArray(moneyByDate)}
                dataColMax={0}
                dataColMin={parseInt(moneyByDate[index])}
                width={width / (2 * (dateArray.length + 2))}
              />
            );
          })}
        </View>
        <Text style={styles.note}>Doanh thu hôm nay {moneyToday}</Text>
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
