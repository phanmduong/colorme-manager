import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import CourseInfoComponent from '../components/CourseInfoComponent';
import {bindActionCreators} from 'redux';
import * as courseActions from '../actions/courseActions';
import NavigationLeftHeader from '../components/common/NavigationLeftHeader';
import {observer} from 'mobx-react';
import CourseInfoStore from './course/CourseInfoStore';

const CourseInfoContainer = observer((props) => {
  const [store] = useState(() => new CourseInfoStore());

  useEffect(() => {
    loadLessons();
  }, []);

  function loadLessons() {
    store.loadLessons(false, courseId, props.token, props.domain);
  }

  function refreshLessons() {
    store.loadLessons(true, courseId, props.token, props.domain);
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
      courseId={courseId}
      changeLessonEvent={changeLessonEvent}
      deleteLesson={deleteLesson}
      duplicateLesson={duplicateLesson}
      deleteLink={deleteLink}
      loadLessons={loadLessons}
      store={store}
      refreshLessons={refreshLessons}
    />
  );
});

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
)(CourseInfoContainer);
