import React, {useState} from 'react';
import {Alert, ScrollView, Text, TextInput, View} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import DatePicker from '../common/DatePicker';
import SubmitButton from '../common/SubmitButton';

function ChangeDateModal({
  isVisible,
  closeModal,
  currentStudyTime,
  class_lesson_id,
  changeDate,
  errorChangeClassLesson,
}) {
  const [selectedDate, setDate] = useState('');
  const [note, setNote] = useState('');

  function submit() {
    const classItem = {
      time: selectedDate,
      note: note,
      id: class_lesson_id,
    };
    changeDate(classItem);
    closeModal();
    setTimeout(() => {
      if (errorChangeClassLesson) {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
      } else {
        Alert.alert('Thông báo', 'Đổi lịch dạy thành công');
      }
    }, 500);
  }

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalContainer}
      avoidKeyboard={true}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}>
      <View style={styles.modal}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Đổi lịch dạy</Text>
          </View>
          <View style={{marginTop: 30}}>
            <Text style={styles.titleForm}>Buổi đang được chọn</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={currentStudyTime}
                editable={false}
                style={{fontSize: 15}}
              />
            </View>
          </View>
          <DatePicker
            title={'Sang buổi mới'}
            selectedDate={selectedDate}
            onDateChange={setDate}
          />
          <View style={{marginTop: 30}}>
            <Text style={styles.titleForm}>Ghi chú</Text>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={(text) => setNote(text)}
                style={{fontSize: 15}}
                placeholder={'Ghi chú'}
              />
            </View>
          </View>
          <SubmitButton
            title={'Xác nhận'}
            containerStyle={styles.submit}
            onPress={submit}
          />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = {
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: 'white',
    height: 500,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: theme.mainHorizontal,
    paddingBottom: getBottomSpace(),
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 30,
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
  submit: {
    marginTop: 30,
  },
};

export default ChangeDateModal;
