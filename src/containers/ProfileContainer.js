import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as profileActions from '../actions/profileActions';
import ProfileComponent from '../components/ProfileComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ProfileContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadProfile();
  };

  static navigationOptions = ({navigation}) => ({
    headerLeft: () => (
      <View style={styles.headerLeftContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name={'chevron-left'}
            size={33}
            color={'black'}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.name}>Thông tin cá nhân</Text>
        </View>
      </View>
    ),
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
        onRefresh={this.loadProfile}
      />
    );
  }
}

const styles = {
  name: {
    fontWeight: '600',
    fontSize: 23,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginLeft: 10,
  },
};

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
