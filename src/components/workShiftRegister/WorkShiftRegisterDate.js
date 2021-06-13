import React from 'react';
import {View, Text} from 'react-native';
import WorkShiftRegisterItem from './WorkShiftRegisterItem';
import {displayUnixDate} from '../../helper';

class WorkShiftRegisterDate extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.shifts !== this.props.shifts;
  }

  renderShiftItem = () => {
    return this.props.shifts.map((shift) => (
      <WorkShiftRegisterItem
        shift={shift}
        name={shift.work_shift_session.name}
        start_time={shift.work_shift_session.start_time}
        end_time={shift.work_shift_session.end_time}
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
        permissions={shift.permissions}
        selectedStaffId={this.props.selectedStaffId}
      />
    ));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.dateText}>
          {displayUnixDate(this.props.date, 'full-date')}
        </Text>
        {this.renderShiftItem()}
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#F7F8F7',
    padding: 19,
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
