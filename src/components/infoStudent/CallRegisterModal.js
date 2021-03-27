import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import Call from '../common/Call';
const {width} = Dimensions.get('window');
import theme from '../../styles';
import DatePicker from '../common/DatePicker';
import Input from '../common/Input';
import InputPicker from '../common/InputPicker';
import {REGISTER_CALL_STATUS} from '../../constants/constant';
import * as infoStudentApi from '../../apis/infoStudentApi';
import Loading from '../common/Loading';

function CallRegisterModal(props) {
  const [appointmentPayment, setAppointmentPayment] = useState(null);
  const [callBackTime, setCallBackTime] = useState(null);
  const [note, setNote] = useState('');
  const [statusId, setStatus] = useState(null);
  const [teleId, setTele] = useState(null);
  const [loading, setLoading] = useState(false);

  const noteRef = useRef(null);

  function clear() {
    setAppointmentPayment(null);
    setCallBackTime(null);
    setNote('');
    setStatus(null);
  }

  function loadTele() {
    setLoading(true);
    infoStudentApi
      .getTeleCall(props.studentId, props.token, props.domain)
      .then((res) => {
        setTele(res.data.tele_call.id);
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function changeCallStatus(callStatus) {
    props.changeCallStatus(
      appointmentPayment,
      callBackTime,
      callStatus,
      note,
      statusId,
      props.studentId,
      teleId,
    );
    props.onSwipeComplete();
  }

  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={props.onSwipeComplete}
      onModalWillHide={clear}
      onModalWillShow={loadTele}
      onBackButtonPress={props.onSwipeComplete}
      avoidKeyboard={true}
      style={{margin: 0, justifyContent: 'flex-end'}}>
      <View style={styles.modal}>
        {!loading ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mainInfoContainer}>
              <Image source={{uri: props.avatar_url}} style={styles.ava} />
              <Text style={styles.email}>{props.email}</Text>
              <Call
                extraPadding={{paddingTop: 5, fontSize: 16}}
                url={'tel:' + props.phone}
                phone={props.phone}
              />
            </View>
            <DatePicker
              title={'Hẹn nộp tiền'}
              selectedDate={appointmentPayment}
              mode={'unix'}
              onDateChange={setAppointmentPayment}
            />
            <DatePicker
              title={'Hẹn gọi lại'}
              selectedDate={callBackTime}
              onDateChange={setCallBackTime}
              mode={'unix'}
            />
            <InputPicker
              title={'Tag'}
              placeholder={'Chọn tag'}
              options={REGISTER_CALL_STATUS}
              onChangeValue={setStatus}
              selectedId={statusId}
              header={'Chọn tag'}
            />
            <Input
              title={'Ghi chú'}
              onChangeText={setNote}
              value={note}
              placeholder={'Ghi chú'}
              refName={noteRef}
              onSubmitEditing={() => noteRef.current.blur()}
            />
            <View style={styles.callContainer}>
              <TouchableOpacity onPress={() => changeCallStatus('failed')}>
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
              <TouchableOpacity onPress={() => changeCallStatus('success')}>
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
                props.onSwipeComplete();
              }}>
              <View style={styles.cancelContainer}>
                <Text style={styles.cancelTitle}>Hủy</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <Loading />
        )}
      </View>
    </Modal>
  );
}

const styles = {
  modal: {
    height: 640,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: theme.mainHorizontal,
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
