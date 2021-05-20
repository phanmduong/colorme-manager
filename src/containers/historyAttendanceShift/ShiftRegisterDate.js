import React from 'react';
import {View, Text, Card, CardItem, Body} from 'native-base';
import ShiftRegisterItem from './ShiftRegisterItem';
import {observer} from 'mobx-react';
import moment from 'moment';
import _ from 'lodash';

var self;

@observer
class ShiftRegisterDate extends React.Component {
  constructor(props, context) {
    super(props, context);
    self = this;
  }

  renderShiftItem() {
    const data = _.sortBy(
      this.props.dateData.shifts,
      (shift) => shift.work_shift.work_shift_session.id,
    );
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
                <Text style={styles.textDate}>
                  {moment.unix(this.props.dateData.date).format('DD/MM/YYYY')}
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
