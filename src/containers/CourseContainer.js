import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import CourseComponent from '../components/CourseComponent';
import * as courseActions from '../actions/courseActions';
import {bindActionCreators} from 'redux';
import NavigationLeftHeader from '../components/common/NavigationLeftHeader';
import AddButton from '../components/common/AddButton';

function CourseContainer(props) {
  useEffect(() => {
    loadCourses();
    loadParentCourses();
  }, []);

  function loadCourses() {
    props.courseActions.loadDataCourse(
      false,
      props.currentPage + 1,
      props.search,
      props.token,
    );
  }

  function onRefresh() {
    props.courseActions.onRefresh(props.search, props.token);
  }

  function onSearch(search) {
    props.courseActions.onSearch(search, props.token);
  }

  function onStatusChange(id, status) {
    props.courseActions.onStatusChange(id, status, props.token);
  }

  function loadParentCourses() {
    props.courseActions.loadParentCourses(props.token);
  }

  console.log();

  return (
    <CourseComponent
      {...props}
      loadCourses={loadCourses}
      onRefresh={onRefresh}
      onSearch={onSearch}
      onStatusChange={onStatusChange}
    />
  );
}

CourseContainer.navigationOptions = ({navigation}) => {
  return {
    headerLeft: () => (
      <NavigationLeftHeader name={'Môn học'} navigation={navigation} />
    ),
    headerRight: () => (
      <AddButton onPress={() => navigation.navigate('AddCourse')} />
    ),
  };
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    courseData: state.course.courseData,
    isLoading: state.course.isLoading,
    error: state.course.error,
    search: state.course.search,
    currentPage: state.course.currentPage,
    refreshing: state.course.refreshing,
    statusChanging: state.course.statusChanging,
    parentCourses: state.course.parentCourses,
    loadingParentCourses: state.course.loadingParentCourses,
    errorParentCourses: state.course.errorParentCourses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    courseActions: bindActionCreators(courseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer);
