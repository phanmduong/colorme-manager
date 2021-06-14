import React from 'react';
import {View, Text, Card, CardItem, Body} from 'native-base';
import ShiftRegisterItem from './ShiftRegisterItem';
import {observer} from 'mobx-react';
import moment from 'moment';
import _ from 'lodash';
import {displayUnixDate} from '../../helper';

var self;

@observer
class ShiftRegisterDate extends React.Component {
  constructor(props, context) {
    super(props, context);
    self = this;
  }

  renderShiftItem() {
    switch (this.props.shiftType) {
      case 'work_shift':
        const workShiftData = _.sortBy(
          this.props.dateData.shifts,
          (shift) => shift.work_shift.work_shift_session.id,
        );
        return workShiftData.map((shift, index) => (
          <ShiftRegisterItem
            shift={shift}
            key={index}
            shiftType={this.props.shiftType}
          />
        ));
      case 'shift':
        const shiftData = _.sortBy(
          this.props.dateData.shifts,
          (shift) => shift.shift_session.id,
        );
        return shiftData.map((shift, index) => (
          <ShiftRegisterItem
            shift={shift}
            key={index}
            shiftType={this.props.shiftType}
          />
        ));
      default:
        return null;
    }
  }

  render() {
    return (
      <View style={styles.card}>
        <Card>
          <CardItem style={{width: '100%'}}>
            <Body style={styles.container}>
              <View style={styles.date}>
                <Text style={styles.textDate}>
                  {displayUnixDate(this.props.dateData.date, 'full-date')}
                </Text>
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
