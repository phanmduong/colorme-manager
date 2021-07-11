import React, {useState, useRef} from 'react';
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
import {observer} from 'mobx-react';

function AddCourseLessonComponent(props) {
  const [name, setName] = useState(props.editMode && props.lesson?.name);
  const [order, setOrder] = useState(
    props.editMode && props.lesson?.order?.toString(),
  );
  const [description, setDescription] = useState(
    props.editMode && props.lesson?.description,
  );
  const [isExpanded, setExpanded] = useState(false);
  const [googleLink, setGoogleLink] = useState(
    props.editMode && props.lesson?.detail_teacher,
  );
  const [audioLink, setAudioLink] = useState(
    props.editMode && props.lesson?.audio_url,
  );
  const [videoLink, setVideoLink] = useState(
    props.editMode && props.lesson?.video_url,
  );
  const [termId, setTerm] = useState(props.editMode && props.lesson?.term_id);
  const [imageUrl, setImage] = useState(
    props.editMode && props.lesson?.image_url,
  );

  const descriptionRef = useRef(null);
  const linkRef = useRef(null);
  const orderRef = useRef(null);
  const audioLinkRef = useRef(null);
  const videoLinkRef = useRef(null);

  const {addingLesson, editingLesson} = props.store;

  function toggleExpand() {
    setExpanded(!isExpanded);
  }

  function onSubmit() {
    if (name && order) {
      if (!props.editMode) {
        const data = {
          audio_url: audioLink,
          course_id: props.courseId,
          description: description,
          detail_teacher: googleLink,
          image_url: imageUrl,
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
          image_url: imageUrl,
          name: name,
          order: order,
          video_url: videoLink,
          term_id: termId,
          id: props.lesson?.id,
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
            onSubmitEditing={() => descriptionRef.current.focus()}
          />
          <Input
            title={'Mô tả'}
            placeholder={'Mô tả'}
            onChangeText={setDescription}
            value={description}
            refName={descriptionRef}
            onSubmitEditing={() => linkRef.current.focus()}
          />
          <Input
            title={'Link google slide/doc'}
            placeholder={'Link google slide/doc'}
            onChangeText={setGoogleLink}
            value={googleLink}
            refName={linkRef}
            onSubmitEditing={() => orderRef.current.focus()}
          />
          <Input
            title={'Thứ tự'}
            placeholder={'Thứ tự'}
            onChangeText={setOrder}
            keyboardType={'number-pad'}
            value={order}
            required
            refName={orderRef}
            onSubmitEditing={() => orderRef.current.blur()}
          />
          <Expand isExpanded={isExpanded} toggleExpand={toggleExpand} />
          {isExpanded && (
            <>
              <Input
                title={'Link audio'}
                placeholder={'Link audio'}
                onChangeText={setAudioLink}
                value={audioLink}
                refName={audioLinkRef}
                onSubmitEditing={() => videoLinkRef.current.focus()}
              />
              <Input
                title={'Link video'}
                placeholder={'Link video'}
                onChangeText={setVideoLink}
                value={videoLink}
                refName={videoLinkRef}
                onSubmitEditing={() => videoLinkRef.current.blur()}
              />
            </>
          )}
          <SubmitButton
            title={'Lưu'}
            containerStyle={styles.btn}
            onPress={onSubmit}
            loading={!props.editMode ? addingLesson : editingLesson}
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

export default observer(AddCourseLessonComponent);
