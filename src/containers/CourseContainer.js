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
    return () => {
      props.courseActions.reset();
    };
  }, []);

  function loadCourses() {
    if (props.currentPage < props.totalPage) {
      props.courseActions.loadDataCourse(
        false,
        props.currentPage + 1,
        props.search,
        props.token,
        props.domain,
      );
    }
  }

  function onRefresh() {
    props.courseActions.onRefresh(props.search, props.token, props.domain);
  }

  function onSearch(search) {
    props.courseActions.onSearch(search, props.token, props.domain);
  }

  function onStatusChange(id, status) {
    props.courseActions.onStatusChange(id, status, props.token, props.domain);
  }

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
    totalPage: state.course.totalPage,
    refreshing: state.course.refreshing,
    statusChanging: state.course.statusChanging,
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    courseActions: bindActionCreators(courseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer);
