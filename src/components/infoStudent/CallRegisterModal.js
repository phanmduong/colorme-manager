import React from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
var {height, width} = Dimensions.get('window');

class CallRegisterModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isAppointmentDatePickerVisible: false,
      isTestDatePickerVisible: false,
      appointmentDate: '',
      testDate: '',
      note: '',
    };
  }

  openAppointmentDatePicker = () => {
    this.setState({isAppointmentDatePickerVisible: true});
  };

  openTestDatePicker = () => {
    this.setState({isTestDatePickerVisible: true});
  };

  handleAppointmentDatePicked = date => {
    this.setState({
      isAppointmentDatePickerVisible: false,
      appointmentDate: moment(date),
    });
  };

  handleTestDatePicked = date => {
    this.setState({
      isTestDatePickerVisible: false,
      testDate: moment(date),
    });
  };

  reset = () => {
    this.setState({
      note: '',
      appointmentDate: '',
      testDate: '',
    });
  };

  changeCallStatus = status => {
    this.props.changeCallStatus(
      status,
      this.props.student_id,
      '',
      '',
      this.state.note,
      '',
      this.state.appointmentDate,
      this.state.testDate,
      this.props.token,
    );
    this.reset();
    this.props.onSwipeComplete();
    setTimeout(() => {
      if (this.props.errorChangeCallStatus) {
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
        onSwipeComplete={() => {
          this.reset();
          this.props.onSwipeComplete();
        }}
        swipeDirection={'down'}
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <View style={styles.modal}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={{uri: this.props.imageSource}}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
            <Text style={{marginTop: 25, fontSize: 16}}>
              {this.props.email}
            </Text>
          </View>
          <TextInput
            multiline={true}
            placeholder={'Ghi chú'}
            style={styles.note}
            onChangeText={note => this.setState({note})}
            value={this.state.note}
          />
          <View style={{marginTop: 25, marginHorizontal: 16}}>
            <Text style={{fontSize: 16}}>Hẹn nộp tiền</Text>
            <TouchableOpacity
              style={styles.dateContainer}
              onPress={() => this.openAppointmentDatePicker()}>
              <Text
                style={{
                  fontSize: 16,
                }}>
                {this.state.appointmentDate !== ''
                  ? this.state.appointmentDate.format('DD-MM-YYYY')
                  : ''}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 25, marginHorizontal: 16}}>
            <Text style={{fontSize: 16}}>Hẹn kiểm tra</Text>
            <TouchableOpacity
              style={styles.dateContainer}
              onPress={() => this.openTestDatePicker()}>
              <Text
                style={{
                  fontSize: 16,
                }}>
                {this.state.testDate !== ''
                  ? this.state.testDate.format('DD-MM-YYYY')
                  : ''}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.callContainer}>
            <TouchableOpacity onPress={() => this.changeCallStatus(0)}>
              <View
                style={[
                  styles.callButton,
                  {
                    backgroundColor: '#F54335',
                  },
                ]}>
                <Text style={{color: 'white', fontSize: 16}}>Thất bại</Text>
                <Image
                  source={require('../../../assets/img/icons8-missed_call_filled.png')}
                  style={{width: 25, height: 25}}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.changeCallStatus(1)}>
              <View
                style={[
                  styles.callButton,
                  {
                    backgroundColor: '#2ACC4C',
                  },
                ]}>
                <Text style={{color: 'white', fontSize: 16}}>Thành công</Text>
                <Image
                  source={require('../../../assets/img/icons8-phone_filled.png')}
                  style={{width: 25, height: 25}}
                />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.reset();
              this.props.onSwipeComplete();
            }}>
            <View style={{marginTop: 25, alignItems: 'center'}}>
              <Text style={{fontSize: 16}}>Hủy</Text>
            </View>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isAppointmentDatePickerVisible}
            onConfirm={this.handleAppointmentDatePicked}
            onCancel={() =>
              this.setState({isAppointmentDatePickerVisible: false})
            }
          />
          <DateTimePicker
            isVisible={this.state.isTestDatePickerVisible}
            onConfirm={this.handleTestDatePicked}
            onCancel={() => this.setState({isTestDatePickerVisible: false})}
          />
        </View>
      </Modal>
    );
  }
}

const styles = {
  modal: {
    paddingTop: 30,
    paddingBottom: 50,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  dateContainer: {
    marginTop: 8,
    fontSize: 16,
    height: 40,
    backgroundColor: '#F6F6F6',
    paddingLeft: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  callContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 35,
  },
  callButton: {
    height: 45,
    width: width * 0.45,
    borderRadius: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  note: {
    fontSize: 16,
    backgroundColor: '#F6F6F6',
    marginHorizontal: 16,
    marginTop: 25,
    height: 100,
    paddingLeft: 10,
    borderRadius: 8,
  },
};

export default CallRegisterModal;
