import React from 'react';
import {connect} from 'react-redux';
import * as clockManageActions from '../../actions/clockManageActions';
import {bindActionCreators} from 'redux';
import ClockManageTeachingComponent from '../../components/clockManage/ClockManageTeachingComponent';

class ClockManageTeachingContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadTeachingClock(this.props.selectedDate);
  };

  loadTeachingClock = (date) => {
    this.props.clockManageActions.getTeachingClock(
      date,
      this.props.token,
      this.props.domain,
    );
  };

  render() {
    return <ClockManageTeachingComponent {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    selectedDate: state.clockManage.selectedDate,
    isLoadingClasses: state.clockManage.isLoadingClasses,
    errorClasses: state.clockManage.errorClasses,
    classes: state.clockManage.classes,
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
)(ClockManageTeachingContainer);
