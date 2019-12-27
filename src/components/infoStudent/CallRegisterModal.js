import React from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Call from '../common/Call';
var {height, width} = Dimensions.get('window');
import theme from '../../styles';

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
        onBackdropPress={this.props.onSwipeComplete}
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <View style={styles.modal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mainInfoContainer}>
              <Image
                source={{uri: this.props.imageSource}}
                style={styles.ava}
              />
              <Text style={styles.email}>{this.props.email}</Text>
              <Call
                extraPadding={{paddingTop: 5, fontSize: 16}}
                url={'tel:' + this.props.phone}
                phone={this.props.phone}
              />
            </View>
            <TextInput
              multiline={true}
              placeholder={'Ghi chú'}
              style={styles.note}
              onChangeText={note => this.setState({note})}
              value={this.state.note}
            />
            <View style={{marginTop: 25}}>
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
                    : 'DD-MM-YYYY'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 25}}>
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
                    : 'DD-MM-YYYY'}
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
                  <Text style={styles.confirm}>Thất bại</Text>
                  <Image
                    source={require('../../../assets/img/icons8-missed_call_filled.png')}
                    style={styles.icon}
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
                  <Text style={styles.confirm}>Thành công</Text>
                  <Image
                    source={require('../../../assets/img/icons8-phone_filled.png')}
                    style={styles.icon}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.onSwipeComplete();
              }}>
              <View style={styles.cancelContainer}>
                <Text style={styles.cancelTitle}>Hủy</Text>
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
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = {
  modal: {
    height: height - 140,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 16,
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
    marginTop: 25,
    height: 100,
    paddingLeft: 10,
    borderRadius: 8,
  },
  rateIcon: {
    width: 10,
    height: 10,
    marginRight: 2,
  },
  rateRow: {
    flexDirection: 'row',
    marginTop: 3,
  },
  cancelContainer: {
    marginTop: 25,
    alignItems: 'center',
    paddingBottom: 30,
  },
  cancelTitle: {
    fontSize: 16,
    color: theme.mainColor,
  },
  mainInfoContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  ava: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  email: {
    marginTop: 25,
    fontSize: 16,
  },
  icon: {
    width: 25,
    height: 25,
  },
  confirm: {
    color: 'white',
    fontSize: 16,
  },
};

export default CallRegisterModal;
