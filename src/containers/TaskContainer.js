import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TaskComponent from '../components/TaskComponent';
import * as taskActions from '../actions/taskActions';
import * as infoStudentActions from '../actions/infoStudentActions';
import moment from 'moment';

class TaskContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadTaskAnalytics(this.props.user.id);
    this.loadTaskView(this.props.selectedDate, this.props.user.id);
    this.loadTaskEmployees();
  };

  componentWillUnmount = () => {
    this.onSelectDate(moment(new Date()).format('YYYY-MM-DD'));
  };

  loadTaskAnalytics = user_id => {
    this.props.taskActions.loadTaskAnalytics(user_id, this.props.token);
  };

  loadTaskView = (date, user_id) => {
    this.props.taskActions.loadTaskView(date, user_id, this.props.token);
  };

  loadTaskEmployees = () => {
    this.props.taskActions.loadTaskEmployees(this.props.token);
  };

  onRefresh = (date, user_id) => {
    this.loadTaskAnalytics(user_id);
    this.loadTaskView(date, user_id);
  };

  onSelectDate = date => {
    this.props.taskActions.onSelectDate(date);
  };

  onSelectUserId = (date, user_id) => {
    this.loadTaskAnalytics(user_id);
    this.loadTaskView(date, user_id);
  };

  setStudentId = studentId => {
    this.props.infoStudentActions.setStudentId(studentId);
  };

  onSelectTask = studentId => {
    this.setStudentId(studentId);
    this.props.navigation.navigate('InfoStudent', {
      studentId: studentId,
    });
  };

  render() {
    return (
      <TaskComponent
        {...this.props}
        selectedDate={this.props.selectedDate}
        onSelectDate={this.onSelectDate}
        taskAnalytics={this.props.taskAnalytics}
        isLoadingTaskAnalytics={this.props.isLoadingTaskAnalytics}
        taskView={this.props.taskView}
        isLoadingTaskView={this.props.isLoadingTaskView}
        loadTaskView={this.loadTaskView}
        employees={this.props.employees}
        isLoadingTaskEmployees={this.props.isLoadingTaskEmployees}
        user={this.props.user}
        onSelectUserId={this.onSelectUserId}
        onSelectTask={this.onSelectTask}
        onRefresh={this.onRefresh}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    user: state.login.user,
    selectedDate: state.task.selectedDate,
    taskAnalytics: state.task.taskAnalytics,
    isLoadingTaskAnalytics: state.task.isLoadingTaskAnalytics,
    refreshingTaskAnalytics: state.task.refreshingTaskAnalytics,
    errorLoadingTaskAnalytics: state.task.errorLoadingTaskAnalytics,
    taskView: state.task.taskView,
    isLoadingTaskView: state.task.isLoadingTaskView,
    refreshingTaskView: state.task.refreshingTaskView,
    errorLoadingTaskView: state.task.errorLoadingTaskView,
    employees: state.task.employees,
    isLoadingTaskEmployees: state.task.isLoadingTaskEmployees,
    errorLoadingTaskEmployees: state.task.errorLoadingTaskEmployees,
    student: state.infoStudent.student,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    taskActions: bindActionCreators(taskActions, dispatch),
    infoStudentActions: bindActionCreators(infoStudentActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskContainer);
