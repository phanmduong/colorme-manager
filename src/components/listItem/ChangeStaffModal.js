import React, {useState, useRef} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import SubmitButton from '../common/SubmitButton';
import InputPicker from '../common/InputPicker';
import Input from '../common/Input';
import InputCheckBox from '../common/InputCheckBox';

function ChangeStaffModal(props) {
  const [oldUser, setOldUser] = useState(null);
  const [note, setNote] = useState(null);
  const [newUser, setNewUser] = useState(null);
  const [isReplace, setReplace] = useState(false);

  const noteRef = useRef(null);

  const {
    isVisible,
    closeModal,
    searchStaff,
    staff,
    isTeach = true,
    isAssist = false,
    class_lesson_id,
    changeStaff,
    teachers,
    teaching_assistants,
  } = props;

  function submit() {
    if (class_lesson_id) {
      if (isTeach) {
        const changedData = {
          class_lesson_id,
          is_replace: isReplace,
          note: note,
          old_user_id: oldUser,
          new_user_id: newUser,
          type: 'teacher',
        };
        changeStaff(changedData, 'teacher', () => closeModal());
      } else {
        const changedData = {
          class_lesson_id,
          is_replace: isReplace,
          note: note,
          old_user_id: oldUser,
          new_user_id: newUser,
          type: 'teaching_assistant',
        };
        changeStaff(changedData, 'assist', () => closeModal());
      }
    } else {
      Alert.alert('Thông báo', 'Có lỗi xảy ra');
    }
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
            <Text style={styles.title}>
              {isTeach ? 'Đổi giảng viên' : 'Đổi trợ giảng'}
            </Text>
          </View>
          {isTeach && (
            <>
              <InputPicker
                title={'Giảng viên cần đổi'}
                options={teachers}
                header={'Chọn giảng viên cần đổi'}
                selectedId={oldUser}
                onChangeValue={setOldUser}
              />
              <InputPicker
                title={'Giảng viên mới'}
                options={staff}
                onChangeValue={setNewUser}
                header={'Chọn giảng viên mới'}
                selectedId={newUser}
                isApiSearch
                onApiSearch={searchStaff}
              />
            </>
          )}
          {isAssist && (
            <>
              <InputPicker
                title={'Trợ giảng cần đổi'}
                options={teaching_assistants}
                header={'Chọn trợ giảng cần đổi'}
                selectedId={oldUser}
                onChangeValue={setOldUser}
              />
              <InputPicker
                title={'Trợ giảng mới'}
                options={staff}
                onChangeValue={setNewUser}
                header={'Chọn trợ giảng mới'}
                selectedId={newUser}
                isApiSearch
                onApiSearch={searchStaff}
              />
            </>
          )}
          <Input
            title={'Ghi chú'}
            onChangeText={setNote}
            value={note}
            placeholder={'Ghi chú'}
            refName={noteRef}
            onSubmitEditing={() => noteRef.current.blur()}
          />
          <View style={styles.checkBox}>
            <InputCheckBox
              value={isReplace}
              onValueChange={setReplace}
              name={'Đây là một buổi dạy thay'}
            />
          </View>
          <SubmitButton
            title={'Xác nhận'}
            loading={props.changingClassAssist || props.changingClassTeach}
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
  titleForm: {
    color: 'black',
    fontSize: 14,
  },
  submit: {
    marginTop: 30,
  },
  checkBox: {
    marginTop: 30,
  },
};

export default ChangeStaffModal;
