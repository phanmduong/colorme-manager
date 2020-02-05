/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import DashboardComponent from '../components/DashboardComponent';
import * as taskActions from '../actions/taskActions';
import * as notificationActions from '../actions/notificationActions';
import MeetingStore from './meeting/MeetingStore';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

class DashboardContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = new MeetingStore(props.token);
  }

  componentDidMount() {
    this.store.loadList();
    this.loadTasks();
    this.loadNotifications();
  }

  loadTasks = () => {
    this.props.taskActions.loadTaskView(
      moment(new Date()).format('YYYY-MM-DD'),
      this.props.user.id,
      this.props.token,
    );
  };

  loadNotifications = () => {
    this.props.notificationActions.loadNotifications(1, this.props.token);
  };

  render() {
    console.log(this.props.unread);
    return <DashboardComponent store={this.store} {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    user: state.login.user,
    avatar_url: state.login.user.avatar_url,
    taskView: state.task.taskView,
    isLoadingTaskView: state.task.isLoadingTaskView,
    errorLoadingTaskView: state.task.errorLoadingTaskView,
    notifications: state.notification.notifications,
    unread: state.notification.unread,
    isLoadingNotifications: state.notification.isLoadingNotifications,
    errorLoadingNotifications: state.notification.errorLoadingNotifications,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    taskActions: bindActionCreators(taskActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardContainer);
