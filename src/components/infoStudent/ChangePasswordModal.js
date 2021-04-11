import React from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
import Modal from 'react-native-modal';
import {isEmptyInput} from '../../helper';
import SubmitButton from '../common/SubmitButton';
import Input from '../common/Input';

class ChangePasswordModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      password: '',
    };
  }

  changePassword = () => {
    const {changePassword, closeModal} = this.props;
    if (isEmptyInput(this.state.password)) {
      Alert.alert('Thông báo', 'Bạn chưa nhập mật khẩu');
    } else if (this.state.password.length < 8) {
      Alert.alert('Thông báo', 'Mật khẩu cần có ít nhất 8 kí tự');
    } else {
      changePassword(this.state.password);
      closeModal();
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
          <Input
            title={'Mật khẩu mới'}
            required
            value={this.state.password}
            onChangeText={(data) => this.setState({password: data})}
            placeholder={'Mật khẩu mới'}
            returnKeyType={'send'}
            onSubmitEditing={this.changePassword}
          />
          <SubmitButton
            loading={isChangingPassword}
            title={'Lưu'}
            onPress={this.changePassword}
            containerStyle={styles.btnSubmit}
          />
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    alignSelf: 'center',
  },
  btnSubmit: {
    marginTop: 30,
  },
};

export default ChangePasswordModal;
