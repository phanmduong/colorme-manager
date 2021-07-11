import React from 'react';
import {Platform, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import * as loginActions from '../actions/loginActions';
import {isEmptyInput} from '../helper';
import {NOTIFICATION_ID} from '../constants/constant';

class AuthLoadingContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (isEmptyInput(this.props.token)) {
      this._bootstrapAsync();
    } else {
      this._whenLoginSuccess();
    }
  }

  _whenLoginSuccess = () => {
    const params = this.props.navigation.state.params;
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
    if (username && password) {
      setTimeout(() => {
        this.props.loginActions.loginUser(
          {username, password},
          this.props.domain,
          NOTIFICATION_ID,
          this._whenLoginSuccess,
          this._logout,
        );
      }, 1500);
    } else {
      this._logout();
    }
  };

  render() {
    return (
      <LinearGradient
        colors={['#FFC5B8', '#FFC5B8']}
        style={styles.containerColorME}>
        <View style={styles.contentColorME}>
          <Image
            source={require('../../assets/img/colormeanimate.gif')}
            style={{marginLeft: 30}}
          />
        </View>
      </LinearGradient>
    );
  }
}

const styles = {
  containerColorME: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentColorME: {},
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
