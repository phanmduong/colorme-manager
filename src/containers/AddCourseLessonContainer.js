import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../actions/courseActions';
import AddCourseLessonComponent from '../components/AddCourseLessonComponent';
import NavigationLeftHeader from '../components/common/NavigationLeftHeader';
import {observer} from 'mobx-react';

function AddCourseLessonContainer(props) {
  function addLesson(data) {
    return store.addLesson(data, props.token, props.domain, () =>
      props.navigation.goBack(),
    );
  }

  function editLesson(data) {
    store.editLesson(data, props.token, props.domain, () =>
      props.navigation.goBack(),
    );
  }

  const courseId = props.navigation.getParam('courseId');
  const editMode = props.navigation.getParam('editMode');
  const lesson = props.navigation.getParam('lesson');
  const store = props.navigation.getParam('store');

  return (
    <AddCourseLessonComponent
      {...props}
      addLesson={addLesson}
      courseId={courseId}
      lesson={lesson}
      editMode={editMode}
      editLesson={editLesson}
      store={store}
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
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {courseActions: bindActionCreators(courseActions, dispatch)};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(observer(AddCourseLessonContainer));
