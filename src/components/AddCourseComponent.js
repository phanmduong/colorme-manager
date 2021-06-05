import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Input from './common/Input';
import theme from '../styles';
import Expand from './common/Expand';
import SubmitButton from './common/SubmitButton';
import {dotNumber, isEmptyObject} from '../helper';
import Loading from './common/Loading';

function AddCourseComponent(props) {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [duration, setDuration] = useState(null);
  const [price, setPrice] = useState(null);
  const [isExpanded, setExpanded] = useState(false);
  const [iconUrl, setIconUrl] = useState(null);
  const [coverUrl, setCoverUrl] = useState(null);
  const [linkWindow, setLinkWindow] = useState(null);
  const [linkMac, setLinkMac] = useState(null);
  const [linkInstallWindow, setLinkInstallWindow] = useState(null);
  const [linkInstallMac, setLinkInstallMac] = useState(null);
  const [id, setId] = useState(null);

  const descriptionRef = useRef(null);
  const linkWindowRef = useRef(null);
  const linkMacRef = useRef(null);
  const linkInstallWindowRef = useRef(null);
  const linkInstallMacRef = useRef(null);

  useEffect(() => {
    if (props.editMode && !isEmptyObject(props.courseDetails)) {
      setName(props.courseDetails.name);
      setDescription(props.courseDetails.description);
      setDuration(props.courseDetails.duration.toString());
      setPrice(props.courseDetails.price.toString());
      setIconUrl(props.courseDetails.icon_url);
      setLinkWindow(props.courseDetails.linkwindow);
      setLinkMac(props.courseDetails.linkmac);
      setLinkInstallMac(props.courseDetails.mac_how_install);
      setLinkInstallWindow(props.courseDetails.window_how_install);
      setId(props.courseDetails.id);
    }
  }, [props.courseDetails]);

  function toggleExpand() {
    setExpanded(!isExpanded);
  }

  function onSubmit() {
    if (name && duration) {
      const data = {
        id: id,
        color: null,
        cover_url: coverUrl,
        description: description,
        duration: duration,
        icon_url: iconUrl,
        linkmac: linkMac,
        linkwindow: linkWindow,
        mac_how_install: linkInstallMac,
        name: name,
        price: price.split('.').join(''),
        window_how_install: linkInstallWindow,
      };
      props.createCourse(data);
    } else {
      Alert.alert('Thông báo', 'Bạn cần nhập đủ thông tin');
    }
  }

  return !props.loadingCourseDetails ? (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled
      keyboardVerticalOffset={100}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Input
            placeholder={'Tên môn học'}
            title={'Tên môn học'}
            required
            onChangeText={setName}
            value={name}
            onSubmitEditing={() => descriptionRef.current.focus()}
          />
          <Input
            placeholder={'Mô tả ngắn'}
            title={'Mô tả ngắn'}
            value={description}
            onChangeText={setDescription}
            refName={descriptionRef}
          />
          <Input
            placeholder={'Số buổi'}
            title={'Số buổi'}
            value={duration}
            onChangeText={setDuration}
            keyboardType={'number-pad'}
            required
          />
          <Input
            placeholder={'Học phí'}
            title={'Học phí'}
            value={dotNumber(price)}
            onChangeText={setPrice}
            keyboardType={'number-pad'}
          />
          <Expand isExpanded={isExpanded} toggleExpand={toggleExpand} />
          {isExpanded && (
            <>
              <Input
                title={'Link phần mềm Windows'}
                placeholder={'Link phần mềm Windows'}
                value={linkWindow}
                onChangeText={setLinkWindow}
                refName={linkWindowRef}
                onSubmitEditing={() => linkInstallWindowRef.current.focus()}
              />
              <Input
                title={'Link hướng dẫn Windows'}
                placeholder={'Link hướng dẫn Windows'}
                onChangeText={setLinkInstallWindow}
                value={linkInstallWindow}
                refName={linkInstallWindowRef}
                onSubmitEditing={() => linkMacRef.current.focus()}
              />
              <Input
                title={'Link phần mềm Mac'}
                placeholder={'Link phần mềm Mac'}
                value={linkMac}
                onChangeText={setLinkMac}
                refName={linkMacRef}
                onSubmitEditing={() => linkInstallMacRef.current.focus()}
              />
              <Input
                title={'Link hướng dẫn Mac'}
                placeholder={'Link hướng dẫn Mac'}
                value={linkInstallMac}
                onChangeText={setLinkInstallMac}
                refName={linkInstallMacRef}
                onSubmitEditing={() => linkInstallMacRef.current.blur()}
              />
            </>
          )}
          <SubmitButton
            title={'Lưu'}
            containerStyle={styles.btn}
            onPress={onSubmit}
            loading={props.creating}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  ) : (
    <Loading />
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

export default AddCourseComponent;
