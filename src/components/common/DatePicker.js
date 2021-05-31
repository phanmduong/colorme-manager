import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {isEmptyInput} from '../../helper';

function DatePicker({selectedDate, onDateChange, title, mode = 'date'}) {
  const [isVisible, setVisible] = useState(false);

  function openDatePicker() {
    setVisible(true);
  }

  function handleDatePicked(date) {
    switch (mode) {
      case 'date':
        onDateChange(moment(date).format('YYYY-MM-DD'));
        break;
      case 'time':
        onDateChange(moment(date));
        break;
      case 'unix':
        onDateChange(moment(date).unix());
        break;
      case 'unix-time':
        onDateChange(moment(date).unix());
        break;
      default:
        break;
    }
    setVisible(false);
  }

  function displayPlaceholder() {
    if (isEmptyInput(selectedDate)) {
      if (mode === 'date' || mode === 'unix') {
        return 'YYYY-MM-DD';
      } else if (mode === 'time' || mode === 'unix-time') {
        return '00:00';
      }
    } else {
      switch (mode) {
        case 'date':
          return moment(selectedDate).format('YYYY-MM-DD');
        case 'time':
          return moment(selectedDate).format('HH:mm');
        case 'unix':
          return moment.unix(selectedDate).format('YYYY-MM-DD');
        case 'unix-time':
          return moment.unix(selectedDate).format('HH:mm');
        default:
          return null;
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleForm}>{title}</Text>
      <TouchableOpacity style={styles.inputContainer} onPress={openDatePicker}>
        <View style={styles.row}>
          <Text>{displayPlaceholder()}</Text>
          <Text>▼</Text>
        </View>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isVisible}
        onConfirm={handleDatePicked}
        onCancel={() => setVisible(false)}
        mode={mode !== 'unix' ? mode : 'date'}
      />
    </View>
  );
}

const styles = {
  container: {
    marginTop: 30,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export default DatePicker;
