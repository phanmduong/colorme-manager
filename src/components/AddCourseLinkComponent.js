import React, {useState, useRef} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import Input from './common/Input';
import SubmitButton from './common/SubmitButton';
import theme from '../styles';
import {observer} from "mobx-react";

function AddCourseLinkComponent(props) {
  const [name, setName] = useState(null);
  const [link, setLink] = useState(null);
  const [description, setDescription] = useState(null);

  const linkRef = useRef(null);
  const descriptionRef = useRef(null);

  const {creatingLink} = props.store;

  function onSubmit() {
    if (name && link) {
      const data = {
        course_id: props.courseId,
        link_description: description,
        link_name: name,
        link_url: link,
      };
      props.createLink(data);
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
            title={'Tên tài liệu'}
            onChangeText={setName}
            placeholder={'Nhập tên'}
            value={name}
            onSubmitEditing={() => linkRef.current.focus()}
            required
          />
          <Input
            title={'URL'}
            placeholder={'Nhập URL'}
            onChangeText={setLink}
            value={link}
            refName={linkRef}
            onSubmitEditing={() => descriptionRef.current.focus()}
            required
          />
          <Input
            title={'Mô tả'}
            placeholder={'Nhập mô tả'}
            onChangeText={setDescription}
            value={description}
            refName={descriptionRef}
            onSubmitEditing={() => descriptionRef.current.blur()}
            required
          />
          <SubmitButton
            title={'Lưu'}
            containerStyle={styles.btn}
            loading={creatingLink}
            onPress={onSubmit}
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
  btn: {marginTop: 40},
};

export default observer(AddCourseLinkComponent);
