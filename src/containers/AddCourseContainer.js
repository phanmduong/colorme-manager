import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../actions/courseActions';
import AddCourseComponent from '../components/AddCourseComponent';
import NavigationLeftHeader from '../components/common/NavigationLeftHeader';

function AddCourseContainer(props) {
  function createCourse(data) {
    if (editMode) {
      props.courseActions.createCourse(true, data, props.token, props.domain);
    } else {
      props.courseActions.createCourse(false, data, props.token, props.domain);
    }
  }

  useEffect(() => {
    if (editMode) {
      loadCourseDetails();
    }
  }, []);

  function loadCourseDetails() {
    props.courseActions.loadCourseDetails(false, id, props.token, props.domain);
  }

  const editMode = props.navigation.getParam('editMode');
  const id = props.navigation.getParam('id');

  return (
    <AddCourseComponent
      {...props}
      createCourse={createCourse}
      editMode={editMode}
    />
  );
}

AddCourseContainer.navigationOptions = ({navigation}) => {
  return {
    headerLeft: () => (
      <NavigationLeftHeader name={'Tạo môn học'} navigation={navigation} />
    ),
  };
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    creating: state.course.creating,
    loadingCourseDetails: state.course.loadingCourseDetails,
    errorCourseDetails: state.course.errorCourseDetails,
    courseDetails: state.course.courseDetails,
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {courseActions: bindActionCreators(courseActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCourseContainer);
