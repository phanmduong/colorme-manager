import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

const FilterRowDate = ({
  title,
  selectedDate,
  onSelectDate,
  isFormatted = false,
}) => {
  const [visible, setVisible] = useState(false);

  const togglePicker = () => {
    setVisible(!visible);
  };

  const handleDatePicked = (date) => {
    if (!isFormatted) {
      onSelectDate(moment(date));
    } else {
      onSelectDate(moment(date).format('YYYY-MM-DD'));
    }
    togglePicker();
  };

  return (
    <View style={styles.filterTitle}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.filterContainer} onPress={togglePicker}>
        <Text
          style={{
            fontSize: 16,
          }}>
          {selectedDate
            ? !isFormatted
              ? selectedDate.format('YYYY-MM-DD')
              : selectedDate
            : 'YYYY-MM-DD'}
        </Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={visible}
        onConfirm={handleDatePicked}
        onCancel={togglePicker}
      />
    </View>
  );
};

const styles = {
  filterTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  field: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  fieldText: {
    color: 'black',
    fontSize: 16,
  },
  filterContainer: {
    width: 150,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
  },
  modalStyle: {
    borderRadius: 6,
  },
  headerFooterContainer: {
    padding: 10,
    alignItems: 'center',
  },
  headerFooterText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
  },
  options: {
    marginVertical: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginHorizontal: 20,
  },
};

export default FilterRowDate;
