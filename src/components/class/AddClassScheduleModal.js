import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';
import DatePicker from '../common/DatePicker';
import SubmitButton from '../common/SubmitButton';
import moment from "moment";

function AddClassScheduleModal({isVisible, closeModal, apply}) {
  const [schedules, setSchedules] = useState([
    {weekday: 'Thứ hai'},
    {weekday: 'Thứ ba'},
    {weekday: 'Thứ tư'},
    {weekday: 'Thứ năm'},
    {weekday: 'Thứ sáu'},
    {weekday: 'Thứ bảy'},
    {weekday: 'Chủ nhật'},
  ]);
  const [currentIdx, setIdx] = useState(0);

  function renderDates() {
    return schedules.map((schedule, index) => (
      <TouchableOpacity onPress={() => setIdx(index)}>
        <View
          style={currentIdx === index ? styles.selected : styles.unselected}>
          <Text
            style={
              currentIdx === index ? styles.selectedText : styles.unselectedText
            }>
            {index === 6 ? 'CN' : `T${index + 2}`}
          </Text>
        </View>
        <View
          style={
            isScheduleSelected(schedule)
              ? styles.selectedDot
              : styles.unselectedDot
          }
        />
      </TouchableOpacity>
    ));
  }

  function isScheduleSelected(schedule) {
    return schedule.start_time || schedule.end_time;
  }

  function setStartDate(time) {
    let copySchedules = [...schedules];
    copySchedules[currentIdx].start_time = time;
    setSchedules(copySchedules);
  }

  function setEndDate(time) {
    let copySchedules = [...schedules];
    copySchedules[currentIdx].end_time = time;
    setSchedules(copySchedules);
  }

  function onSubmit() {
    let selectedSchedules = [];
    schedules.forEach((schedule) => {
      if (isScheduleSelected(schedule)) {
        selectedSchedules.push(schedule);
      }
    });
    apply(selectedSchedules);
  }

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}>
      <View style={styles.wrapper}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Thêm ca học</Text>
        </View>
        <View style={styles.section}>
          <Text>Chọn ngày trong tuần</Text>
          <View style={styles.dateContainer}>{renderDates()}</View>
        </View>
        <DatePicker
          title={'Bắt đầu từ'}
          selectedDate={schedules[currentIdx].start_time}
          onDateChange={setStartDate}
          mode={'time'}
        />
        <DatePicker
          title={'Kết thúc lúc'}
          onDateChange={setEndDate}
          selectedDate={schedules[currentIdx].end_time}
          mode={'time'}
        />
        <SubmitButton
          title={'Hoàn tất'}
          onPress={() => {
            onSubmit();
            closeModal();
          }}
          containerStyle={styles.submitButton}
        />
        <TouchableOpacity onPress={closeModal}>
          <View style={styles.cancelContainer}>
            <Text style={styles.cancelTitle}>Hủy</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = {
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  wrapper: {
    backgroundColor: 'white',
    height: 490,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: theme.mainHorizontal,
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 30,
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
  section: {
    marginTop: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: -10,
  },
  selectedText: {color: 'white'},
  unselectedText: {color: 'black'},
  selected: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2ACC4C',
  },
  unselected: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F6F6F6',
  },
  selectedDot: {
    backgroundColor: '#2ACC4C',
    marginTop: 5,
    width: 5,
    height: 5,
    borderRadius: 5,
    alignSelf: 'center',
  },
  unselectedDot: {
    backgroundColor: 'white',
    marginTop: 5,
    width: 5,
    height: 5,
    borderRadius: 5,
    alignSelf: 'center',
  },
  submitButton: {
    marginTop: 20,
  },
};

export default AddClassScheduleModal;
