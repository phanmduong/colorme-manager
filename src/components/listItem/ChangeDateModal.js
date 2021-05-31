import React, {useState, useRef} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import DatePicker from '../common/DatePicker';
import SubmitButton from '../common/SubmitButton';
import Input from '../common/Input';
import {displayUnixDate} from '../../helper';

function ChangeDateModal(props) {
  const [newDate, setNewDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [note, setNote] = useState(null);

  const noteRef = useRef(null);

  const {
    isVisible,
    closeModal,
    currentStudyTime,
    class_lesson_id,
    changeDate,
  } = props;

  function submit() {
    const classItem = {
      class_lesson_id: class_lesson_id,
      end_time: endTime,
      new_time: newDate,
      note: note,
      start_time: startTime,
    };
    changeDate(classItem, () => closeModal());
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
          <View style={styles.mainInfoContainer}>
            <Text>
              <Text style={styles.bold}>Ngày học hiện tại: </Text>
              {displayUnixDate(currentStudyTime)}
            </Text>
          </View>
          <DatePicker
            title={'Ngày mới'}
            selectedDate={newDate}
            onDateChange={setNewDate}
            mode={'unix'}
          />
          <DatePicker
            title={'Từ giờ'}
            selectedDate={startTime}
            onDateChange={setStartTime}
            mode={'unix-time'}
          />
          <DatePicker
            title={'Đến giờ'}
            selectedDate={endTime}
            onDateChange={setEndTime}
            mode={'unix-time'}
          />
          <Input
            title={'Ghi chú'}
            placeholder={'Ghi chú'}
            value={note}
            onChangeText={setNote}
            onSubmitEditing={() => noteRef.current.blur()}
            refName={noteRef}
          />
          <SubmitButton
            title={'Xác nhận'}
            loading={props.changingClassLesson}
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
  titleForm: {
    color: 'black',
    fontSize: 14,
  },
  submit: {
    marginTop: 30,
  },
  bold: {
    fontWeight: 'bold',
  },
  mainInfoContainer: {
    marginTop: 30,
  },
};

export default ChangeDateModal;
