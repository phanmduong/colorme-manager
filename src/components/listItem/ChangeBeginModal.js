import React, {useState} from 'react';
import {ScrollView, Text, TextInput, View, Alert} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';
import DatePicker from '../common/DatePicker';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import SubmitButton from '../common/SubmitButton';
import moment from 'moment';
import {isEmptyInput} from '../../helper';

function ChangeBeginModal({
  isVisible,
  closeModal,
  currentStudyTime,
  currentDate,
  changeBegin,
  classIndex,
  errorChangeClassLessons,
  ...props
}) {
  const [selectedDate, setDate] = useState('');
  const [note, setNote] = useState('');
  const [lessons, setLessons] = useState(props.lessons.slice(classIndex));

  function submit() {
    const diffDays = calculateDayDiff(lessons[0]);

    const lessonsArray = lessons.map((lesson) => {
      const updatedDate = moment(lesson.class_lesson_time)
        .add(diffDays, 'days')
        .format('YYYY-MM-DD');
      return {
        class_lesson_id: lesson.class_lesson_id,
        time: updatedDate,
        note: note,
      };
    });
    changeBegin(lessonsArray);
    closeModal();
    setTimeout(() => {
      if (errorChangeClassLessons) {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
      } else {
        Alert.alert('Thông báo', 'Dời lịch thành công');
      }
    }, 500);
  }

  function calculateDayDiff(lesson) {
    return lesson && !isEmptyInput(selectedDate)
      ? moment(selectedDate).diff(moment(lessons[0].class_lesson_time), 'days')
      : 0;
  }

  function renderUpdatedDates() {
    const diffDays = calculateDayDiff(lessons[0]);
    return lessons.map((lesson) => {
      const updatedDate = moment(lesson.class_lesson_time).add(
        diffDays,
        'days',
      );
      return (
        <View style={styles.row}>
          <View style={{flex: 1}}>
            <Text style={styles.bold}>Buổi {lesson.order}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text>{lesson.class_lesson_time}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text>{updatedDate.format('YYYY-MM-DD')}</Text>
          </View>
        </View>
      );
    });
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
            <Text style={styles.title}>Dời lịch học</Text>
          </View>
          <View style={{marginTop: 30}}>
            <Text style={styles.titleForm}>Lịch học hiện tại</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={currentStudyTime}
                editable={false}
                style={{fontSize: 15}}
              />
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <Text style={styles.titleForm}>Ngày hiện tại</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={currentDate}
                editable={false}
                style={{fontSize: 15}}
              />
            </View>
          </View>
          <DatePicker
            title={'Ngày học mới'}
            onDateChange={setDate}
            selectedDate={selectedDate}
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
          <View style={styles.row}>
            <View style={{flex: 1}} />
            <View style={{flex: 1}}>
              <Text style={styles.bold}>Ngày cũ</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.bold}>Ngày mới</Text>
            </View>
          </View>
          {renderUpdatedDates()}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  bold: {fontWeight: 'bold'},
};

export default ChangeBeginModal;
