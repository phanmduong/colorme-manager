import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Alert} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';
import DatePicker from '../common/DatePicker';
import SubmitButton from '../common/SubmitButton';
import moment from 'moment';
import InputPicker from '../common/InputPicker';
import {DAYS} from '../../constants/constant';

function AddClassScheduleModal({isVisible, closeModal, apply}) {
  const [startTime, setStartTime] = useState(moment('00:00', 'HH:mm'));
  const [endTime, setEndTime] = useState(moment('00:00', 'HH:mm'));
  const [weekday, setWeekday] = useState(null);

  function onSubmit() {
    if (startTime && endTime && weekday) {
      const schedule = {
        start_time: startTime.unix(),
        end_time: endTime.unix(),
        weekday,
      };
      apply(schedule);
      closeModal();
    } else {
      Alert.alert('Thông báo', 'Bạn cần nhập đủ thông tin');
    }
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
        <InputPicker
          title={'Ngày trong tuần'}
          selectedId={weekday}
          onChangeValue={setWeekday}
          options={DAYS}
          header={'Chọn ngày trong tuần'}
          required
        />
        <DatePicker
          title={'Bắt đầu từ'}
          selectedDate={startTime}
          onDateChange={setStartTime}
          mode={'time'}
        />
        <DatePicker
          title={'Kết thúc lúc'}
          onDateChange={setEndTime}
          selectedDate={endTime}
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
