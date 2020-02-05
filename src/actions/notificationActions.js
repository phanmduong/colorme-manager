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
