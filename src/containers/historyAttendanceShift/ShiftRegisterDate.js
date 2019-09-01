import React from 'react';
import {View, Text, Card, CardItem, Body} from 'native-base';
import _ from 'lodash';
import ShiftRegisterItem from './ShiftRegisterItem';
import {observer} from 'mobx-react';
import {Dimensions} from 'react-native';

var self;
var {height, width} = Dimensions.get('window');

@observer
class ShiftRegisterDate extends React.Component {
  constructor(props, context) {
    super(props, context);
    self = this;
  }

  // shouldComponentUpdate(nextProps) {
  //     return !_.isEqual(nextProps.dateData, this.props.dateData);
  // }

  renderShiftItem() {
    const data = _.sortBy(this.props.dateData.shifts, shift => shift.id);
    return data.map((shift, index) => (
      <ShiftRegisterItem shift={shift} key={index} />
    ));
  }

  render() {
    return (
      <View style={styles.card}>
        <Card>
          <CardItem style={{width: '100%'}}>
            <Body style={styles.container}>
              <View style={styles.date}>
                <Text style={styles.textDate}>{this.props.dateData.date}</Text>
              </View>
              {this.renderShiftItem()}
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = {
  container: {
    alignItems: 'stretch',
  },
  textDate: {
    fontWeight: 'bold',
  },
  card: {
    marginHorizontal: 10,
  },
  date: {
    padding: 5,
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
};

export default ShiftRegisterDate;
