import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as profileActions from '../actions/profileActions';
import ProfileComponent from '../components/ProfileComponent';

class ProfileContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadProfile();
  };

  static navigationOptions = ({navigation}) => ({
    title: 'Thông tin cá nhân',
  });

  loadProfile = () => {
    this.props.profileActions.loadProfile(this.props.token);
  };

  changeAvatar = imageUri => {
    this.props.profileActions.changeAvatar(
      this.props.user.id,
      this.props.user,
      imageUri,
      this.props.token,
    );
  };

  render() {
    return (
      <ProfileComponent
        {...this.props}
        user={this.props.user}
        avatar_url={this.props.avatar_url}
        isLoadingProfile={this.props.isLoadingProfile}
        errorLoadingProfile={this.props.errorLoadingProfile}
        isChangingAvatar={this.props.isChangingAvatar}
        errorChangingAvatar={this.props.errorChangingAvatar}
        changeAvatar={this.changeAvatar}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    user: state.login.user,
    profile: state.profile.user,
    avatar_url: state.profile.avatar_url,
    isLoadingProfile: state.profile.isLoadingProfile,
    errorLoadingProfile: state.errorLoadingProfile,
    isChangingAvatar: state.profile.isChangingAvatar,
    errorChangingAvatar: state.profile.errorChangingAvatar,
    changeAvatarMessage: state.profile.changeAvatarMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    profileActions: bindActionCreators(profileActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileContainer);
