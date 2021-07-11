/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import DashboardComponent from '../components/DashboardComponent';
import * as taskActions from '../actions/taskActions';
import * as notificationActions from '../actions/notificationActions';
import * as registerListActions from '../actions/registerListActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import * as analyticsActions from '../actions/analyticsActions';
import * as tabActions from '../actions/tabActions';
import MeetingStore from './meeting/MeetingStore';
import OneSignal from 'react-native-onesignal';

class DashboardContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = new MeetingStore(props.token, props.domain);
  }

  componentDidMount() {
    this.store.loadList();
    this.loadTasks();
    this.loadNotifications();
    this.loadTabs();
    this.getAnalyticsGenData();

    // Calling registerForPushNotifications
    OneSignal.promptForPushNotificationsWithUserResponse((response) =>
      console.log(response),
    );
  }

  loadTabs = () => {
    this.props.tabActions.loadTabs(this.props.token, this.props.domain);
  };

  loadTasks = () => {
    this.props.taskActions.loadTaskView(
      moment(new Date()).format('YYYY-MM-DD'),
      this.props.user.id,
      this.props.token,
      this.props.domain,
    );
  };

  refreshNotifications = () => {
    this.props.notificationActions.refreshNotifications(
      1,
      this.props.token,
      this.props.domain,
    );
  };

  loadNotifications = () => {
    this.props.notificationActions.loadNotifications(
      1,
      this.props.token,
      this.props.domain,
    );
  };

  setAutoFocusRegisterListSearch = (bool) => {
    this.props.registerListActions.setAutoFocusRegisterListSearch(bool);
  };

  getAnalyticsGenData = async () => {
    try {
      const genId = await AsyncStorage.getItem('@analytics_gen_id');
      const startDate = await AsyncStorage.getItem('@analytics_start_date');
      const endDate = await AsyncStorage.getItem('@analytics_end_date');
      if (genId !== null && startDate != null && endDate != null) {
        this.props.analyticsActions.selectedStartDate(moment(startDate));
        this.props.analyticsActions.selectedEndDate(moment(endDate));
        this.props.analyticsActions.selectedGenId(parseInt(genId));
      }
    } catch (e) {
      // error reading value
    }
  };

  render() {
    return (
      <DashboardComponent
        store={this.store}
        {...this.props}
        refreshNotifications={this.refreshNotifications}
        refreshTasks={this.loadTasks}
        setAutoFocusRegisterListSearch={this.setAutoFocusRegisterListSearch}
      />
    );
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
    isRefreshingNotifications: state.notification.isRefreshingNotifications,
    errorRefreshingNotifications:
      state.notification.errorRefreshingNotifications,
    isReadingNotifications: state.notification.isReadingNotifications,
    errorReadingNotifications: state.notification.errorReadingNotifications,
    domain: state.login.domain,
    tabs: state.tab.tabs,
    isLoadingTabs: state.tab.loading,
    errorTabs: state.tab.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    taskActions: bindActionCreators(taskActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
    registerListActions: bindActionCreators(registerListActions, dispatch),
    analyticsActions: bindActionCreators(analyticsActions, dispatch),
    tabActions: bindActionCreators(tabActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
