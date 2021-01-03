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
    if (mode === 'date') {
      onDateChange(moment(date).format('YYYY-MM-DD'));
    } else if (mode === 'time') {
      onDateChange(moment(date));
    }
    setVisible(false);
  }

  function displayPlaceholder() {
    if (isEmptyInput(selectedDate)) {
      if (mode === 'date') {
        return 'YYYY-MM-DD';
      } else if (mode === 'time') {
        return '00:00';
      }
    } else {
      if (mode === 'date') {
        return moment(selectedDate).format('YYYY-MM-DD');
      } else if (mode === 'time') {
        return moment(selectedDate).format('HH:mm');
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
        mode={mode}
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
