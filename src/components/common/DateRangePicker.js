import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modal';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import moment from 'moment';

function DateRangePicker({
  startDate,
  endDate,
  onSelectEndDate,
  onSelectStartDate,
  title,
  mode = 'form',
  containerStyle,
  dateType = 'unix',
  apply = () => null,
}) {
  const [isVisible, setVisible] = useState(false);

  /**
   * On date change with UNIX type
   *
   * @param date - moment
   * @param type - end or start date
   */
  function onDateChange(date, type) {
    if (dateType === 'unix') {
      if (type === 'END_DATE') {
        onSelectEndDate(date.unix());
      } else {
        onSelectStartDate(date.unix());
        onSelectEndDate(null);
      }
    } else if (dateType === 'normal') {
      if (type === 'END_DATE') {
        onSelectEndDate(date.format('YYYY-MM-DD'));
      } else {
        onSelectStartDate(date.format('YYYY-MM-DD'));
        onSelectEndDate(null);
      }
    }
  }

  function toggleModal() {
    setVisible(!isVisible);
  }

  return (
    <View>
      {mode === 'form' && (
        <View style={[styles.container, containerStyle]}>
          <Text style={styles.titleForm}>{title}</Text>
          <TouchableOpacity style={styles.dateContainer} onPress={toggleModal}>
            <EntypoIcon name={'calendar'} size={17} color={'black'} />
            <Text style={{marginLeft: 10}}>
              {startDate ? moment.unix(startDate).format('DD/MM/YYYY') : null} -{' '}
              {endDate ? moment.unix(endDate).format('DD/MM/YYYY') : null}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {mode === 'filter' && (
        <TouchableOpacity
          style={[styles.filterDateContainer, containerStyle]}
          onPress={toggleModal}>
          <EntypoIcon name={'calendar'} size={17} color={'black'} />
          <Text style={{marginLeft: 10}}>
            {startDate ? startDate.format('DD/MM/YYYY') : null} -{' '}
            {endDate ? endDate.format('DD/MM/YYYY') : null}
          </Text>
        </TouchableOpacity>
      )}
      <DateRangeModal
        isVisible={isVisible}
        toggleModal={toggleModal}
        onDateChange={onDateChange}
        startDate={startDate}
        endDate={endDate}
        apply={apply}
      />
    </View>
  );
}

function DateRangeModal({
  isVisible,
  toggleModal,
  onDateChange,
  startDate,
  endDate,
  apply,
}) {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      onBackdropPress={toggleModal}>
      <View style={styles.calendarContainer}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={onDateChange}
        />
        <TouchableOpacity
          onPress={
            startDate && endDate
              ? () => {
                  toggleModal();
                  apply();
                }
              : () => null
          }
          style={styles.buttonContainer}>
          <View
            style={
              startDate && endDate
                ? styles.enabledButton
                : styles.disabledButton
            }>
            <Text style={styles.submitText}>Áp dụng</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = {
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    marginTop: 30,
  },
  titleForm: {
    color: 'black',
    fontSize: 14,
  },
  calendarContainer: {
    backgroundColor: 'white',
    height: 420,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    paddingTop: 20,
  },
  enabledButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2ACC4C',
    borderRadius: 8,
  },
  disabledButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#b0b0b0',
    borderRadius: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: getBottomSpace(),
  },
  dateContainer: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 8,
    height: 45,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  submitText: {
    color: 'white',
  },
  filterDateContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#f6f6f6',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
};

export default DateRangePicker;
