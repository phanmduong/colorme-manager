import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import Loading from '../common/Loading';
const {width} = Dimensions.get('window');
import theme from '../../styles';
import FilterRow from '../common/FilterRow';
import SubmitButton from '../common/SubmitButton';
import FilterRowInput from '../common/FilterRowInput';

function FilterClassModal(props) {
  const [id, setId] = useState(props.id);
  const [courseId, setCourse] = useState(props.selectedCourseId);
  const [baseId, setBase] = useState(props.selectedBaseId);
  const [provinceId, setProvince] = useState(props.selectedProvinceId);

  function applyFilter() {
    props.onSelectCourseId(courseId);
    props.onSelectProvinceId(provinceId);
    props.onSelectBaseId(baseId);
    props.onChangeId(id);
  }

  function filterProvinces(bases) {
    let baseData = [];
    if (provinceId !== -1) {
      for (let base of bases) {
        if (base.id !== -1) {
          if (base.district.province.id === provinceId) {
            baseData.push(base);
          }
        } else {
          baseData.push(base);
        }
      }
      return baseData;
    } else {
      return bases;
    }
  }

  return (
    <Modal
      isVisible={props.isVisible}
      avoidKeyboard={true}
      onBackdropPress={props.closeModal}
      onBackButtonPress={props.closeModal}
      style={styles.modalContainer}>
      <View style={styles.modal}>
        {!props.isLoadingBase &&
        !props.isLoadingCourse &&
        !props.isLoadingProvinces ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Lọc</Text>
            </View>
            <FilterRowInput
              title={'Id lớp học'}
              value={id}
              onChangeValue={setId}
            />
            <FilterRow
              title={'Môn học'}
              options={props.courseData}
              selectedId={courseId}
              onChangeValue={setCourse}
              header={'Chọn môn học'}
            />
            <FilterRow
              title={'Tỉnh thành'}
              options={props.provinces}
              header={'Chọn tỉnh thành'}
              selectedId={provinceId}
              onChangeValue={setProvince}
            />
            <FilterRow
              title={'Cơ sở'}
              selectedId={baseId}
              header={'Chọn cơ sở'}
              options={filterProvinces(props.baseData)}
              onChangeValue={setBase}
              getLabel={(item) =>
                item.name + (item.address ? ' - ' + item.address : '')
              }
            />
            <SubmitButton
              title={'Áp dụng'}
              containerStyle={styles.submit}
              onPress={() => {
                applyFilter();
                props.closeModal();
              }}
            />
            <TouchableOpacity
              onPress={() => {
                props.closeModal();
              }}>
              <View style={styles.cancelContainer}>
                <Text style={styles.cancelTitle}>Hủy</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <View style={{flex: 1}}>
            <Loading size={width / 8} />
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = {
  modal: {
    backgroundColor: 'white',
    height: 440,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: theme.mainHorizontal,
  },
  submit: {
    marginTop: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  submitTitle: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  cancelContainer: {
    marginTop: 25,
    alignItems: 'center',
    paddingBottom: 30,
  },
  cancelTitle: {
    fontSize: 16,
    color: theme.mainColor,
  },
};

export default FilterClassModal;
