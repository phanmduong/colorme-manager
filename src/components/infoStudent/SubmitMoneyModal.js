import React from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
var {width, height} = Dimensions.get('window');
import theme from '../../styles';

const CHUYEN_KHOAN = 'internet_banking';
const TIEN_MAT = 'cash';

class SubmitMoneyModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      money: '0',
      note: '',
      code: this.props.code,
      payment_method: CHUYEN_KHOAN,
    };
  }

  reset = () => {
    this.setState({
      money: '0',
      note: '',
      code: this.props.code,
      payment_method: CHUYEN_KHOAN,
    });
  };

  submitMoney = () => {
    this.props.submitMoney(
      this.props.register_id,
      this.state.money,
      this.state.code,
      this.state.note,
      this.state.payment_method,
      this.props.token,
    );
    this.reset();
    this.props.onSwipeComplete();
    setTimeout(() => {
      if (this.props.errorSubmitMoney) {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
      } else {
        Alert.alert('Thông báo', 'Ghi nhận thành công');
      }
    }, 600);
  };

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        avoidKeyboard={true}
        onBackdropPress={this.props.onSwipeComplete}
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <View style={styles.modal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 30,
              }}>
              <Image
                source={{uri: this.props.class.avatar_url}}
                style={styles.avatar}
              />
              <Image
                source={{uri: this.props.avatar_url}}
                style={[styles.avatar, {left: -5}]}
              />
              <Text style={styles.title}>Nộp học phí</Text>
            </View>
            <View style={{marginTop: 25}}>
              <Text style={styles.subTitle}>Học viên: {this.props.name}</Text>
              <Text style={styles.subTitle}>
                Lớp: {this.props.class.name} - {this.props.class.study_time}
              </Text>
              <Text style={styles.subTitle}>
                Khai giảng: {this.props.class.description}
              </Text>
              <Text style={styles.subTitle}>
                Phòng học: {this.props.class.room} - {this.props.class.base}
              </Text>
            </View>
            <View style={{marginTop: 25}}>
              <Text style={styles.titleForm}>
                Học phí <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  keyboardType={'number-pad'}
                  value={this.state.money}
                  ref={'money'}
                  onChangeText={data => this.setState({money: data})}
                  returnKeyType={'next'}
                  placeholder="0"
                  blurOnSubmit={false}
                  onSubmitEditing={event => {
                    this.refs.note.focus();
                  }}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 8}}>
              <Text style={styles.titleForm}>Ghi chú</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.note}
                  ref={'note'}
                  onChangeText={data => this.setState({note: data})}
                  returnKeyType={'next'}
                  placeholder="Ghi chú"
                  blurOnSubmit={false}
                  onSubmitEditing={event => {
                    this.refs.code.focus();
                  }}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 8}}>
              <Text style={styles.titleForm}>Mã học viên</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  {...this.props}
                  value={this.state.code}
                  ref={'code'}
                  placeholder="Mã học viên"
                  onChangeText={data => this.setState({code: data})}
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  onSubmitEditing={event => {
                    this.refs.code.blur();
                  }}
                  style={{fontSize: 15}}
                />
              </View>
            </View>
            <View style={{marginTop: 8}}>
              <Text style={styles.titleForm}>
                Phương thức thanh toán <Text style={{color: '#C50000'}}>*</Text>
              </Text>
              <View style={{marginTop: 8, flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => this.setState({payment_method: CHUYEN_KHOAN})}>
                  <View
                    style={
                      this.state.payment_method === CHUYEN_KHOAN
                        ? styles.selected
                        : styles.unselected
                    }>
                    <Text
                      style={
                        this.state.payment_method === CHUYEN_KHOAN
                          ? styles.selectedText
                          : styles.unselectedText
                      }>
                      Chuyển khoản
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({payment_method: TIEN_MAT})}>
                  <View
                    style={
                      this.state.payment_method === TIEN_MAT
                        ? styles.selected
                        : styles.unselected
                    }>
                    <Text
                      style={
                        this.state.payment_method === TIEN_MAT
                          ? styles.selectedText
                          : styles.unselectedText
                      }>
                      Tiền mặt
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={this.submitMoney}>
              <View style={{marginTop: 25}}>
                <View style={styles.submitButton}>
                  <Text style={{color: 'white'}}>Hoàn tất</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.onSwipeComplete}>
              <View style={styles.cancelContainer}>
                <Text style={{color: theme.mainColor}}>Hủy</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = {
  titleForm: {
    color: 'black',
    fontSize: 14,
  },
  inputContainer: {
    marginTop: 8,
    height: 45,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  selected: {
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
  },
  unselected: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
  },
  selectedText: {
    color: 'black',
    fontWeight: 'bold',
  },
  unselectedText: {
    color: '#707070',
  },
  modal: {
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 16,
    height: height - 140,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
  },
  title: {
    color: 'black',
    fontSize: 23,
    fontWeight: '600',
    marginLeft: 10,
  },
  subTitle: {
    color: '#707070',
    paddingTop: 5,
  },
  submitButton: {
    height: 45,
    borderRadius: 24,
    backgroundColor: '#2ACC4C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelContainer: {
    marginTop: 25,
    alignItems: 'center',
    paddingBottom: 30,
  },
};

export default SubmitMoneyModal;
