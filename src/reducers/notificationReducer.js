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
        notifications: [...state.notifications, ...action.notifications],
        unread: action.unread,
      });
    case types.LOAD_NOTIFICATIONS_ERROR:
      return Object.assign({}, state, {
        isLoadingNotifications: action.isLoadingNotifications,
        errorLoadingNotifications: action.errorLoadingNotifications,
      });
    case types.BEGIN_LOAD_MORE_NOTIFICATIONS:
      return Object.assign({}, state, {
        isLoadingMoreNotifications: action.isLoadingMoreNotifications,
        errorLoadingMoreNotifications: action.errorLoadingMoreNotifications,
      });
    case types.LOAD_MORE_NOTIFICATIONS_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingMoreNotifications: action.isLoadingMoreNotifications,
        errorLoadingMoreNotifications: action.errorLoadingMoreNotifications,
        notifications: [...state.notifications, ...action.notifications],
        unread: action.unread,
      });
    case types.LOAD_MORE_NOTIFICATIONS_ERROR:
      return Object.assign({}, state, {
        isLoadingMoreNotifications: action.isLoadingMoreNotifications,
        errorLoadingMoreNotifications: action.errorLoadingMoreNotifications,
      });
    case types.BEGIN_REFRESH_NOTIFICATIONS:
      return Object.assign({}, state, {
        isRefreshingNotifications: action.isRefreshingNotifications,
        errorRefreshingNotifications: action.errorRefreshingNotifications,
        notifications: action.notifications,
      });
    case types.REFRESH_NOTIFICATIONS_SUCCESSFUL:
      return Object.assign({}, state, {
        isRefreshingNotifications: action.isRefreshingNotifications,
        errorRefreshingNotifications: action.errorRefreshingNotifications,
        notifications: [...state.notifications, ...action.notifications],
        unread: action.unread,
      });
    case types.REFRESH_NOTIFICATION_ERROR:
      return Object.assign({}, state, {
        isRefreshingNotifications: action.isRefreshingNotifications,
        errorRefreshingNotifications: action.errorRefreshingNotifications,
      });
    case types.RESET_NOTIFICATIONS:
      return Object.assign({}, state, {
        notifications: action.notifications,
      });
    case types.BEGIN_READ_NOTIFICATIONS:
      return Object.assign({}, state, {
        isReadingNotifications: action.isReadingNotifications,
        errorReadingNotifications: action.errorReadingNotifications,
      });
    case types.READ_NOTIFICATIONS_SUCCESSFUL:
      return Object.assign({}, state, {
        isReadingNotifications: action.isReadingNotifications,
        errorReadingNotifications: action.errorReadingNotifications,
      });
    case types.READ_NOTIFICATIONS_ERROR:
      return Object.assign({}, state, {
        isReadingNotifications: action.isReadingNotifications,
        errorReadingNotifications: action.errorReadingNotifications,
      });
    default:
      return state;
  }
}
