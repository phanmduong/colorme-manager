import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import CourseInfoComponent from '../components/CourseInfoComponent';
import {bindActionCreators} from 'redux';
import * as courseActions from '../actions/courseActions';
import NavigationLeftHeader from '../components/common/NavigationLeftHeader';
import {observer} from 'mobx-react';
import CourseInfoStore from './course/CourseInfoStore';

function CourseInfoContainer(props) {
  const [store] = useState(() => new CourseInfoStore());

  const courseId = props.navigation.getParam('id');

  useEffect(() => {
    loadLessons();
    loadExams();
    loadGroupExams();
    loadLinks();
  }, []);

  function loadLessons() {
    store.loadLessons(false, courseId, props.token, props.domain);
  }

  function loadExams() {
    store.loadExams(false, courseId, props.token, props.domain);
  }

  function loadGroupExams() {
    store.loadGroupExams(false, courseId, props.token, props.domain);
  }

  function loadLinks() {
    store.loadLinks(false, courseId, props.token, props.domain);
  }

  function refreshLessons() {
    store.loadLessons(true, courseId, props.token, props.domain);
  }

  function refreshExams() {
    store.loadExams(true, courseId, props.token, props.domain);
  }

  function refreshExamGroups() {
    store.loadGroupExams(true, courseId, props.token, props.domain);
  }

  function refreshLinks() {
    store.loadLinks(true, courseId, props.token, props.domain);
  }

  function deleteLesson(id) {
    store.deleteLesson(id, props.token, props.domain);
  }

  function duplicateLesson(id) {
    store.duplicateLesson(id, props.token, props.domain);
  }

  function addLessonEvent(id, type) {
    store.addLessonEvent(id, type, props.token, props.domain);
  }

  function deleteLessonEvent(lessonId, eventId) {
    store.deleteLessonEvent(lessonId, eventId, props.token, props.domain);
  }

  function deleteLink(id) {
    props.courseActions.deleteLink(id, props.token, props.domain);
  }

  return (
    <CourseInfoComponent
      {...props}
      courseId={courseId}
      addLessonEvent={addLessonEvent}
      deleteLessonEvent={deleteLessonEvent}
      deleteLesson={deleteLesson}
      duplicateLesson={duplicateLesson}
      deleteLink={deleteLink}
      loadLessons={loadLessons}
      store={store}
      refreshLessons={refreshLessons}
      refreshExams={refreshExams}
      refreshExamGroups={refreshExamGroups}
      loadLinks={loadLinks}
      refreshLinks={refreshLinks}
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
)(observer(CourseInfoContainer));
