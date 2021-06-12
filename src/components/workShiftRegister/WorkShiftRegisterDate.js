import React from 'react';
import {View, Text} from 'react-native';
import WorkShiftRegisterItem from './WorkShiftRegisterItem';
import _ from 'lodash';

class WorkShiftRegisterDate extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.shifts !== this.props.shifts;
  }

  renderShiftItem = () => {
    const shifts = [...this.props.shifts].reverse();
    return shifts.map(shift => (
      <WorkShiftRegisterItem
        shift={shift}
        name={shift.name}
        start_time={shift.start_time}
        end_time={shift.end_time}
        participates={shift.users}
        date={this.props.date}
        user={this.props.user}
        shiftId={shift.id}
        onRegister={this.props.onRegister}
        onUnregister={this.props.onUnregister}
        isRegistering={shift.isRegistering}
        isUnregistering={shift.isUnregistering}
        errorRegistering={shift.isRegistering}
        errorUnregistering={shift.isUnregistering}
        disable={shift.disable}
      />
    ));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.dateText}>{this.props.date}</Text>
        {this.renderShiftItem()}
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#F7F8F7',
    padding: 19,
    marginHorizontal: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  dateText: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 5,
  },
};

export default WorkShiftRegisterDate;
