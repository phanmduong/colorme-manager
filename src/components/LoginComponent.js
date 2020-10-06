/**
 * Created by phanmduong on 4/5/17.
 */
import React from 'react';
import {
  Keyboard,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
import Autocomplete from 'react-native-autocomplete-input';
import {isEmptyInput} from '../helper';

let self;

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onPressLogin = this.onPressLogin.bind(this);
    this.state = {
      isKeyboardShow: false,
      isResetPasswordModalVisible: false,
      hideResults: true,
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

  filterSearch = () => {
    if (isEmptyInput(this.props.domain)) {
      return this.props.domains.sort(function (a, b) {
        if (a.domain < b.domain) {
          return -1;
        }
        if (a.domain > b.domain) {
          return 1;
        }
        return 0;
      });
    }
    return this.props.domains
      .filter((item) => {
        return item.domain
          .toLowerCase()
          .includes(this.props.domain.toLowerCase());
      })
      .sort(function (a, b) {
        if (a.domain < b.domain) {
          return -1;
        }
        if (a.domain > b.domain) {
          return 1;
        }
        return 0;
      });
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          this.setState({hideResults: true});
        }}>
        <KeyboardAvoidingView
          behavior={'padding'}
          enabled
          style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/img/ieg.png')}
              style={{transform: [{scale: 0.2}]}}
            />
          </View>
          <View style={styles.loginContainer}>
            {Platform.OS === 'ios' ? (
              <Autocomplete
                data={this.filterSearch()}
                inputContainerStyle={{borderWidth: 0}}
                hideResults={this.state.hideResults}
                listStyle={styles.listStyle}
                renderItem={({item, i}) => (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.updateDomainForm(item.domain);
                      this.setState({hideResults: true});
                    }}>
                    <Text style={styles.listName}>{item.domain}</Text>
                  </TouchableOpacity>
                )}
                renderTextInput={() => (
                  <View>
                    <Text style={styles.titleForm}>Chọn trung tâm</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        value={this.props.domain}
                        ref={'domain'}
                        onChangeText={(data) => {
                          this.props.updateDomainForm(data);
                          this.setState({hideResults: false});
                        }}
                        returnKeyType={'next'}
                        placeholder="Chọn trung tâm"
                        blurOnSubmit={false}
                        onFocus={() => this.setState({hideResults: false})}
                        onBlur={() => this.setState({hideResults: true})}
                        onSubmitEditing={(event) => {
                          this.refs.username.focus();
                          this.setState({hideResults: true});
                        }}
                        editable={!this.props.isLoading}
                        autoCapitalize={'none'}
                        style={{fontSize: 15}}
                      />
                    </View>
                  </View>
                )}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  left: 0,
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  zIndex: 1,
                }}>
                <Autocomplete
                  data={this.filterSearch()}
                  inputContainerStyle={{borderWidth: 0}}
                  hideResults={this.state.hideResults}
                  listStyle={styles.listStyle}
                  renderItem={({item, i}) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.updateDomainForm(item.domain);
                        this.setState({hideResults: true});
                      }}>
                      <Text style={styles.listName}>{item.domain}</Text>
                    </TouchableOpacity>
                  )}
                  renderTextInput={() => (
                    <View>
                      <Text style={styles.titleForm}>Chọn trung tâm</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          value={this.props.domain}
                          ref={'domain'}
                          onChangeText={(data) => {
                            this.props.updateDomainForm(data);
                            this.setState({hideResults: false});
                          }}
                          returnKeyType={'next'}
                          placeholder="Chọn trung tâm"
                          blurOnSubmit={false}
                          onFocus={() => this.setState({hideResults: false})}
                          onBlur={() => this.setState({hideResults: true})}
                          onSubmitEditing={(event) => {
                            this.refs.username.focus();
                            this.setState({hideResults: true});
                          }}
                          editable={!this.props.isLoading}
                          autoCapitalize={'none'}
                          style={{fontSize: 15}}
                        />
                      </View>
                    </View>
                  )}
                />
              </View>
            )}
            <View
              style={
                Platform.OS === 'ios' ? {marginTop: 30} : {marginTop: 100}
              }>
              <Text style={styles.titleForm}>Tên đăng nhập</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={this.props.username}
                  ref={'username'}
                  onChangeText={(data) =>
                    this.props.updateFormData('username', data)
                  }
                  returnKeyType={'next'}
                  placeholder="username"
                  blurOnSubmit={false}
                  onSubmitEditing={(event) => {
                    this.refs.password.focus();
                  }}
                  style={{fontSize: 15}}
                  autoCapitalize={'none'}
                  editable={!this.props.isLoading}
                />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.titleForm}>Mật khẩu</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={this.props.password}
                  ref={'password'}
                  onChangeText={(data) =>
                    this.props.updateFormData('password', data)
                  }
                  returnKeyType={'done'}
                  placeholder="password"
                  blurOnSubmit={false}
                  onSubmitEditing={this.props.onClickLogin}
                  secureTextEntry
                  editable={!this.props.isLoading}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            {!this.props.isLoading ? (
              <TouchableOpacity onPress={() => this.onPressLogin()}>
                <View style={styles.btnSubmit} onPress={this.onPressLogin}>
                  <Text style={{color: 'white'}}>Đăng nhập</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.btnSubmit}>
                <Spinkit isVisible color="white" type="ThreeBounce" size={40} />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: theme.mainHorizontal,
  },
  titleForm: {
    color: 'black',
    fontSize: 14,
  },
  inputContainer: {
    marginTop: 8,
    height: 45,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  btnSubmit: {
    backgroundColor: '#0A66E9',
    paddingHorizontal: 20,
    borderRadius: 25,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    flex: 2,
  },
  listName: {
    fontSize: 15,
    paddingTop: 15,
    paddingLeft: 20,
  },
  listStyle: {
    borderWidth: 0,
    paddingBottom: 15,
  },
};

export default LoginComponent;
