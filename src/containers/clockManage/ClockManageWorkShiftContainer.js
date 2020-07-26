import React from 'react';
import * as clockManageActions from '../../actions/clockManageActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ClockManageWorkShiftComponent from '../../components/clockManage/ClockManageWorkShiftComponent';

class ClockManageWorkShiftContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadWorkShifts(this.props.selectedDate);
  };

  loadWorkShifts = (date) => {
    this.props.clockManageActions.getWorkShiftClock(
      date,
      this.props.token,
      this.props.domain,
    );
  };

  onSelectWorkShiftEmployee = (employee) => {
    this.props.clockManageActions.onSelectWorkShiftClockEmployee(employee);
  };

  render() {
    return (
      <ClockManageWorkShiftComponent
        {...this.props}
        onSelectWorkShiftEmployee={this.onSelectWorkShiftEmployee}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    workShiftData: state.clockManage.workShiftData,
    isLoadingWorkShiftData: state.clockManage.isLoadingWorkShiftData,
    errorWorkShiftData: state.clockManage.errorWorkShiftData,
    selectedDate: state.clockManage.selectedDate,
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clockManageActions: bindActionCreators(clockManageActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClockManageWorkShiftContainer);
