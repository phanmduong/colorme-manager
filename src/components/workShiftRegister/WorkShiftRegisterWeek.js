import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import WorkShiftRegisterDate from './WorkShiftRegisterDate';
var {height, width} = Dimensions.get('window');
import _ from 'lodash';
import theme from '../../styles';

class WorkShiftRegisterWeek extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.week !== this.props.week;
  }

  renderShiftDate = () => {
    const dates = [...this.props.week.dates].reverse();
    return dates.map(date => (
      <WorkShiftRegisterDate
        shifts={date.shifts}
        date={date.date}
        user={this.props.user}
        onRegister={this.props.onRegister}
        onUnregister={this.props.onUnregister}
      />
    ));
  };

  render() {
    return <View>{this.renderShiftDate()}</View>;
  }
}

export default WorkShiftRegisterWeek;
