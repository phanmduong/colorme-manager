import React, {useState, useRef} from 'react';
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
import InputPicker from './common/InputPicker';
import {COLORS} from '../constants/constant';

function AddCourseComponent(props) {
  const [name, setName] = useState(props.course?.name);
  const [description, setDescription] = useState(props.course?.description);
  const [duration, setDuration] = useState(props.course?.duration?.toString());
  const [price, setPrice] = useState(props.course?.price);
  const [isExpanded, setExpanded] = useState(false);
  const [iconUrl, setIconUrl] = useState(props.course?.icon_url);
  const [coverUrl, setCoverUrl] = useState(props.course?.cover_url);
  const [linkWindow, setLinkWindow] = useState(props.course?.linkwindow);
  const [linkMac, setLinkMac] = useState(props.course?.linkmac);
  const [linkInstallWindow, setLinkInstallWindow] = useState(
    props.course?.window_how_install,
  );
  const [linkInstallMac, setLinkInstallMac] = useState(
    props.course?.mac_how_install,
  );
  const [id, setId] = useState(props.course?.id);
  const [color, setColor] = useState(props.course?.color);

  const descriptionRef = useRef(null);
  const linkWindowRef = useRef(null);
  const linkMacRef = useRef(null);
  const linkInstallWindowRef = useRef(null);
  const linkInstallMacRef = useRef(null);

  function toggleExpand() {
    setExpanded(!isExpanded);
  }

  function onSubmit() {
    if (name && duration) {
      const data = {
        id: id,
        color: color,
        cover_url: coverUrl,
        description: description,
        duration: duration,
        icon_url: iconUrl,
        linkmac: linkMac,
        linkwindow: linkWindow,
        mac_how_install: linkInstallMac,
        name: name,
        price: price && price.split('.').join(''),
        window_how_install: linkInstallWindow,
      };
      props.createCourse(data);
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
            placeholder={'Tên môn học'}
            title={'Nhập tên môn học'}
            required
            onChangeText={setName}
            value={name}
            onSubmitEditing={() => descriptionRef.current.focus()}
          />
          <Input
            placeholder={'Mô tả'}
            title={'Nhập mô tả'}
            value={description}
            onChangeText={setDescription}
            refName={descriptionRef}
          />
          {!props.editMode && (
            <Input
              placeholder={'Số buổi'}
              title={'Nhập số buổi'}
              value={duration}
              onChangeText={setDuration}
              keyboardType={'number-pad'}
              required
            />
          )}
          <Input
            placeholder={'Học phí'}
            title={'Nhập học phí'}
            value={dotNumber(price)}
            onChangeText={setPrice}
            keyboardType={'number-pad'}
          />
          <InputPicker
            title={'Màu'}
            header={'Chọn màu'}
            options={COLORS}
            selectedId={color}
            onChangeValue={setColor}
            rendering={props.loadingCourseDetails}
          />
          <Expand isExpanded={isExpanded} toggleExpand={toggleExpand} />
          {isExpanded && (
            <>
              <Input
                title={'URL phần mềm Windows'}
                placeholder={'Nhập URL phần mềm Windows'}
                value={linkWindow}
                onChangeText={setLinkWindow}
                refName={linkWindowRef}
                onSubmitEditing={() => linkInstallWindowRef.current.focus()}
              />
              <Input
                title={'URL hướng dẫn cài đặt(Windows)'}
                placeholder={'Nhập URL hướng dẫn cài đặt(Windows)'}
                onChangeText={setLinkInstallWindow}
                value={linkInstallWindow}
                refName={linkInstallWindowRef}
                onSubmitEditing={() => linkMacRef.current.focus()}
              />
              <Input
                title={'URL phần mềm MacOS'}
                placeholder={'Nhập URL phần mềm MacOS'}
                value={linkMac}
                onChangeText={setLinkMac}
                refName={linkMacRef}
                onSubmitEditing={() => linkInstallMacRef.current.focus()}
              />
              <Input
                title={'URL hướng dẫn cài đặt(MacOS)'}
                placeholder={'Nhập URL hướng dẫn cài đặt(MacOS)'}
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
