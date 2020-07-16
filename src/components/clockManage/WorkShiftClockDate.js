import React from 'react';
import {View, Card, CardItem, Body} from 'native-base';
import _ from 'lodash';
import WorkShiftClockItem from './WorkShiftClockItem';

class WorkShiftClockDate extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderShiftItem() {
    const data = _.orderBy(this.props.shifts, ['start_time'], ['asc']);
    return data.map((shift, index) => (
      <WorkShiftClockItem shift={shift} key={index} />
    ));
  }

  render() {
    return (
      <View style={styles.card}>
        <Card>
          <CardItem style={{width: '100%'}}>
            <Body style={styles.container}>{this.renderShiftItem()}</Body>
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
