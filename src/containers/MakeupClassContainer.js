import React from 'react';
import MakeupClassComponent from '../components/MakeupClassComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as makeupClassActions from '../actions/makeupClassActions';

class MakeupClassContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Lịch học bù',
  });

  componentDidMount = () => {
    this.loadAllCourses();
  };

  componentWillUnmount = () => {
    this.props.makeupClassActions.resetData();
  };

  loadAllCourses = () => {
    this.props.makeupClassActions.loadAllCourses(this.props.token);
  };

  loadSchedule = id => {
    this.props.makeupClassActions.loadScheduleClasses(this.props.token, id);
  };

  render() {
    return (
      <MakeupClassComponent
        courses={this.props.courses}
        isLoadingAllCourses={this.props.isLoadingAllCourses}
        loadSchedule={this.loadSchedule}
        schedule={this.props.schedule}
        isLoadingScheduleClasses={this.props.isLoadingScheduleClasses}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    isLoadingScheduleClasses: state.makeupClasses.isLoadingScheduleClasses,
    errorScheduleClasses: state.makeupClasses.errorScheduleClasses,
    schedule: state.makeupClasses.schedule,
    isLoadingAllCourses: state.makeupClasses.isLoadingAllCourses,
    errorLoadingAllCourses: state.makeupClasses.errorLoadingAllCourses,
    courses: state.makeupClasses.courses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    makeupClassActions: bindActionCreators(makeupClassActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MakeupClassContainer);
