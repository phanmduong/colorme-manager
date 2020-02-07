import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as profileActions from '../actions/profileActions';
import EditProfileComponent from '../components/EditProfileComponent';

class EditProfileContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Chỉnh sửa thông tin',
  });

  updateProfile = profile => {
    this.props.profileActions.updateProfile(profile, this.props.token);
  };

  render() {
    return (
      <EditProfileComponent
        {...this.props}
        updateProfile={this.updateProfile}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    profile: state.profile.user,
    isUpdatingProfile: state.profile.isUpdatingProfile,
    errorUpdatingProfile: state.profile.errorUpdatingProfile,
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
)(EditProfileContainer);
