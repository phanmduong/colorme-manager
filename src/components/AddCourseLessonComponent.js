import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import theme from '../styles';
import Input from './common/Input';
import Expand from './common/Expand';
import SubmitButton from './common/SubmitButton';
import InputPicker from './common/InputPicker';

function AddCourseLessonComponent(props) {
  const [name, setName] = useState(props.editMode && props.lesson.name);
  const [order, setOrder] = useState(props.editMode && props.lesson.order.toString());
  const [description, setDescription] = useState(props.editMode && props.lesson.description);
  const [isExpanded, setExpanded] = useState(false);
  const [googleLink, setGoogleLink] = useState(props.editMode && props.lesson.detail_teacher);
  const [audioLink, setAudioLink] = useState(props.editMode && props.lesson.audio_url);
  const [videoLink, setVideoLink] = useState(props.editMode && props.lesson.video_url);
  const [termId, setTerm] = useState(props.editMode && props.lesson.term_id);
  const [id, setId] = useState(props.editMode && props.lesson.id);

  function toggleExpand() {
    setExpanded(!isExpanded);
  }

  function onSubmit() {
    if (name) {
      if (!props.editMode) {
        const data = {
          audio_url: audioLink,
          course_id: props.courseId,
          description: description,
          detail_teacher: googleLink,
          name: name,
          order: order,
          video_url: videoLink,
          term_id: termId,
        };
        props.addLesson(data);
      } else {
        const data = {
          audio_url: audioLink,
          course_id: props.courseId,
          description: description,
          detail_teacher: googleLink,
          name: name,
          order: order,
          video_url: videoLink,
          term_id: termId,
          id: id,
        };
        props.editLesson(data);
      }
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
          <Input
            title={'Tên buổi học'}
            placeholder={'Tên buổi học'}
            onChangeText={setName}
            required
            value={name}
          />
          <Input
            title={'Thứ tự'}
            placeholder={'Thứ tự'}
            onChangeText={setOrder}
            keyboardType={'number-pad'}
            value={order}
          />
          <Input
            title={'Mô tả ngắn'}
            placeholder={'Mô tả ngắn'}
            onChangeText={setDescription}
            value={description}
          />
          <InputPicker
            title={'Học phần'}
            placeholder={'Chọn học phần'}
            onChangeValue={setTerm}
            header={'Chọn học phần'}
            options={props.courseDetails.terms}
            selectedId={termId}
          />
          <Expand isExpanded={isExpanded} toggleExpand={toggleExpand} />
          {isExpanded && (
            <>
              <Input
                title={'Link Google Slide'}
                placeholder={'Link Google Slide'}
                onChangeText={setGoogleLink}
                value={googleLink}
              />
              <Input
                title={'Link audio'}
                placeholder={'Link audio'}
                onChangeText={setAudioLink}
                value={audioLink}
              />
              <Input
                title={'Link video'}
                placeholder={'Link video'}
                onChangeText={setVideoLink}
                value={videoLink}
              />
            </>
          )}
          <SubmitButton
            title={'Lưu'}
            containerStyle={styles.btn}
            onPress={onSubmit}
            loading={!props.editMode ? props.addingLesson : props.editingLesson}
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
};

export default AddCourseLessonComponent;
