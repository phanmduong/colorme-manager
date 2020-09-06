import React, {useState, useEffect} from 'react';
import {View, Dimensions, Text} from 'react-native';
import theme from '../../styles';
import CheckBox from '@react-native-community/checkbox';
const {width, height} = Dimensions.get('window');

function ListStudentAttendanceRegisterItem({
  name,
  attendance_lesson_status,
  attendance_homework_status,
}) {
  const [status, setStatus] = useState(attendance_lesson_status);
  const [hw_status, setHwStatus] = useState(attendance_homework_status);

  function setToggleStatusCheckBox(newValue) {
    setStatus(newValue);
  }

  function setToggleHwCheckBox(newValue) {
    setHwStatus(newValue);
  }

  return (
    <View style={styles.listContainer}>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          disabled={false}
          value={status}
          boxType={'square'}
          style={styles.checkBox}
          tintColor={'#C8E6C9'}
          onCheckColor={'#4CAF50'}
          onFillColor={'#C8E6C9'}
          onTintColor={'#C8E6C9'}
          tintColors={{true: '#C8E6C9', false: '#C8E6C9'}}
          onValueChange={(newValue) => setToggleStatusCheckBox(newValue)}
          onAnimationType={'bounce'}
          offAnimationType={'bounce'}
        />
      </View>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          disabled={false}
          value={hw_status}
          boxType={'square'}
          style={styles.checkBox}
          tintColor={'#C8E6C9'}
          onCheckColor={'#4CAF50'}
          onFillColor={'#C8E6C9'}
          onTintColor={'#C8E6C9'}
          tintColors={{true: '#C8E6C9', false: '#C8E6C9'}}
          onValueChange={(newValue) => setToggleHwCheckBox(newValue)}
          onAnimationType={'bounce'}
          offAnimationType={'bounce'}
        />
      </View>
      <View style={styles.nameContainer}>
        <Text>{name}</Text>
      </View>
    </View>
  );
}

const styles = {
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: theme.mainHorizontal,
    marginTop: 15,
  },
  checkBoxContainer: {
    width: width / 5,
    alignItems: 'center',
  },
  nameContainer: {
    width: (width / 3) * 5,
    flex: 1,
  },
  checkBox: {
    alignSelf: 'center',
    width: 20,
    height: 20,
  },
};

export default ListStudentAttendanceRegisterItem;
