import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Alert,
  Image,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import theme from '../styles';
import Input from './common/Input';
import InputPicker from './common/InputPicker';
import SubmitButton from './common/SubmitButton';
import ImageUploader from './common/ImageUploader';

function AddCourseExamComponent(props) {
  const [groupExamId, setGroupExam] = useState(null);
  const [title, setTitle] = useState(null);
  const [weight, setWeight] = useState(null);
  const [description, setDescription] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [lessonId, setLesson] = useState(null);
  const [avatar_url, setAvatar] = useState(null);

  function onSubmit() {
    if (title && weight) {
      const data = {
        avatar_url: avatar_url,
        course_id: props.courseId,
        deadline: parseInt(deadline),
        description: description,
        group_exam_id: groupExamId,
        lesson_id: lessonId,
        title: title,
        weight: parseInt(weight),
      };
      props.createExam(data);
    } else {
      Alert.alert('Thông báo', 'Bạn cần nhập đủ thông tin');
    }
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
            title={'Nhóm bài test'}
            placeholder={'Nhóm bài test'}
            onChangeValue={setGroupExam}
            selectedId={groupExamId}
            header={'Chọn nhóm bài test'}
            options={props.courseDetails.group_exams}
          />
          <Input
            title={'Tên bài test'}
            onChangeText={setTitle}
            placeholder={'Tên bài test'}
            required
          />
          <Input
            title={'Trọng số'}
            placeholder={'Trọng số'}
            onChangeText={setWeight}
            required
            keyboardType={'number-pad'}
          />
          <Input
            title={'Mô tả'}
            placeholder={'Mô tả'}
            onChangeText={setDescription}
          />
          <Input
            title={'Hạn chót'}
            placeholder={'Số ngày'}
            onChangeText={setDeadline}
            keyboardType={'number-pad'}
          />
          <InputPicker
            title={'Diễn ra vào buổi'}
            placeholder={'Diễn ra vào buổi'}
            options={props.courseDetails.lessons}
            header={'Chọn buổi'}
            selectedId={lessonId}
            onChangeValue={setLesson}
          />
          <ImageUploader
            avatar_url={avatar_url}
            containerStyle={styles.uploader}
            token={props.token}
            onUpload={setAvatar}
          />
          <SubmitButton
            title={'Lưu'}
            containerStyle={styles.btn}
            onPress={onSubmit}
            loading={props.creatingExam}
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

export default AddCourseExamComponent;
