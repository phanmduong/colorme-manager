import React from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import Loading from '../common/Loading';
var {width, height} = Dimensions.get('window');
import theme from '../../styles';
import FilterRow from '../common/FilterRow';
import {CLASS_STATUS_FILTER_NEW} from '../../constants/constant';
import FilterRowDate from '../common/FilterRowDate';
import moment from 'moment';

class FilterClassModal extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        avoidKeyboard={true}
        onBackdropPress={this.props.closeModal}
        onBackButtonPress={this.props.closeModal}
        style={styles.modalContainer}>
        <View style={styles.modal}>
          {!this.props.isLoadingGen &&
          !this.props.isLoadingBase &&
          !this.props.isLoadingCourse &&
          !this.props.isLoadingProvinces ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Lọc</Text>
              </View>
              <FilterRow
                title={'Môn học'}
                selectedId={this.props.selectedCourseId}
                onChangeValue={this.props.onSelectCourseId}
                options={this.props.courseData}
                header={'Chọn môn học'}
                defaultId={''}
              />
              <FilterRow
                title={'Tỉnh/thành phố'}
                header={'Chọn tỉnh/thành phố'}
                selectedId={this.props.provinceId}
                defaultId={''}
                options={this.props.provinces}
                onChangeValue={this.props.onSelectProvinceId}
              />
              <FilterRow
                title={'Cơ sở'}
                selectedId={this.props.selectedBaseId}
                defaultId={''}
                header={'Chọn cơ sở'}
                options={this.props.baseData}
                onChangeValue={this.props.onSelectBaseId}
              />
              <FilterRow
                title={'Phòng học'}
                selectedId={this.props.roomId}
                options={this.props.rooms}
                header={'Chọn phòng học'}
                defaultId={''}
                onChangeValue={this.props.onSelectRoomId}
                getLabel={(item) =>
                  (item.base?.name
                    ? item.base.name + ': ' + item.base.address + ' - '
                    : '') + item.name
                }
              />
              <FilterRow
                title={'Giai đoạn tuyển sinh'}
                options={this.props.genData}
                defaultId={''}
                header={'Chọn giai đoạn tuyển sinh'}
                selectedId={this.props.selectedGenId}
                onChangeValue={(id) => {
                  const gen = this.props.genData.find((item) => item.id === id);
                  if (gen) {
                    this.props.onSelectGenId(id);
                    this.props.onSelectEnrollStartTime(
                      moment(gen.start_time).unix(),
                    );
                    this.props.onSelectEnrollEndTime(
                      moment(gen.end_time).unix(),
                    );
                  }
                }}
              />
              <FilterRowDate
                title={'Thời gian bắt đầu tuyển sinh'}
                selectedDate={this.props.enrollStartTime}
                onSelectDate={this.props.onSelectEnrollStartTime}
                isUnix
              />
              <FilterRowDate
                title={'Thời gian kết thúc tuyển sinh'}
                selectedDate={this.props.enrollEndTime}
                onSelectDate={this.props.onSelectEnrollEndTime}
                isUnix
              />
              <FilterRowDate
                title={'Thời gian bắt đầu khai giảng'}
                selectedDate={this.props.startTime}
                onSelectDate={this.props.onSelectStartTime}
                isUnix
              />
              <FilterRowDate
                title={'Thời gian kết thúc khai giảng'}
                selectedDate={this.props.endTime}
                onSelectDate={this.props.onSelectEndTime}
                isUnix
              />
              <FilterRow
                title={'Giảng viên/trợ giảng'}
                header={'Chọn giảng viên/trợ giảng'}
                defaultId={''}
                selectedId={this.props.teacherId}
                options={this.props.staff}
                onChangeValue={this.props.onSelectTeacherId}
                isApiSearch={true}
                onApiSearch={this.props.loadStaff}
              />
              <FilterRow
                title={'Thể loại lớp'}
                header={'Chọn thể loại'}
                options={CLASS_STATUS_FILTER_NEW}
                selectedId={this.props.type}
                defaultId={''}
                onChangeValue={this.props.onSelectType}
              />
              <FilterRow
                title={'Trạng thái lớp học'}
                header={'Chọn trạng thái'}
                options={this.props.statuses}
                selectedId={this.props.class_status}
                defaultId={''}
                onChangeValue={this.props.onSelectClassStatus}
              />
              <TouchableOpacity
                onPress={() => {
                  this.props.filter();
                  this.props.closeModal();
                }}>
                <View style={styles.submit}>
                  <Text style={styles.submitTitle}>Áp dụng</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.closeModal();
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
}

const styles = {
  modal: {
    backgroundColor: 'white',
    height: 550,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: theme.mainHorizontal,
  },
  submit: {
    height: 45,
    borderRadius: 24,
    backgroundColor: '#2ACC4C',
    justifyContent: 'center',
    alignItems: 'center',
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
