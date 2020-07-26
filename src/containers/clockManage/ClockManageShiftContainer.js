import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as clockManageActions from '../../actions/clockManageActions';
import ClockManageShiftComponent from '../../components/clockManage/ClockManageShiftComponent';

class ClockManageShiftContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadShifts(this.props.selectedDate);
  };

  loadShifts = (date) => {
    this.props.clockManageActions.getShiftClock(
      date,
      this.props.token,
      this.props.domain,
    );
  };

  render() {
    return <ClockManageShiftComponent {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    selectedDate: state.clockManage.selectedDate,
    shifts: state.clockManage.shifts,
    isLoadingShifts: state.clockManage.isLoadingShifts,
    errorShifts: state.clockManage.errorShifts,
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
)(ClockManageShiftContainer);
