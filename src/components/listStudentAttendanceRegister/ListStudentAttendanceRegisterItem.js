import React, {useState, useEffect} from 'react';
import {View, Dimensions, Text} from 'react-native';
import theme from '../../styles';
import CheckBox from '@react-native-community/checkbox';
const {width, height} = Dimensions.get('window');

function ListStudentAttendanceRegisterItem({
  id,
  name,
  attendance_lesson_status,
  attendance_homework_status,
  setHwStatus,
  setStatus,
}) {
  const [isStatusSelected, setStatusSelection] = useState(attendance_lesson_status !== 0);
  const [isHwStatusSelected, setHwStatusSelection] = useState(attendance_homework_status !== 0);

  function setToggleStatusCheckBox(newValue) {
    setStatus(newValue, id);
    setStatusSelection(newValue);
  }

  function setToggleHwCheckBox(newValue) {
    setHwStatus(newValue, id);
    setHwStatusSelection(newValue);
  }

  return (
    <View style={styles.listContainer}>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          disabled={false}
          value={isStatusSelected}
          boxType={'square'}
          style={styles.checkBox}
          tintColor={'#C8E6C9'}
          onCheckColor={'#4CAF50'}
          onFillColor={'#C8E6C9'}
          onTintColor={'#C8E6C9'}
          tintColors={{true: '#4CAF50', false: '#C8E6C9'}}
          onValueChange={(newValue) => setToggleStatusCheckBox(newValue)}
          onAnimationType={'bounce'}
          offAnimationType={'bounce'}
        />
      </View>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          disabled={false}
          value={isHwStatusSelected}
          boxType={'square'}
          style={styles.checkBox}
          tintColor={'#C8E6C9'}
          onCheckColor={'#4CAF50'}
          onFillColor={'#C8E6C9'}
          onTintColor={'#C8E6C9'}
          tintColors={{true: '#4CAF50', false: '#C8E6C9'}}
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
