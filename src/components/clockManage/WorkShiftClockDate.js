import React from 'react';
import {View, Text, Card, CardItem, Body} from 'native-base';
import _ from 'lodash';
import {Dimensions} from 'react-native';
import WorkShiftClockItem from './WorkShiftClockItem';

var self;
var {height, width} = Dimensions.get('window');

class WorkShiftClockDate extends React.Component {
  constructor(props, context) {
    super(props, context);
    self = this;
  }

  // shouldComponentUpdate(nextProps) {
  //     return !_.isEqual(nextProps.dateData, this.props.dateData);
  // }

  renderShiftItem() {
    const data = _.sortBy(this.props.dateData.shifts);
    return data.map((shift, index) => (
      <WorkShiftClockItem shift={shift} key={index} />
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

export default WorkShiftClockDate;
