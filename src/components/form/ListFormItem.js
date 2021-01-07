import React, {useRef, useState} from 'react';
import {View, Text, Linking, TouchableOpacity, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../../styles';
import moment from 'moment';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ActionSheet from 'react-native-actionsheet';
import UTMFormModal from './UTMFormModal';

function ListFormItem({
  name,
  description,
  slug,
  created_at,
  navigation,
  base_id,
  course_id,
  data_fields,
  title,
  id,
  duplicateForm,
  deleteForm,
  sources,
  campaigns,
}) {
  const CustomActionSheet = useRef(null);

  const [isVisible, setVisible] = useState(false);

  function toggleModal() {
    setVisible(!isVisible);
  }

  function showActionSheet() {
    CustomActionSheet.current.show();
  }

  function executeActions(index) {
    switch (index) {
      case 0:
        Alert.alert('Nhân bản', 'Bạn thực sự muốn nhân bản?', [
          {text: 'Hủy bỏ', style: 'cancel'},
          {text: 'Nhân bản', onPress: () => duplicateForm(id)},
        ]);
        break;
      case 1:
        toggleModal();
        break;
      case 2:
        Alert.alert('Xóa', 'Bạn thực sự muốn xóa?', [
          {text: 'Hủy bỏ', style: 'cancel'},
          {text: 'Xóa', style: 'destructive', onPress: () => deleteForm(id)},
        ]);
        break;
      default:
        return;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.headerAva}>
          <MaterialIcons
            name={'format-list-bulleted'}
            size={20}
            color={'white'}
          />
        </View>
        <Text style={styles.formName}>{name}</Text>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.placeholderAva} />
        <View style={styles.content}>
          <Text style={styles.info}>{description}</Text>
          <Text
            style={styles.hyperLink}
            onPress={() =>
              Linking.openURL(
                `http://manage.colorme.vn:2222/pages/registers/${slug}`,
              )
            }>
            http://manage.colorme.vn:2222/pages/registers/{slug}
          </Text>
          <Text style={styles.info}>
            {moment.unix(created_at).format('HH:mm DD/MM/YYYY')}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `http://manage.colorme.vn:2222/pages/registers/${slug}`,
                )
              }>
              <View style={[styles.button, {marginRight: 10}]}>
                <Text style={{fontSize: 16}}>Xem thử form</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AddForm', {
                  editMode: true,
                  data: {
                    id: id,
                    base_id: base_id,
                    course_id: course_id,
                    slug: slug,
                    data_fields: data_fields,
                    title: title,
                    description: description,
                  },
                })
              }>
              <View style={[{marginRight: 10}, styles.button]}>
                <Text style={{fontSize: 16}}>Sửa</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={showActionSheet}>
              <View style={styles.button}>
                <MaterialIcon
                  name={'arrow-drop-down'}
                  size={20}
                  color={'black'}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ActionSheet
        ref={CustomActionSheet}
        title={'Chọn hành động'}
        options={['Nhân bản form', 'UTM Builder', 'Xóa form', 'Hủy']}
        cancelButtonIndex={3}
        onPress={executeActions}
      />
      <UTMFormModal
        isVisible={isVisible}
        closeModal={toggleModal}
        sources={sources}
        campaigns={campaigns}
        slug={slug}
      />
    </View>
  );
}

const styles = {
  container: {
    marginHorizontal: theme.mainHorizontal,
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAva: {
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F29C38',
  },
  placeholderAva: {
    width: 35,
  },
  formName: {
    fontSize: theme.title.fontSize,
    fontWeight: theme.title.fontWeight,
    marginLeft: 15,
    marginRight: 5,
  },
  subContainer: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
  info: {
    flexWrap: 'wrap',
    paddingTop: 5,
  },
  hyperLink: {
    paddingTop: 5,
    color: '#2980b9',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 18,
    borderRadius: 8,
    height: 45,
    justifyContent: 'center',
  },
};

export default ListFormItem;
