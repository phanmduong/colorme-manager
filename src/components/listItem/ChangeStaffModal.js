import React, {useState} from 'react';
import {Alert, ScrollView, Text, TextInput, View} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import SubmitButton from '../common/SubmitButton';
import InputPicker from '../common/InputPicker';
import CheckBox from '@react-native-community/checkbox';

function ChangeStaffModal({
  isVisible,
  closeModal,
  currentStudyTime,
  currentTeach,
  currentAssist,
  searchStaff,
  staff,
  isTeach = true,
  isAssist = false,
  class_lesson_id,
  changeStaff,
  errorChangeClassTeach,
  errorChangeClassAssist,
}) {
  const [note, setNote] = useState('');
  const [selectedStaffId, setStaffId] = useState(-1);
  const [isReplace, setReplace] = useState(false);

  function submit() {
    if (isTeach) {
      const changedData = {
        id: class_lesson_id,
        is_teacher_replace: isReplace,
        note: note,
        staff_id: selectedStaffId,
      };
      console.log(changedData);
      changeStaff(changedData, 'teacher');
    } else {
      const changedData = {
        id: class_lesson_id,
        is_teaching_assistant_replace: isReplace,
        note: note,
        staff_id: selectedStaffId,
      };
      changeStaff(changedData, 'assist');
    }
    closeModal();
    setTimeout(() => {
      if (errorChangeClassTeach || errorChangeClassAssist) {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
      } else {
        Alert.alert('Thông báo', 'Đổi lịch dạy thành công');
      }
    }, 500);
  }

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalContainer}
      avoidKeyboard={true}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}>
      <View style={styles.modal}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Đổi giảng viên</Text>
          </View>
          <View style={{marginTop: 30}}>
            <Text style={styles.titleForm}>Buổi đang được chọn</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={currentStudyTime}
                editable={false}
                style={{fontSize: 15}}
              />
            </View>
          </View>
          {isTeach && (
            <>
              <View style={{marginTop: 30}}>
                <Text style={styles.titleForm}>Giảng viên hiện tại</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={currentTeach && currentTeach.name}
                    editable={false}
                    style={{fontSize: 15}}
                  />
                </View>
              </View>
              <InputPicker
                title={'Giảng viên mới'}
                header={'Chọn giảng viên mới'}
                options={staff}
                onChangeValue={setStaffId}
                onApiSearch={searchStaff}
                isApiSearch={true}
                placeholder={'Giảng viên mới'}
              />
            </>
          )}
          {isAssist && (
            <>
              <View style={{marginTop: 30}}>
                <Text style={styles.titleForm}>Trợ giảng hiện tại</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={currentAssist && currentAssist.name}
                    editable={false}
                    style={{fontSize: 15}}
                  />
                </View>
              </View>
              <InputPicker
                title={'Trợ giảng mới'}
                header={'Chọn trợ giảng mới'}
                options={staff}
                onChangeValue={setStaffId}
                onApiSearch={searchStaff}
                isApiSearch={true}
                placeholder={'Trợ giảng mới'}
              />
            </>
          )}
          <View style={{marginTop: 30}}>
            <Text style={styles.titleForm}>Ghi chú</Text>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={(text) => setNote(text)}
                style={{fontSize: 15}}
                placeholder={'Ghi chú'}
              />
            </View>
          </View>
          <View style={styles.row}>
            <CheckBox
              disabled={false}
              value={isReplace}
              boxType={'square'}
              style={styles.checkBox}
              tintColor={'#C8E6C9'}
              onCheckColor={'#4CAF50'}
              onFillColor={'#C8E6C9'}
              onTintColor={'#C8E6C9'}
              tintColors={{true: '#4CAF50', false: '#C8E6C9'}}
              onValueChange={setReplace}
              onAnimationType={'bounce'}
              offAnimationType={'bounce'}
            />
            <Text>Đây là một buổi dạy thay</Text>
          </View>
          <SubmitButton
            title={'Xác nhận'}
            containerStyle={styles.submit}
            onPress={submit}
          />
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
    height: 500,
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
  submit: {
    marginTop: 30,
  },
  checkBox: {
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 1,
  },
};

export default ChangeStaffModal;
