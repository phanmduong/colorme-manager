import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';
import FilterRow from '../common/FilterRow';

const TeachingScheduleFilter = ({
  isVisible,
  closeModal,
  apply,
  onSelectProvinceId,
  onSelectBaseId,
  onSelectCourseId,
  ...props
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
          options={props.courses}
          title={'Môn học'}
          defaultId={''}
          header={'Chọn môn học'}
          selectedId={props.courseId}
          onChangeValue={onSelectCourseId}
        />
        <FilterRow
          options={props.provinces}
          title={'Thành phố'}
          header={'Chọn thành phố'}
          selectedId={props.provinceId}
          defaultId={''}
          onChangeValue={onSelectProvinceId}
        />
        <FilterRow
          options={props.baseData}
          defaultId={''}
          title={'Cơ sở'}
          header={'Chọn cơ sở'}
          selectedId={props.baseId}
          onChangeValue={onSelectBaseId}
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
    height: 380,
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

export default TeachingScheduleFilter;
