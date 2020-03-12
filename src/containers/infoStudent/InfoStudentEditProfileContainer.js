import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as infoStudentActions from '../../actions/infoStudentActions';
import * as saveRegisterActions from '../../actions/saveRegisterActions';
import InfoStudentEditProfileComponent from '../../components/infoStudent/InfoStudentEditProfileComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from "../../styles";

class InfoStudentEditProfileContainer extends React.Component {
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

  componentDidMount = () => {
    this.loadProvinces();
  };

  loadProvinces = () => {
    this.props.saveRegisterActions.loadProvinces(this.props.token);
  };

  updateProfile = register => {
    this.props.infoStudentActions.updateProfile(register, this.props.token);
  };

  render() {
    return (
      <InfoStudentEditProfileComponent
        {...this.props}
        isLoadingProvinces={this.props.isLoadingProvinces}
        provinces={this.props.provinces}
        isUpdatingProfile={this.props.isUpdatingProfile}
        errorUpdatingProfile={this.props.errorUpdatingProfile}
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
    isLoadingProvinces: state.saveRegister.isLoadingProvinces,
    errorLoadingProvinces: state.saveRegister.errorLoadingProvinces,
    provinces: state.saveRegister.provinces,
    isUpdatingProfile: state.infoStudent.isUpdatingProfile,
    errorUpdatingProfile: state.infoStudent.errorUpdatingProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    infoStudentActions: bindActionCreators(infoStudentActions, dispatch),
    saveRegisterActions: bindActionCreators(saveRegisterActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoStudentEditProfileContainer);
