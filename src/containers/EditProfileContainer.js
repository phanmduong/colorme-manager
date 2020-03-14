import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as profileActions from '../actions/profileActions';
import EditProfileComponent from '../components/EditProfileComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from "../styles";

class EditProfileContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

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
          <Text style={styles.name}>Chỉnh sửa thông tin</Text>
        </View>
      </View>
    ),
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

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
};

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
