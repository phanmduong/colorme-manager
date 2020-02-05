import * as types from '../constants/actionTypes';
import * as notificationApi from '../apis/notificationApi';

export function loadNotifications(page, token) {
  return function(dispatch) {
    dispatch(beginLoadNotifications());
    notificationApi
      .loadNotifications(page, token)
      .then(function(res) {
        dispatch(loadNotificationsSuccessful(res));
      })
      .catch(error => {
        dispatch(loadNotificationsError());
        throw error;
      });
  };
}

function beginLoadNotifications() {
  return {
    type: types.BEGIN_LOAD_NOTIFICATIONS,
    isLoadingNotifications: true,
    errorLoadingNotifications: false,
  };
}

function loadNotificationsSuccessful(res) {
  return {
    type: types.LOAD_NOTIFICATIONS_SUCCESSFUL,
    isLoadingNotifications: false,
    errorLoadingNotifications: false,
    notifications: res.data.data.notifications,
    unread: res.data.data.unread,
  };
}

function loadNotificationsError() {
  return {
    type: types.LOAD_NOTIFICATIONS_ERROR,
    isLoadingNotifications: false,
    errorLoadingNotifications: true,
  };
}

export function resetNotifications() {
  return {
    type: types.RESET_NOTIFICATIONS,
    notifications: [],
  };
}

export function loadMoreNotifications(page, token) {
  return function(dispatch) {
    dispatch(beginLoadMoreNotifications());
    notificationApi
      .loadNotifications(page, token)
      .then(function(res) {
        dispatch(loadMoreNotificationsSuccessful(res));
      })
      .catch(error => {
        dispatch(loadMoreNotificationsError());
        throw error;
      });
  };
}

function beginLoadMoreNotifications() {
  return {
    type: types.BEGIN_LOAD_MORE_NOTIFICATIONS,
    isLoadingMoreNotifications: true,
    errorLoadingMoreNotifications: false,
  };
}

function loadMoreNotificationsSuccessful(res) {
  return {
    type: types.LOAD_MORE_NOTIFICATIONS_SUCCESSFUL,
    isLoadingMoreNotifications: false,
    errorLoadingMoreNotifications: false,
    notifications: res.data.data.notifications,
    unread: res.data.data.unread,
  };
}

function loadMoreNotificationsError() {
  return {
    type: types.LOAD_MORE_NOTIFICATIONS_ERROR,
    isLoadingMoreNotifications: false,
    errorLoadingMoreNotifications: true,
  };
}

export function refreshNotifications(page, token) {
  return function(dispatch) {
    dispatch(beginRefreshNotifications());
    notificationApi
      .loadNotifications(page, token)
      .then(function(res) {
        dispatch(refreshNotificationsSuccessful(res));
      })
      .catch(error => {
        dispatch(refreshNotificationsError());
        throw error;
      });
  };
}

function beginRefreshNotifications() {
  return {
    type: types.BEGIN_REFRESH_NOTIFICATIONS,
    isRefreshingNotifications: true,
    errorRefreshingNotifications: false,
    notifications: [],
  };
}

function refreshNotificationsSuccessful(res) {
  return {
    type: types.REFRESH_NOTIFICATIONS_SUCCESSFUL,
    isRefreshingNotifications: false,
    errorRefreshingNotifications: false,
    notifications: res.data.data.notifications,
    unread: res.data.data.unread,
  };
}

function refreshNotificationsError() {
  return {
    type: types.REFRESH_NOTIFICATION_ERROR,
    isRefreshingNotifications: false,
    errorRefreshingNotifications: true,
  };
}

export function readAllNotifications(token) {
  return function(dispatch) {
    dispatch(beginReadNotifications());
    notificationApi
      .readAllNotifications(token)
      .then(function(res) {
        dispatch(readNotificationsSuccessful());
      })
      .catch(error => {
        dispatch(readNotificationsError());
        throw error;
      });
  };
}

function beginReadNotifications() {
  return {
    type: types.BEGIN_READ_NOTIFICATIONS,
    isReadingNotifications: true,
    errorReadingNotifications: false,
  };
}

function readNotificationsSuccessful() {
  return {
    type: types.READ_NOTIFICATIONS_SUCCESSFUL,
    isReadingNotifications: false,
    errorReadingNotifications: false,
  };
}

function readNotificationsError() {
  return {
    type: types.READ_NOTIFICATIONS_ERROR,
    isReadingNotifications: false,
    errorReadingNotifications: true,
  };
}
