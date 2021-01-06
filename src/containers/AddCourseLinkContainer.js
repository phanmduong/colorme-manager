import React from 'react';
import {connect} from 'react-redux';
import AddCourseLinkComponent from '../components/AddCourseLinkComponent';
import {bindActionCreators} from 'redux';
import * as courseActions from '../actions/courseActions';
import NavigationLeftHeader from '../components/common/NavigationLeftHeader';

function AddCourseLinkContainer(props) {
  function createLink(data) {
    props.courseActions.createLink(data, props.token, props.domain);
  }

  const courseId = props.navigation.getParam('courseId');

  return (
    <AddCourseLinkComponent
      {...props}
      createLink={createLink}
      courseId={courseId}
    />
  );
}

AddCourseLinkContainer.navigationOptions = ({navigation}) => {
  return {
    headerLeft: () => (
      <NavigationLeftHeader name={'Tạo tài liệu'} navigation={navigation} />
    ),
  };
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    courseDetails: state.course.courseDetails,
    creatingLink: state.course.creatingLink,
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {courseActions: bindActionCreators(courseActions, dispatch)};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCourseLinkContainer);
