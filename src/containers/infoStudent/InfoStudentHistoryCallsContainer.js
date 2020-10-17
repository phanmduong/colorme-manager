import React from 'react';
import {connect} from 'react-redux';
import * as infoStudentActions from '../../actions/infoStudentActions';
import InfoStudentHistoryCallsComponent from '../../components/infoStudent/InfoStudentHistoryCallsComponent';
import {bindActionCreators} from 'redux';

class InfoStudentHistoryCallsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadHistoryCalls();
  };

  loadHistoryCalls = () => {
    this.props.infoStudentActions.loadHistoryCalls(
      false,
      this.props.studentId,
      this.props.token,
    );
  };

  render() {
    return (
      <InfoStudentHistoryCallsComponent
        historyCalls={this.props.historyCalls}
        isLoadingHistoryCalls={this.props.isLoadingHistoryCalls}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    historyCalls: state.infoStudent.historyCalls,
    isLoadingHistoryCalls: state.infoStudent.isLoadingHistoryCalls,
    errorLoadingHistoryCalls: state.infoStudent.errorLoadingHistoryCalls,
    studentId: state.infoStudent.studentId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    infoStudentActions: bindActionCreators(infoStudentActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoStudentHistoryCallsContainer);
