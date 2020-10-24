import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import Search from '../common/Search';
import Loading from '../common/Loading';
import ListChangeClassItem from './ListChangeClassItem';
const {width, height} = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../styles';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import Entypo from 'react-native-vector-icons/Entypo';

const ChangeStudentClassModal = ({
  isVisible,
  closeModal,
  registerId,
  loadAvailableClasses,
  availableClasses,
  isLoadingAvailableClasses,
  resetAvailableClasses,
  changingClass,
  changeClassStatus,
  changeClass,
  avatar_url,
}) => {
  const [search, setSearch] = useState('');

  const renderClasses = () => {
    return availableClasses.map((classItem) => (
      <ListChangeClassItem
        name={classItem.name}
        teacher_assistant={classItem.teacher_assistant}
        teacher={classItem.teacher}
        study_time={classItem.study_time}
        regis_target={classItem.regis_target}
        target={classItem.target}
        total_paid={classItem.total_paid}
        total_register={classItem.total_register}
        address={
          classItem.room &&
          classItem.base &&
          classItem.room.name + ' - ' + classItem.base.address
        }
        registerId={registerId}
        classId={classItem.id}
        changeClass={changeClass}
        type={classItem.type}
        avatar_url={avatar_url}
      />
    ));
  };

  const renderChangeClassSuccess = () => {
    return (
      <View style={styles.successContainer}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={'ios-checkmark-circle'}
            size={150}
            color={'#2ACC4C'}
          />
          <Text style={styles.successTitle}>Đổi lớp thành công</Text>
          <Text style={styles.successSubTitle}>
            Bạn đã đổi lớp thành công cho học viên
          </Text>
        </View>
        <TouchableOpacity onPress={closeModal}>
          <View style={styles.submitButton}>
            <Text style={styles.submitTitle}>Quay lại</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderChangeClassError = () => {
    return (
      <View style={styles.successContainer}>
        <View style={styles.iconContainer}>
          <Entypo name={'circle-with-cross'} size={150} color={'#C50000'} />
          <Text style={styles.successTitle}>Có lỗi xảy ra</Text>
        </View>
        <TouchableOpacity onPress={closeModal}>
          <View style={[styles.submitButton, {backgroundColor: '#C50000'}]}>
            <Text style={styles.submitTitle}>Quay lại</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      onModalHide={resetAvailableClasses}
      style={styles.modal}>
      <View style={styles.container}>
        {!changeClassStatus ? (
          !changingClass ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Đổi lớp</Text>
              </View>
              <Search
                placeholder={'Tìm lớp'}
                onChangeText={(text) => setSearch(text)}
                onSubmitEditing={() =>
                  search !== '' && loadAvailableClasses(registerId, search)
                }
              />
              {isLoadingAvailableClasses ? (
                <Loading size={width / 8} />
              ) : (
                <View>{renderClasses()}</View>
              )}
            </ScrollView>
          ) : (
            <Loading size={width / 8} />
          )
        ) : changeClassStatus === 200 ? (
          renderChangeClassSuccess()
        ) : (
          renderChangeClassError()
        )}
      </View>
    </Modal>
  );
};

const styles = {
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    height: height - 140,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  submitButton: {
    width: width - theme.mainHorizontal * 2,
    height: 50,
    backgroundColor: '#33CA40',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  submitTitle: {
    color: 'white',
    marginLeft: 10,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: getBottomSpace(),
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: theme.title,
  successSubTitle: {
    paddingTop: 5,
  },
};

export default ChangeStudentClassModal;
