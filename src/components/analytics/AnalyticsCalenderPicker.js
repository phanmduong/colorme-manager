import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modal';
import {getBottomSpace} from "react-native-iphone-x-helper";

class AnalyticsCalenderPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onDateChange,
      toggleModal,
      isVisible,
      startDate,
      endDate,
      loadAnalytics,
    } = this.props;
    return (
      <Modal isVisible={isVisible} style={styles.modal}>
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
                    loadAnalytics();
                  }
                : () => null
            }>
            <View
              style={
                startDate && endDate
                  ? styles.enabledButton
                  : styles.disabledButton
              }>
              <Text style={{color: 'white'}}>Áp dụng</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = {
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  calendarContainer: {
    backgroundColor: 'white',
    paddingBottom: getBottomSpace(),
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
    marginTop: 10,
  },
  disabledButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#b0b0b0',
    borderRadius: 8,
    marginTop: 10,
  },
};

export default AnalyticsCalenderPicker;
