import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {isEmptyInput} from '../../helper';

function DatePicker({selectedDate, onDateChange, title}) {
  const [isVisible, setVisible] = useState(false);

  function openDatePicker() {
    setVisible(true);
  }

  function handleDatePicked(date) {
    onDateChange(moment(date).format('YYYY-MM-DD'));
    setVisible(false);
  }

  return (
    <View style={{marginTop: 30}}>
      <Text style={styles.titleForm}>{title}</Text>
      <TouchableOpacity style={styles.inputContainer} onPress={openDatePicker}>
        <View style={styles.row}>
          <Text>
            {isEmptyInput(selectedDate)
              ? 'YYYY-MM-DD'
              : moment(selectedDate).format('YYYY-MM-DD')}
          </Text>
          <Text>▼</Text>
        </View>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isVisible}
        onConfirm={handleDatePicked}
        onCancel={() => setVisible(false)}
      />
    </View>
  );
}

const styles = {
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export default DatePicker;
