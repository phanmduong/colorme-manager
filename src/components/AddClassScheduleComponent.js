import React, {useState, useRef} from 'react';
import {ScrollView, View, Text} from 'react-native';
import Input from './common/Input';
import theme from '../styles';
import AddClassScheduleModal from './class/AddClassScheduleModal';
import AddItemButton from './common/AddItemButton';
import moment from 'moment';
import SubmitButton from './common/SubmitButton';

function AddClassScheduleComponent(props) {
  const [name, setName] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [schedules, setSchedules] = useState([]);

  const nameRef = useRef(null);

  function toggleModal() {
    setVisible(!isVisible);
  }

  function applySchedules(schedules) {
    setSchedules(schedules);
    let nameGenerated = '';
    schedules.forEach((schedule, index) => {
      nameGenerated += `${schedule.weekday} (${moment(
        schedule.start_time,
      ).format('HH:mm')}-${moment(schedule.end_time).format('HH:mm')})`;
      if (index !== schedules.length - 1) {
        nameGenerated += ' - ';
      }
    });
    setName(nameGenerated);
  }

  function onSubmit() {
    props.createSchedule(name, schedules);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Input
          title={'Tên lịch học'}
          placeholder={'Tên lịch học'}
          value={name}
          returnKeyType={'done'}
          onChangeText={setName}
          refName={nameRef}
          onSubmitEditing={() => nameRef.current.blur()}
        />
        <View style={styles.scheduleContainer}>
          <Text>Các ca học ({schedules.length})</Text>
          {schedules.map((schedule) => (
            <View style={styles.scheduleItem}>
              <Text>
                {schedule.weekday} (
                {moment(schedule.start_time).format('HH:mm')}-
                {moment(schedule.end_time).format('HH:mm')})
              </Text>
            </View>
          ))}
          <AddItemButton
            title={'Thêm ca học'}
            onPress={toggleModal}
            containerStyle={styles.addButton}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <SubmitButton
          title={'Lưu'}
          onPress={onSubmit}
          loading={props.creatingClassSchedule}
        />
      </View>
      <AddClassScheduleModal
        isVisible={isVisible}
        closeModal={toggleModal}
        apply={applySchedules}
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    marginHorizontal: theme.mainHorizontal,
  },
  scheduleContainer: {
    marginTop: 10,
  },
  addButton: {
    marginTop: 10,
  },
  scheduleItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F6F6F6',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  buttonContainer: {
    left: 0,
    right: 0,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
  },
};

export default AddClassScheduleComponent;
