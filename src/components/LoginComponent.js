/**
 * Created by phanmduong on 4/5/17.
 */
import React from 'react';
import {
  Dimensions,
  Keyboard,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Form, InputGroup, Input, Button} from 'native-base';
import ResetPasswordModal from './login/ResetPasswordModal';
var {height, width} = Dimensions.get('window');
import Spinkit from 'react-native-spinkit';
import LinearGradient from 'react-native-linear-gradient';

let self;

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onPressLogin = this.onPressLogin.bind(this);
    this.state = {
      isKeyboardShow: false,
      isResetPasswordModalVisible: false,
    };
    self = this;
  }

  onPressLogin() {
    this.props.onClickLogin();
    Keyboard.dismiss();
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }

  keyboardDidShow() {
    self.setState({
      isKeyboardShow: true,
    });
    self.props.changeStatusBarColor('default');
  }

  keyboardDidHide() {
    self.setState({
      isKeyboardShow: false,
    });
    self.props.changeStatusBarColor('light-content');
  }

  toggleResetPasswordModal = () => {
    this.setState({
      isResetPasswordModalVisible: !this.state.isResetPasswordModalVisible,
    });
  };

  render() {
    return (
      <View
        style={{
          ...styles.container,
          ...{
            paddingBottom:
              this.state.isKeyboardShow && Platform.OS === 'ios'
                ? height / 3
                : 0,
            justifyContent: !this.state.isKeyboardShow
              ? 'flex-start'
              : 'center',
            alignItems: !this.state.isKeyboardShow ? 'stretch' : 'center',
          },
        }}>
        {!this.state.isKeyboardShow && (
          <LinearGradient
            colors={['#ff0064', '#c51600']}
            style={styles.containerColorME}>
            <View style={styles.contentColorME}>
              <Text style={styles.textColor}>color</Text>
              <Text style={styles.textME}>ME</Text>
            </View>
          </LinearGradient>
        )}
        {!this.state.isKeyboardShow && (
          <View style={{flex: 1, backgroundColor: '#fff'}} />
        )}
        <View
          style={{
            ...styles.containerFormLogin,
            ...{
              position: !this.state.isKeyboardShow ? 'absolute' : 'relative',
              top: !this.state.isKeyboardShow ? height / 2 - 25 : 0,
            },
          }}>
          <View
            style={{
              flex: 1,
              position: 'relative',
            }}>
            <View style={styles.contentForm}>
              <Form>
                <Text style={styles.textTitleInput}>EMAIL</Text>
                <InputGroup style={{width: width - width * 0.3}}>
                  <Input
                    value={this.props.username}
                    onChangeText={(data) =>
                      this.props.updateFormData('username', data)
                    }
                    returnKeyType={'next'}
                    placeholder="Email"
                    blurOnSubmit={false}
                    keyboardType={'email-address'}
                    onSubmitEditing={() => {
                      this.refs.password._root.focus();
                    }}
                    editable={!this.props.isLoading}
                    style={{
                      lineHeight: 20,
                      height: 40,
                    }}
                  />
                </InputGroup>
                <Text
                  style={{
                    ...styles.textTitleInput,
                    ...{
                      paddingTop: 15,
                    },
                  }}>
                  PASSWORD
                </Text>
                <InputGroup>
                  <Input
                    style={{
                      height: 40,
                    }}
                    ref="password"
                    secureTextEntry
                    onChangeText={(data) =>
                      this.props.updateFormData('password', data)
                    }
                    value={this.props.password}
                    returnKeyType={'done'}
                    placeholder="Password"
                    onSubmitEditing={this.props.onClickLogin}
                    editable={!this.props.isLoading}
                  />
                </InputGroup>
              </Form>
            </View>
            <Button
              disabled={this.props.isLoading}
              block
              rounded
              style={styles.button}
              onPress={this.onPressLogin}>
              {this.props.isLoading ? (
                <View style={styles.containerLoading}>
                  <Spinkit
                    isVisible
                    color="white"
                    type="ThreeBounce"
                    size={40}
                  />
                </View>
              ) : (
                <Text style={styles.textLogin}>ĐĂNG NHẬP</Text>
              )}
            </Button>
          </View>
        </View>
        <View
          style={{
            ...styles.contentResetPassword,
            ...{position: !this.state.isKeyboardShow ? 'absolute' : 'relative'},
          }}>
          <TouchableOpacity onPress={this.toggleResetPasswordModal}>
            <Text style={styles.textResetPassword}>QUÊN MẬT KHẨU?</Text>
          </TouchableOpacity>
        </View>
        <ResetPasswordModal
          isVisible={this.state.isResetPasswordModalVisible}
          onSwipeComplete={this.toggleResetPasswordModal}
        />
      </View>
    );
  }
}

const styles = {
  container_image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 100,
    width: 100,
  },
  container_form: {
    flex: 3,
    marginHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ff0038',
    position: 'absolute',
    height: 45,
    bottom: -23,
    elevation: 11,
    shadowColor: '#666666',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    marginHorizontal: width / 5,
    width: width - (2 * width) / 5,
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  containerColorME: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentColorME: {
    alignItems: 'flex-end',
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
  containerFormLogin: {
    height: (2 * height) / 5,
    width: width,
    paddingBottom: 25,
  },
  contentForm: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: width / 10,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#666666',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitleInput: {
    color: '#ff0038',
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    fontFamily: Platform.OS === 'ios' ? 'Segoe UI' : 'SegoeUI-Bold',
  },
  contentResetPassword: {
    bottom: 0,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 10,
  },
  textResetPassword: {
    color: '#797979',
    fontWeight: 'bold',
  },
  textLogin: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default LoginComponent;
