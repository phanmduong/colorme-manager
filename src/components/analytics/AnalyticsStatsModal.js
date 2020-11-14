import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {dotNumber} from '../../helper';

function AnalyticsStatsModal({
  isVisible,
  closeModal,
  dates,
  isSingle = false,
  isDouble = false,
  isMultiple = false,
  units,
}) {
  function renderStats() {
    if (isSingle) {
      return Object.keys(dates).map(function (key, index) {
        return (
          <View style={styles.dateItem}>
            <Text style={styles.date}>{key}</Text>
            <Text style={styles.bold}>
              {dotNumber(dates[key][0][1])} {units}
            </Text>
          </View>
        );
      });
    } else if (isDouble) {
      return Object.keys(dates).map(function (key, index) {
        return (
          <View style={styles.dateItem}>
            <Text style={styles.date}>{key}</Text>
            <Text style={styles.bold}>
              {dotNumber(dates[key][0][1])} {units[0]}
            </Text>
            <Text style={styles.bold}>
              {dotNumber(dates[key][0][2])} {units[1]}
            </Text>
          </View>
        );
      });
    } else if (isMultiple) {
      return dates.map((date) => (
        <View style={styles.dateItem}>
          <Text style={styles.date}>{date.date}</Text>
          {date.data.map((dataItem) => (
            <View style={styles.row}>
              <View
                style={[
                  styles.legendDot,
                  {
                    backgroundColor: dataItem.color,
                  },
                ]}
              />
              <Text style={styles.bold}>
                {dataItem.name}: {dataItem.registers}
              </Text>
            </View>
          ))}
        </View>
      ));
    }
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      style={styles.modalContainer}>
      <View style={styles.modal}>
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Số liệu chi tiết</Text>
          </View>
          {renderStats()}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = {
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: 'white',
    height: 550,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: theme.mainHorizontal,
    paddingBottom: getBottomSpace(),
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 5,
  },
  dateItem: {
    marginTop: 15,
  },
  date: {
    fontSize: 16,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export default AnalyticsStatsModal;
