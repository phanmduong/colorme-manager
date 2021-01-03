import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../actions/courseActions';
import AddCourseLessonComponent from '../components/AddCourseLessonComponent';
import NavigationLeftHeader from '../components/common/NavigationLeftHeader';

function AddCourseLessonContainer(props) {
  function addLesson(data) {
    return props.courseActions.createLesson(data, props.token);
  }

  function editLesson(data) {
    props.courseActions.editLesson(data, props.token);
  }

  const courseId = props.navigation.getParam('courseId');
  const editMode = props.navigation.getParam('editMode');
  const lesson = props.navigation.getParam('lesson');

  return (
    <AddCourseLessonComponent
      {...props}
      addLesson={addLesson}
      courseId={courseId}
      lesson={lesson}
      editMode={editMode}
      editLesson={editLesson}
    />
  );
}

AddCourseLessonContainer.navigationOptions = ({navigation}) => {
  return {
    headerLeft: () => (
      <NavigationLeftHeader name={'Tạo buổi học'} navigation={navigation} />
    ),
  };
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    courseDetails: state.course.courseDetails,
    addingLesson: state.course.addingLesson,
    editingLesson: state.course.editingLesson,
  };
}

function mapDispatchToProps(dispatch) {
  return {courseActions: bindActionCreators(courseActions, dispatch)};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCourseLessonContainer);
