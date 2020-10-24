import React from 'react';
import {connect} from 'react-redux';
import * as infoStudentActions from '../../actions/infoStudentActions';
import {bindActionCreators} from 'redux';
import InfoStudentHistoryCollectComponent from '../../components/infoStudent/InfoStudentHistoryCollectComponent';

class InfoStudentHistoryCollectContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadHistoryCollect();
  };

  loadHistoryCollect = () => {
    this.props.infoStudentActions.loadHistoryCollect(
      false,
      this.props.studentId,
      this.props.token,
      this.props.domain,
    );
  };

  render() {
    return (
      <InfoStudentHistoryCollectComponent
        historyCollect={this.props.historyCollect}
        isLoadingHistoryCollect={this.props.isLoadingHistoryCollect}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    studentId: state.infoStudent.studentId,
    historyCollect: state.infoStudent.historyCollect,
    isLoadingHistoryCollect: state.infoStudent.isLoadingHistoryCollect,
    errorLoadingHistoryCollect: state.infoStudent.errorLoadingHistoryCollect,
    domain: state.login.domain,
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
)(InfoStudentHistoryCollectContainer);
