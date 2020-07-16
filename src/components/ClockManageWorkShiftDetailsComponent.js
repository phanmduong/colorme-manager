import React from 'react';
import {ScrollView} from 'react-native';
import WorkShiftClockDate from './clockManage/WorkShiftClockDate';

class ClockManageWorkShiftDetailsComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderWorkShift = () => {
    const {selectedEmployee} = this.props;
    return <WorkShiftClockDate shifts={selectedEmployee.work_shifts} />;
  };

  render() {
    return <ScrollView>{this.renderWorkShift()}</ScrollView>;
  }
}

export default ClockManageWorkShiftDetailsComponent;
