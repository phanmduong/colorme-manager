import React from 'react';
import {Dimensions, Image, Platform, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Spinkit from 'react-native-spinkit';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import * as loginActions from '../actions/loginActions';
import AsyncStorage from '@react-native-community/async-storage';
import * as loginActions from '../actions/loginActions';
import {isEmptyInput} from '../helper';
var {height, width} = Dimensions.get('window');

class AuthLoadingContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (isEmptyInput(this.props.token) || isEmptyInput(this.props.domain)) {
      this._bootstrapAsync();
    } else {
      this._whenLoginSuccess();
    }
  }

  _whenLoginSuccess = () => {
    const params = this.props.navigation.state.params;
    console.log(params);
    if (params && params.routeName) {
      const {routeName, ...routeParams} = params;
      this.props.navigation.navigate({routeName, params: routeParams});
      return;
    }
    this.props.navigation.navigate('Main');
  };

  _logout = () => {
    this.props.navigation.navigate('Login');
  };

  _bootstrapAsync = async () => {
    const username = await AsyncStorage.getItem('@ColorME:username');
    const password = await AsyncStorage.getItem('@ColorME:password');
    const domain = await AsyncStorage.getItem('@ColorME:domain');
    if (username && password && domain) {
      this.props.loginActions.loginUser(
        {username, password},
        domain,
        this._whenLoginSuccess,
        this._logout,
      );
    } else {
      this._logout();
    }
  };

  render() {
    return (
      <View style={styles.containerColorME}>
        <Image
          source={require('../../assets/img/edutoLogo.png')}
          style={{transform: [{scale: 0.2}]}}
        />
        <Spinkit isVisible color="#0A66E9" type="ThreeBounce" size={40} />
      </View>
    );
  }
}

const styles = {
  containerColorME: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentColorME: {
    alignItems: 'flex-end',
    marginBottom: width / 2,
  },
  textColor: {
    color: 'white',
    fontSize: 35,
    fontWeight: Platform.OS === 'ios' ? '900' : 'normal',
    fontFamily: Platform.OS === 'ios' ? 'Segoe UI' : 'SegoeUI-Blank',
    backgroundColor: 'transparent',
  },
  textME: {
    color: 'white',
    fontSize: 100,
    fontWeight: Platform.OS === 'ios' ? '900' : 'normal',
    fontFamily: Platform.OS === 'ios' ? 'Segoe UI' : 'SegoeUI-Blank',
    backgroundColor: 'transparent',
    lineHeight: 100,
  },
};

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
  };
}
function mapStateToProps(state) {
  return {
    login: state.login.login,
    error: state.login.error,
    isLoading: state.login.isLoading,
    user: state.login.user,
    token: state.login.token,
    isGetDataLocalSuccessful: state.login.isGetDataLocalSuccessful,
    isAutoLogin: state.autoLogin.isAutoLogin,
    domain: state.login.domain,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthLoadingContainer);
