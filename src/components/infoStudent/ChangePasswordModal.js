import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Spinkit from 'react-native-spinkit';
import {isEmptyInput} from '../../helper';

class ChangePasswordModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      password: '',
      retypedPassword: '',
    };
  }

  changePassword = () => {
    const {changePassword, errorPassword, closeModal} = this.props;
    if (
      isEmptyInput(this.state.password) ||
      isEmptyInput(this.state.retypedPassword)
    ) {
      Alert.alert('Thông báo', 'Bạn chưa nhập mật khẩu');
    } else if (this.state.retypedPassword !== this.state.password) {
      Alert.alert('Thông báo', 'Mật khẩu nhập lại không khớp');
    } else {
      changePassword(this.state.retypedPassword);
      closeModal();
      setTimeout(function() {
        if (errorPassword) {
          Alert.alert('Thông báo', 'Có lỗi xảy ra');
        } else {
          Alert.alert('Thông báo', 'Thay đổi mật khẩu thành công');
        }
      }, 500);
    }
  };

  render() {
    const {isVisible, isChangingPassword, closeModal} = this.props;
    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={closeModal}
        onSwipeComplete={closeModal}
        swipeDirection="down"
        avoidKeyboard={true}>
        <View style={styles.fullView}>
          <Text style={styles.headerTitle}>Thay đổi mật khẩu</Text>
          <View style={{marginTop: 30}}>
            <Text style={styles.titleForm}>
              Mật khẩu mới <Text style={{color: '#C50000'}}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={this.state.password}
                onChangeText={data => this.setState({password: data})}
                returnKeyType={'next'}
                placeholder="Mật khẩu mới"
                blurOnSubmit={false}
                style={{fontSize: 15}}
                onSubmitEditing={() => this.refs.retypedPassword.focus()}
              />
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <Text style={styles.titleForm}>
              Nhập lại mật khẩu <Text style={{color: '#C50000'}}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={this.state.retypedPassword}
                onChangeText={data => this.setState({retypedPassword: data})}
                returnKeyType={'next'}
                placeholder="Nhập lại mật khẩu"
                blurOnSubmit={false}
                ref={'retypedPassword'}
                onSubmitEditing={event => {
                  this.refs.retypedPassword.blur();
                }}
                style={{fontSize: 15}}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => this.changePassword()}>
            <LinearGradient
              colors={['#E26800', '#E00000']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.btnSubmit}>
              {!isChangingPassword ? (
                <Text style={{color: 'white'}}>Thay đổi</Text>
              ) : (
                <Spinkit isVisible color="white" type="ThreeBounce" size={40} />
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = {
  fullView: {
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  inputContainer: {
    marginTop: 8,
    height: 45,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  titleForm: {
    color: 'black',
    fontSize: 14,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    alignSelf: 'center',
  },
  btnSubmit: {
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
};

export default ChangePasswordModal;
