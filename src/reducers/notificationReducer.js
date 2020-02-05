import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function notificationReducer(
  state = initialState.notification,
  action,
) {
  switch (action.type) {
    case types.BEGIN_LOAD_NOTIFICATIONS:
      return Object.assign({}, state, {
        isLoadingNotifications: action.isLoadingNotifications,
        errorLoadingNotifications: action.errorLoadingNotifications,
      });
    case types.LOAD_NOTIFICATIONS_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingNotifications: action.isLoadingNotifications,
        errorLoadingNotifications: action.errorLoadingNotifications,
        notifications: action.notifications,
        unread: action.unread,
      });
    case types.LOAD_NOTIFICATIONS_ERROR:
      return Object.assign({}, state, {
        isLoadingNotifications: action.isLoadingNotifications,
        errorLoadingNotifications: action.errorLoadingNotifications,
      });
    default:
      return state;
  }
}
