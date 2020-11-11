import React, {useRef, useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import theme from '../../styles';
import {getShortName} from '../../helper';
import * as Progress from 'react-native-progress';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ActionSheet from 'react-native-actionsheet';
import ChangeBeginModal from './ChangeBeginModal';
import ChangeDateModal from './ChangeDateModal';
import ChangeStaffModal from './ChangeStaffModal';

const ListItemClassLesson = ({
  avatar_url,
  name,
  teacher,
  teacher_assistant,
  start_time,
  end_time,
  time,
  lesson,
  registers,
  total_attendance,
  class_id,
  openQrCode,
  address,
  study_time,
  class_lesson_time,
  lessons,
  classIndex,
  class_lesson_id,
  searchStaff,
  changeBegin,
  changeDate,
  errorChangeClassLessons,
  errorChangeClassLesson,
  staff,
  changeStaff,
  errorChangeClassTeach,
  errorChangeClassAssist,
}) => {
  const CustomActionSheet = useRef(null);
  const [isChangeBeginModalVisible, setChangeBeginModalVisible] = useState(
    false,
  );
  const [isChangeDateModalVisible, setChangeDateModalVisible] = useState(false);
  const [isChangeTeachModalVisible, setChangeTeachModalVisible] = useState(
    false,
  );
  const [isChangeAssistModalVisible, setChangeAssistModalVisible] = useState(
    false,
  );

  const numRegisters = registers.filter((register) => register.status).length;
  const attendPercentage =
    numRegisters && numRegisters > 0 && total_attendance
      ? total_attendance / numRegisters
      : 0;

  function showActionSheet() {
    CustomActionSheet.current.show();
  }

  function toggleChangeBeginModal() {
    setChangeBeginModalVisible(!isChangeBeginModalVisible);
  }

  function toggleChangeDateModal() {
    setChangeDateModalVisible(!isChangeDateModalVisible);
  }

  function toggleChangeTeachModal() {
    setChangeTeachModalVisible(!isChangeTeachModalVisible);
  }

  function toggleChangeAssistModal() {
    setChangeAssistModalVisible(!isChangeAssistModalVisible);
  }

  function executeActions(index) {
    switch (index) {
      case 0:
        toggleChangeBeginModal();
        break;
      case 1:
        toggleChangeDateModal();
        break;
      case 2:
        toggleChangeTeachModal();
        break;
      case 3:
        toggleChangeAssistModal();
        break;
      default:
        return;
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{uri: avatar_url}} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.row}>
          {teacher && (
            <View
              style={{
                ...styles.card,
                ...{
                  backgroundColor:
                    !teacher.color || teacher.color === ''
                      ? theme.processColor1
                      : '#' + teacher.color,
                },
              }}>
              <Text style={styles.tagName}>
                {getShortName(teacher.name.trim())}
              </Text>
            </View>
          )}
          {teacher_assistant && (
            <View
              style={{
                ...styles.card,
                ...{
                  backgroundColor:
                    !teacher_assistant.color || teacher_assistant.color === ''
                      ? theme.processColor1
                      : '#' + teacher_assistant.color,
                  marginLeft: 5,
                },
              }}>
              <Text style={styles.tagName}>
                {getShortName(teacher_assistant.name.trim())}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.info}>
          {start_time}-{end_time} - {time}
        </Text>
        <Text numberOfLines={1} style={styles.info}>
          {lesson.description}
        </Text>
        <Text numberOfLines={1} style={styles.info}>
          {address}
        </Text>
        <View style={styles.progressContainer}>
          <Progress.Bar
            width={120}
            height={4}
            progress={attendPercentage}
            color={'#32CA41'}
            unfilledColor={'#E0E0E0'}
            borderColor={'white'}
            borderRadius={10}
          />
          <Text style={styles.attendanceText}>
            {total_attendance}/{numRegisters} học viên
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              let classModifiedItem = {
                id: class_id,
                lesson: [
                  {
                    id: lesson.id,
                    lesson: {
                      order: lesson.order,
                    },
                  },
                ],
              };
              openQrCode(classModifiedItem);
            }}>
            <View style={styles.button}>
              <Text style={{fontSize: 16}}>Điểm danh</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={showActionSheet}>
            <View style={[{marginLeft: 10}, styles.button]}>
              <MaterialIcon
                name={'arrow-drop-down'}
                size={20}
                color={'black'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ActionSheet
        ref={CustomActionSheet}
        title={'Chọn hành động'}
        options={[
          'Dời lịch học',
          'Đổi lịch dạy',
          'Đổi giảng viên',
          'Đổi trợ giảng',
          'Hủy',
        ]}
        cancelButtonIndex={4}
        onPress={executeActions}
      />
      <ChangeBeginModal
        isVisible={isChangeBeginModalVisible}
        closeModal={toggleChangeBeginModal}
        currentStudyTime={study_time}
        currentDate={class_lesson_time}
        lessons={lessons}
        classIndex={classIndex}
        changeBegin={changeBegin}
        errorChangeClassLessons={errorChangeClassLessons}
      />
      <ChangeDateModal
        isVisible={isChangeDateModalVisible}
        closeModal={toggleChangeDateModal}
        currentStudyTime={class_lesson_time}
        class_lesson_id={class_lesson_id}
        errorChangeClassLesson={errorChangeClassLesson}
        changeDate={changeDate}
      />
      <ChangeStaffModal
        isVisible={isChangeTeachModalVisible}
        closeModal={toggleChangeTeachModal}
        currentStudyTime={class_lesson_time}
        currentTeach={teacher}
        searchStaff={searchStaff}
        staff={staff}
        class_lesson_id={class_lesson_id}
        changeStaff={changeStaff}
        errorChangeClassTeach={errorChangeClassTeach}
        errorChangeClassAssist={errorChangeClassAssist}
      />
      <ChangeStaffModal
        isVisible={isChangeAssistModalVisible}
        closeModal={toggleChangeAssistModal}
        currentStudyTime={class_lesson_time}
        currentAssist={teacher_assistant}
        searchStaff={searchStaff}
        staff={staff}
        isAssist={true}
        isTeach={false}
        class_lesson_id={class_lesson_id}
        changeStaff={changeStaff}
        errorChangeClassTeach={errorChangeClassTeach}
        errorChangeClassAssist={errorChangeClassAssist}
      />
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    marginHorizontal: theme.mainHorizontal,
    marginVertical: 10,
  },
  avatar: theme.mainAvatar,
  title: theme.title,
  card: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagName: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    marginTop: 5,
    flexWrap: 'wrap',
    flex: 1,
  },
  progressContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendanceText: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#F6F6F6',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
};

export default ListItemClassLesson;
