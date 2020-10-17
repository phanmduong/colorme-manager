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
      false,
      this.props.studentId,
      this.props.token,
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
