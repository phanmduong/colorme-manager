import React from 'react';
import {connect} from 'react-redux';
import * as infoStudentActions from '../../actions/infoStudentActions';
import {bindActionCreators} from 'redux';
import InfoStudentDetailsComponent from '../../components/infoStudent/InfoStudentDetailsComponent';

class InfoStudentDetailsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadStudent();
  };

  static navigationOptions = ({navigaton}) => ({
    title: 'Thông tin học viên',
  });

  loadStudent = () => {
    this.props.infoStudentActions.loadStudent(
      this.props.studentId,
      this.props.token,
    );
  };

  uploadImage = (imageField, imageUri) => {
    this.props.infoStudentActions.uploadImage(
      imageUri,
      this.props.studentId,
      imageField,
      this.props.token,
    );
  };

  render() {
    return (
      <InfoStudentDetailsComponent
        {...this.props}
        isLoadingStudent={this.props.isLoadingStudent}
        student={this.props.student}
        uploadImage={this.uploadImage}
        isUploadingImage={this.props.isUploadingImage}
        errorUploadingImage={this.props.errorUploadingImage}
        isUpdatingProfile={this.props.isUpdatingProfile}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    student: state.infoStudent.student,
    isLoadingStudent: state.infoStudent.isLoadingStudent,
    errorStudent: state.infoStudent.errorStudent,
    studentId: state.infoStudent.studentId,
    isUploadingImage: state.infoStudent.isUploadingImage,
    errorUploadingImage: state.infoStudent.errorUploadingImage,
    isUpdatingProfile: state.infoStudent.isUpdatingProfile,
    errorUpdatingProfile: state.infoStudent.errorUpdatingProfile,
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
)(InfoStudentDetailsContainer);
