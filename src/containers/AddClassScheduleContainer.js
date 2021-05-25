import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as classActions from '../actions/classActions';
import AddClassScheduleComponent from '../components/AddClassScheduleComponent';
import NavigationLeftHeader from '../components/common/NavigationLeftHeader';

function AddClassScheduleContainer(props) {
  function createSchedule(name, study_sessions) {
    props.classActions.createSchedule(
      name,
      study_sessions,
      props.token,
      props.domain,
    );
  }

  return (
    <AddClassScheduleComponent {...props} createSchedule={createSchedule} />
  );
}

AddClassScheduleContainer.navigationOptions = ({navigation}) => {
  return {
    headerLeft: () => (
      <NavigationLeftHeader navigation={navigation} name={'Tạo lịch học'} />
    ),
  };
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    domain: state.login.domain,
    creatingClassSchedule: state.class.creatingClassSchedule,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    classActions: bindActionCreators(classActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddClassScheduleContainer);
