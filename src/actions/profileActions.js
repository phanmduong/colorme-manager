import * as types from '../constants/actionTypes';
import * as profileApi from '../apis/profileApi';

export function loadProfile(token, domain) {
  return function(dispatch) {
    dispatch(beginLoadProfile());
    profileApi
      .loadProfile(token, domain)
      .then(function(res) {
        dispatch(loadProfileSuccessful(res));
      })
      .catch(error => {
        dispatch(loadProfileError());
        throw error;
      });
  };
}

function beginLoadProfile() {
  return {
    type: types.BEGIN_LOAD_PROFILE,
    isLoadingProfile: true,
    errorLoadingProfile: false,
  };
}

function loadProfileSuccessful(res) {
  return {
    type: types.LOAD_PROFILE_SUCCESSFUL,
    isLoadingProfile: false,
    errorLoadingProfile: false,
    avatar_url: res.data.data.user.avatar_url,
    user: res.data.data.user,
  };
}

function loadProfileError() {
  return {
    type: types.LOAD_PROFILE_ERROR,
    isLoadingProfile: false,
    errorLoadingProfile: false,
  };
}

export function changeAvatar(id, user, file, token, domain) {
  return function(dispatch) {
    dispatch(beginChangeAvatar());
    profileApi
      .changeAvatar(id, file, token, domain)
      .then(function (res) {
        dispatch(updateSystemAvatar(user, res));
        dispatch(changeAvatarSuccessful(res));
      })
      .catch((error) => {
        dispatch(changeAvatarError());
        throw error;
      });
  };
}

function beginChangeAvatar() {
  return {
    type: types.BEGIN_CHANGE_AVATAR,
    isChangingAvatar: true,
    errorChangingAvatar: false,
  };
}

function changeAvatarSuccessful(res) {
  return {
    type: types.CHANGE_AVATAR_SUCCESSFUL,
    isChangingAvatar: false,
    errorChangingAvatar: false,
    avatar_url: res.data.avatar_url,
  };
}

function updateSystemAvatar(user, res) {
  user.avatar_url = res.data.avatar_url;
  return {
    type: types.UPDATE_SYSTEM_AVATAR,
    user: user,
  };
}

function changeAvatarError() {
  return {
    type: types.CHANGE_AVATAR_ERROR,
    isChangingAvatar: false,
    errorChangingAvatar: true,
  };
}

export function updateProfile(profile, token, domain) {
  return function(dispatch) {
    dispatch(beginUpdateProfile());
    profileApi
      .updateProfile(profile, token, domain)
      .then(function(res) {
        dispatch(updateProfileSuccessful());
        dispatch(loadProfile(token));
      })
      .catch(error => {
        dispatch(updateProfileError());
        throw error;
      });
  };
}

function beginUpdateProfile() {
  return {
    type: types.BEGIN_UPDATE_PROFILE,
    isUpdatingProfile: true,
    errorUpdatingProfile: false,
  };
}

function updateProfileSuccessful() {
  return {
    type: types.UPDATE_PROFILE_SUCCESSFUL,
    isUpdatingProfile: false,
    errorUpdatingProfile: false,
  };
}

function updateProfileError() {
  return {
    type: types.UPDATE_PROFILE_ERROR,
    isUpdatingProfile: false,
    errorUpdatingProfile: true,
  };
}
