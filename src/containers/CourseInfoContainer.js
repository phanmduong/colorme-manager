import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import CourseInfoComponent from '../components/CourseInfoComponent';
import {bindActionCreators} from 'redux';
import * as courseActions from '../actions/courseActions';
import NavigationLeftHeader from '../components/common/NavigationLeftHeader';

function CourseInfoContainer(props) {
  useEffect(() => {
    loadCourseDetails();
    return () => {
      props.courseActions.resetCourseDetails();
    };
  }, []);

  function loadCourseDetails() {
    props.courseActions.loadCourseDetails(
      false,
      courseId,
      props.token,
      props.domain,
    );
  }

  function refreshCourseDetails() {
    props.courseActions.loadCourseDetails(
      true,
      courseId,
      props.token,
      props.domain,
    );
  }

  function deleteLesson(id) {
    props.courseActions.deleteLesson(id, props.token, props.domain);
  }

  function duplicateLesson(id) {
    props.courseActions.duplicateLesson(id, props.token, props.domain);
  }

  function changeLessonEvent(id, type) {
    props.courseActions.changeLessonEvent(id, type, props.token, props.domain);
  }

  function deleteLink(id) {
    props.courseActions.deleteLink(id, props.token, props.domain);
  }

  const courseId = props.navigation.getParam('id');

  return (
    <CourseInfoComponent
      {...props}
      onRefresh={refreshCourseDetails}
      courseId={courseId}
      changeLessonEvent={changeLessonEvent}
      deleteLesson={deleteLesson}
      duplicateLesson={duplicateLesson}
      deleteLink={deleteLink}
    />
  );
}

CourseInfoContainer.navigationOptions = ({navigation}) => {
  return {
    headerLeft: () => (
      <NavigationLeftHeader
        name={navigation.state.params.name}
        navigation={navigation}
        avatar_url={navigation.state.params.avatar_url}
      />
    ),
  };
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    loadingCourseDetails: state.course.loadingCourseDetails,
    errorCourseDetails: state.course.errorCourseDetails,
    refreshingCourseDetails: state.course.refreshingCourseDetails,
    courseDetails: state.course.courseDetails,
    domain: state.login.domain,
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
)(CourseInfoContainer);
