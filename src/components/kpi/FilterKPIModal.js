import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';
import FilterRow from '../common/FilterRow';
import {
  FILTER_KPI_CALCULATE_BY,
  FILTER_KPI_TYPE,
} from '../../constants/constant';
import FilterRowDate from '../common/FilterRowDate';

const FilterKPIModal = ({
  isVisible,
  closeModal,
  apply,
  type,
  calculateBy,
  onSelectKPIType,
  onSelectKPICalculateBy,
  startTime,
  endTime,
  onSelectKPIStartTime,
  onSelectKPIEndTime,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}>
      <View style={styles.wrapper}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Lọc</Text>
        </View>
        <FilterRow
          title={'Loại KPI'}
          header={'Chọn loại KPI'}
          options={FILTER_KPI_TYPE}
          selectedId={type}
          defaultId={''}
          defaultPlaceholder={'Tất cả loại KPI'}
          onChangeValue={onSelectKPIType}
        />
        <FilterRow
          title={'Cách tính'}
          header={'Chọn cách tính'}
          selectedId={calculateBy}
          defaultId={''}
          defaultPlaceholder={'Tất cả cách tính'}
          options={FILTER_KPI_CALCULATE_BY}
          onChangeValue={onSelectKPICalculateBy}
        />
        <FilterRowDate
          selectedDate={startTime}
          title={'Từ ngày'}
          onSelectDate={onSelectKPIStartTime}
        />
        <FilterRowDate
          selectedDate={endTime}
          title={'Đến ngày'}
          onSelectDate={onSelectKPIEndTime}
        />
        <TouchableOpacity
          onPress={() => {
            apply();
            closeModal();
          }}>
          <View style={styles.submit}>
            <Text style={styles.submitTitle}>Áp dụng</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeModal}>
          <View style={styles.cancelContainer}>
            <Text style={styles.cancelTitle}>Hủy</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = {
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  wrapper: {
    backgroundColor: 'white',
    height: 450,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: theme.mainHorizontal,
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  cancelContainer: {
    marginTop: 25,
    alignItems: 'center',
    paddingBottom: 30,
  },
  cancelTitle: {
    fontSize: 16,
    color: theme.mainColor,
  },
  submit: {
    height: 45,
    borderRadius: 24,
    backgroundColor: '#2ACC4C',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitTitle: {
    color: 'white',
    fontSize: 16,
  },
};

export default FilterKPIModal;
