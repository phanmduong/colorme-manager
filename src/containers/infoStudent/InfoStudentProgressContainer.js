import React from 'react';
import {connect} from 'react-redux';
import * as infoStudentActions from '../../actions/infoStudentActions';
import InfoStudentProgressComponent from '../../components/infoStudent/InfoStudentProgressComponent';
import {bindActionCreators} from 'redux';

class InfoStudentProgressContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadProgress();
  };

  loadProgress = () => {
    this.props.infoStudentActions.loadProgress(
      this.props.studentId,
      this.props.token,
      this.props.domain,
    );
  };

  render() {
    return (
      <InfoStudentProgressComponent
        progress={this.props.progress}
        isLoadingProgress={this.props.isLoadingProgress}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    studentId: state.infoStudent.studentId,
    progress: state.infoStudent.progress,
    isLoadingProgress: state.infoStudent.isLoadingProgress,
    errorLoadingProgress: state.infoStudent.errorLoadingProgress,
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
)(InfoStudentProgressContainer);
