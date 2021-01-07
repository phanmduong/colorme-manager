import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import InputPicker from './common/InputPicker';
import Loading from './common/Loading';
import theme from '../styles';
import Input from './common/Input';
import InputCheckBox from './common/InputCheckBox';
import SubmitButton from './common/SubmitButton';

function AddFormComponent(props) {
  const [courseId, setCourse] = useState(null);
  const [baseId, setBase] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [slug, setSlug] = useState(null);
  const [dataField, setDataField] = useState(['name', 'email', 'phone']);

  const descriptionRef = useRef(null);
  const slugRef = useRef(null);

  useEffect(() => {
    if (props.editMode) {
      setTitle(props.data.title);
      setCourse(props.data.course_id);
      setBase(props.data.base_id);
      setDescription(props.data.description);
      setSlug(props.data.slug);
      setDataField(props.data.data_fields);
    }
  }, []);

  function isCheckBoxActivated(field) {
    return dataField.includes(field);
  }

  function modifyDataFields(boolean, field) {
    let copyDataField = [...dataField];
    if (boolean) {
      copyDataField.push(field);
    } else {
      const fieldIdx = copyDataField.indexOf(field);
      if (fieldIdx > -1) {
        copyDataField.splice(fieldIdx, 1);
      }
    }
    setDataField(copyDataField);
  }

  function generateSlug() {
    let copyTitle = title;
    copyTitle = copyTitle.toLowerCase();
    copyTitle = copyTitle.replace(/\s/g, '-');
    setSlug(copyTitle);
  }

  function createForm() {
    if (title && slug && description) {
      let data = {
        base_id: baseId,
        course_id: courseId,
        title: title,
        data_fields: JSON.stringify(dataField),
        slug: slug,
        description: description,
        id: props.editMode && props.data.id,
      };
      if (!props.editMode) {
        props.createForm(data);
      } else {
        props.updateForm(data);
      }
    } else {
      Alert.alert('Thông báo', 'Bạn cần nhập đủ thông tin');
    }
  }

  return props.isLoadingCourses ? (
    <Loading />
  ) : (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled
      keyboardVerticalOffset={100}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <InputPicker
            options={props.courses}
            header={'Chọn môn học'}
            placeholder={'Tất cả môn học'}
            title={'Form đăng kí này dành cho môn học nào'}
            onChangeValue={setCourse}
            isAllOptionAvailable={true}
            allOptionId={null}
            allOptionName={'Tất cả môn học'}
            selectedId={props.editMode && courseId}
          />
          <InputPicker
            options={props.baseData}
            isAllOptionAvailable={true}
            allOptionId={null}
            allOptionName={'Tất cả cơ sở'}
            title={'Form đăng kí này dành cho cơ sở nào'}
            header={'Chọn cở sở'}
            placeholder={'Tất cả cơ sở'}
            onChangeValue={setBase}
            selectedId={props.editMode && baseId}
          />
          <Input
            title={'Tiêu đề form đăng kí'}
            placeholder={'Tiêu đề form đăng kí'}
            onChangeText={setTitle}
            value={title}
            required={true}
            onSubmitEditing={() => {
              descriptionRef.current.focus();
              generateSlug();
            }}
            onBlur={() => generateSlug()}
          />
          <Input
            title={'Mô tả form đăng kí'}
            placeholder={'Mô tả form đăng kí'}
            required={true}
            value={description}
            refName={descriptionRef}
            onSubmitEditing={() => slugRef.current.focus()}
            onChangeText={setDescription}
          />
          <Input
            title={'URL của form đăng kí'}
            required={true}
            onChangeText={setSlug}
            value={slug}
            placeholder={'URL của form đăng kí'}
            refName={slugRef}
            onSubmitEditing={() => slugRef.current.blur()}
          />
          <View style={styles.checkBoxRow}>
            <InputCheckBox
              disabled={true}
              name={'Họ tên'}
              value={isCheckBoxActivated('name')}
              containerStyle={styles.checkBox}
            />
            <InputCheckBox
              disabled={true}
              name={'Email'}
              value={isCheckBoxActivated('email')}
              containerStyle={styles.checkBox}
            />
          </View>
          <View style={styles.checkBoxRow}>
            <InputCheckBox
              disabled={true}
              name={'Số điện thoại'}
              value={isCheckBoxActivated('phone')}
              containerStyle={styles.checkBox}
            />
            <InputCheckBox
              name={'Giới tính'}
              value={isCheckBoxActivated('gender')}
              containerStyle={styles.checkBox}
              onValueChange={(value) => modifyDataFields(value, 'gender')}
            />
          </View>
          <View style={styles.checkBoxRow}>
            <InputCheckBox
              name={'Ngày tháng năm sinh'}
              value={isCheckBoxActivated('dob')}
              containerStyle={styles.checkBox}
              onValueChange={(value) => modifyDataFields(value, 'dob')}
            />
            <InputCheckBox
              name={'Tên phụ huynh'}
              value={isCheckBoxActivated('father_name')}
              containerStyle={styles.checkBox}
              onValueChange={(value) => modifyDataFields(value, 'father_name')}
            />
          </View>
          <View style={styles.checkBoxRow}>
            <InputCheckBox
              name={'Địa chỉ'}
              value={isCheckBoxActivated('address')}
              containerStyle={styles.checkBox}
              onValueChange={(value) => modifyDataFields(value, 'address')}
            />
            <InputCheckBox
              name={'Trường học'}
              value={isCheckBoxActivated('university')}
              containerStyle={styles.checkBox}
              onValueChange={(value) => modifyDataFields(value, 'university')}
            />
          </View>
          <View style={styles.checkBoxRow}>
            <InputCheckBox
              name={'Công việc'}
              value={isCheckBoxActivated('work')}
              containerStyle={styles.checkBox}
              onValueChange={(value) => modifyDataFields(value, 'work')}
            />
          </View>
          <SubmitButton
            title={'Lưu'}
            containerStyle={styles.button}
            loading={!props.editMode ? props.creating : props.updating}
            onPress={createForm}
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
  checkBox: {
    flex: 1,
  },
  checkBoxRow: {
    marginTop: 30,
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    marginTop: 30,
  },
};

export default AddFormComponent;
