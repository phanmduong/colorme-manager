import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function profileReducer(state = initialState.profile, action) {
  switch (action.type) {
    case types.BEGIN_LOAD_PROFILE:
      return Object.assign({}, state, {
        isLoadingProfile: action.isLoadingProfile,
        errorLoadingProfile: action.errorLoadingProfile,
      });
    case types.LOAD_PROFILE_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingProfile: action.isLoadingProfile,
        errorLoadingProfile: action.errorLoadingProfile,
        user: action.user,
        avatar_url: action.avatar_url,
      });
    case types.LOAD_PROFILE_ERROR:
      return Object.assign({}, state, {
        isLoadingProfile: action.isLoadingProfile,
        errorLoadingProfile: action.errorLoadingProfile,
      });
    case types.BEGIN_CHANGE_AVATAR:
      return Object.assign({}, state, {
        isChangingAvatar: action.isChangingAvatar,
        errorChangingAvatar: action.errorChangingAvatar,
      });
    case types.CHANGE_AVATAR_SUCCESSFUL:
      return Object.assign({}, state, {
        isChangingAvatar: action.isChangingAvatar,
        errorChangingAvatar: action.errorChangingAvatar,
        avatar_url: action.avatar_url,
      });
    case types.CHANGE_AVATAR_ERROR:
      return Object.assign({}, state, {
        isChangingAvatar: action.isChangingAvatar,
        errorChangingAvatar: action.errorChangingAvatar,
      });
    case types.UPDATE_SYSTEM_AVATAR:
      return Object.assign({}, initialState.login, {
        user: action.user,
      });
    case types.BEGIN_UPDATE_PROFILE:
      return Object.assign({}, state, {
        isUpdatingProfile: action.isUpdatingProfile,
        errorUpdatingProfile: action.errorUpdatingProfile,
      });
    case types.UPDATE_PROFILE_SUCCESSFUL:
      return Object.assign({}, state, {
        isUpdatingProfile: action.isUpdatingProfile,
        errorUpdatingProfile: action.errorUpdatingProfile,
      });
    case types.UPDATE_PROFILE_ERROR:
      return Object.assign({}, state, {
        isUpdatingProfile: action.isUpdatingProfile,
        errorUpdatingProfile: action.errorUpdatingProfile,
      });
    default:
      return state;
  }
}
