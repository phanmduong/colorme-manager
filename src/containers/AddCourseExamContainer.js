import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../actions/courseActions';
import NavigationLeftHeader from '../components/common/NavigationLeftHeader';
import AddCourseExamComponent from '../components/AddCourseExamComponent';

function AddCourseExamContainer(props) {
  function createExam(data) {
    props.courseActions.createExam(data, props.token);
  }

  const courseId = props.navigation.getParam('courseId');

  return (
    <AddCourseExamComponent
      {...props}
      createExam={createExam}
      courseId={courseId}
    />
  );
}

AddCourseExamContainer.navigationOptions = ({navigation}) => {
  return {
    headerLeft: () => (
      <NavigationLeftHeader navigation={navigation} name={'Tạo bài kiểm tra'} />
    ),
  };
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    courseDetails: state.course.courseDetails,
    creatingExam: state.course.creatingExam,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    courseActions: bindActionCreators(courseActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCourseExamContainer);
