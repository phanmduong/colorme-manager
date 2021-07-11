import React, {useState, useRef} from 'react';
import {
  View,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import theme from '../styles';
import Input from './common/Input';
import InputPicker from './common/InputPicker';
import SubmitButton from './common/SubmitButton';
import {observer} from 'mobx-react';
import Expand from './common/Expand';

function AddCourseExamComponent(props) {
  const [groupExamId, setGroupExam] = useState(null);
  const [title, setTitle] = useState(null);
  const [weight, setWeight] = useState(null);
  const [description, setDescription] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [lessonId, setLesson] = useState(null);
  const [order, setOrder] = useState(null);
  const [avatar_url, setAvatar] = useState(null);

  const [isExpanded, setExpanded] = useState(false);

  const weightRef = useRef(null);
  const descriptionRef = useRef(null);

  const {groupExams, lessons, creatingExam} = props.store;

  function onSubmit() {
    if (title && weight && order && deadline) {
      const data = {
        avatar_url: avatar_url,
        course_id: props.courseId,
        deadline: deadline,
        description: description,
        group_exam_id: groupExamId,
        lesson_id: lessonId,
        order: order,
        title: title,
        weight: weight,
      };
      props.createExam(data);
    } else {
      Alert.alert('Thông báo', 'Bạn cần nhập đủ thông tin');
    }
  }

  function toggleExpand() {
    setExpanded(!isExpanded);
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled
      keyboardVerticalOffset={100}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <InputPicker
            title={'Nhóm bài kiểm tra'}
            onChangeValue={setGroupExam}
            selectedId={groupExamId}
            header={'Chọn nhóm bài kiểm tra'}
            options={groupExams}
          />
          <Input
            title={'Tên bài kiểm tra'}
            onChangeText={setTitle}
            placeholder={'Nhập tên bài kiểm tra'}
            required
            onSubmitEditing={() => weightRef.current.focus()}
          />
          <Input
            title={'Trọng số'}
            placeholder={'Nhập trọng số'}
            onChangeText={setWeight}
            required
            keyboardType={'number-pad'}
            refName={weightRef}
          />
          <Input
            title={'Hạn chót (ngày)'}
            placeholder={'Số ngày'}
            required
            onChangeText={setDeadline}
            keyboardType={'number-pad'}
          />
          <Input
            title={'Thứ tự'}
            onChangeText={setOrder}
            value={order}
            placeholder={'Nhập thứ tự'}
            keyboardType={'number-pad'}
            required
          />
          <InputPicker
            title={'Diễn ra vào buổi học'}
            options={lessons}
            header={'Chọn buổi'}
            selectedId={lessonId}
            onChangeValue={setLesson}
          />
          <Expand isExpanded={isExpanded} toggleExpand={toggleExpand} />
          {isExpanded && (
            <Input
              title={'Mô tả'}
              placeholder={'Nhập mô tả'}
              onChangeText={setDescription}
              refName={descriptionRef}
              onSubmitEditing={() => descriptionRef.current.blur()}
            />
          )}
          <SubmitButton
            title={'Lưu'}
            containerStyle={styles.btn}
            onPress={onSubmit}
            loading={creatingExam}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = {
  container: {
    marginHorizontal: theme.mainHorizontal,
  },
  btn: {
    marginTop: 40,
  },
  uploader: {
    marginTop: 30,
  },
};

export default observer(AddCourseExamComponent);
