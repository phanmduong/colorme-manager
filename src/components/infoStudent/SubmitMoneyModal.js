import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';
import {dotNumber, isEmptyInput} from '../../helper';
import Input from '../common/Input';
import InputPicker from '../common/InputPicker';
import {PAYMENT_METHOD} from '../../constants/constant';
import DatePicker from '../common/DatePicker';
import InputCheckBox from '../common/InputCheckBox';
import moment from 'moment';
import * as infoStudentApi from '../../apis/infoStudentApi';

function SubmitMoneyModal(props) {
  const [actualInput, setActualInput] = useState(null);
  const [code, setCode] = useState(null);
  const [money, setMoney] = useState(null);
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [receivedBook, setReceivedBook] = useState(null);

  const noteRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => {
    setReceivedBook(props.receivedBook);
  }, [props.receivedBook]);

  function clear() {
    setActualInput(null);
    setCode(null);
    setMoney(null);
    setNote('');
    setPaymentMethod(null);
    setReceivedBook(null);
  }

  function submitMoney() {
    if (money && code && paymentMethod) {
      props.submitMoney(
        props.registerId,
        actualInput,
        code,
        money,
        note,
        paymentMethod,
        receivedBook,
      );
      props.onSwipeComplete();
    } else {
      Alert.alert('Thông báo', 'Bạn cần nhập đủ thông tin bắt buộc');
    }
  }

  function switchReceiveBook(value) {
    if (value) {
      setReceivedBook(moment().unix());
    } else {
      setReceivedBook(null);
    }
  }

  function loadNextCode() {
    if (isEmptyInput(props.code)) {
      infoStudentApi
        .loadNextCode(props.token, props.domain)
        .then((res) => {
          setCode(res.data.code);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCode(props.code);
    }
  }

  return (
    <Modal
      isVisible={props.isVisible}
      avoidKeyboard={true}
      onBackdropPress={props.onSwipeComplete}
      onBackButtonPress={props.onSwipeComplete}
      onModalWillHide={clear}
      onModalWillShow={() => {
        loadNextCode();
      }}
      style={{margin: 0, justifyContent: 'flex-end'}}>
      <View style={styles.modal}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            {props.classItem &&
              props.classItem.course &&
              props.classItem.course.icon_url && (
                <Image
                  source={{uri: props.classItem.course.icon_url}}
                  style={styles.avatar}
                />
              )}
            {props.avatar_url && (
              <Image
                source={{uri: props.avatar_url}}
                style={[styles.avatar, {left: -5}]}
              />
            )}
            <Text style={styles.title}>Nộp học phí</Text>
          </View>
          <View style={{marginTop: 25}}>
            {props.name && (
              <Text style={styles.subTitle}>Học viên: {props.name}</Text>
            )}
            <Text style={styles.subTitle}>
              Lớp:{' '}
              {props.classItem &&
                props.classItem.name &&
                props.classItem.study_time &&
                `${props.classItem.name} - ${props.classItem.study_time}`}
            </Text>
            <Text style={styles.subTitle}>
              Khai giảng:{' '}
              {props.classItem &&
                props.classItem.description &&
                props.classItem.description}
            </Text>
            <Text style={styles.subTitle}>
              Phòng học:{' '}
              {props.classItem &&
                props.classItem.base &&
                props.classItem.base.name &&
                props.classItem.base.address &&
                `${props.classItem.base.name} - ${props.classItem.base.address}`}
            </Text>
          </View>
          <Input
            title={'Học phí'}
            required
            keyboardType={'number-pad'}
            onChangeText={setMoney}
            placeholder={'0'}
            value={dotNumber(money)}
          />
          <Input
            title={'Ghi chú'}
            value={note}
            placeholder={'Ghi chú'}
            onChangeText={setNote}
            refName={noteRef}
            onSubmitEditing={() => codeRef.current.focus()}
          />
          <Input
            title={'Mã đăng kí'}
            placeholder={'Mã đăng kí'}
            onChangeText={setCode}
            value={code}
            required
            refName={codeRef}
            onSubmitEditing={() => codeRef.current.blur()}
          />
          <DatePicker
            title={'Ngày thực nhận'}
            mode={'unix'}
            selectedDate={actualInput}
            onDateChange={setActualInput}
          />
          <InputPicker
            placeholder={'Phương thức thanh toán'}
            title={'Phương thức thanh toán'}
            header={'Chọn phương thức thanh toán'}
            selectedId={paymentMethod}
            onChangeValue={setPaymentMethod}
            options={PAYMENT_METHOD}
            required
          />
          <InputCheckBox
            containerStyle={{marginTop: 10}}
            name={'Đã nhận giáo trình'}
            onValueChange={switchReceiveBook}
            value={!isEmptyInput(receivedBook)}
          />
          <TouchableOpacity onPress={submitMoney}>
            <View style={{marginTop: 25}}>
              <View style={styles.submitButton}>
                <Text style={{color: 'white'}}>Hoàn tất</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onSwipeComplete}>
            <View style={styles.cancelContainer}>
              <Text style={{color: theme.mainColor}}>Hủy</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = {
  modal: {
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: theme.mainHorizontal,
    height: 680,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
  },
};

export default SubmitMoneyModal;
