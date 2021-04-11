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
const {width, height} = Dimensions.get('window');
import theme from '../../styles';
import FilterRow from '../common/FilterRow';
import SubmitButton from '../common/SubmitButton';
import {
  BOOKMARK_FILTER,
  CLASS_STATUS_FILTER_NEW,
  MONEY_FILTER,
  TELE_CALL_STATUS,
} from '../../constants/constant';
import FilterRowDate from '../common/FilterRowDate';
import FilterRowInput from '../common/FilterRowInput';

function FilterRegisterListModal(props) {
  return (
    <Modal
      isVisible={props.isVisible}
      avoidKeyboard={true}
      onBackdropPress={props.closeModal}
      onBackButtonPress={props.closeModal}
      style={styles.modalContainer}>
      <View style={styles.modal}>
        {!props.isLoadingCampaigns &&
        !props.isLoadingSources &&
        !props.isLoadingStatuses &&
        !props.isLoadingSalers &&
        !props.isLoadingCourses &&
        !props.isLoadingBases &&
        !props.isLoadingProvinces &&
        !props.isLoadingCoupons ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Lọc</Text>
            </View>
            <FilterRowDate
              title={'Bắt đầu'}
              selectedDate={props.start_time}
              onSelectDate={props.onSelectStartTime}
              isUnix
            />
            <FilterRowDate
              title={'Kết thúc'}
              selectedDate={props.end_time}
              onSelectDate={props.onSelectEndTime}
              isUnix
            />
            <FilterRow
              title={'Tỉnh/thành phố'}
              onChangeValue={props.onSelectProvinceId}
              selectedId={props.provinceId}
              header={'Chọn tỉnh/thành phố'}
              options={props.provinces}
              defaultId={''}
            />
            <FilterRow
              title={'Cơ sở'}
              onChangeValue={props.onSelectBaseId}
              defaultId={''}
              options={props.baseData}
              header={'Chọn cở sở'}
              selectedId={props.baseId}
            />
            <FilterRow
              title={'Môn học'}
              header={'Chọn môn học'}
              selectedId={props.courseId}
              options={props.courses}
              defaultId={''}
              onChangeValue={props.onSelectCourseId}
            />
            <FilterRow
              title={'Lớp học'}
              header={'Chọn lớp học'}
              selectedId={props.classId}
              options={props.filterClasses}
              defaultId={''}
              onChangeValue={props.onSelectClassId}
              isApiSearch
              onApiSearch={props.loadFilterClasses}
            />
            <FilterRow
              title={'Thể loại lớp'}
              defaultId={''}
              header={'Chọn thể loại lớp'}
              options={CLASS_STATUS_FILTER_NEW}
              onChangeValue={props.onSelectClassStatus}
              selectedId={props.classStatus}
            />
            <FilterRow
              title={'Saler'}
              header={'Chọn saler'}
              defaultId={''}
              selectedId={props.salerId}
              options={props.salers}
              onChangeValue={props.onSelectSalerId}
            />
            <FilterRow
              title={'Trạng thái cuộc gọi'}
              selectedId={props.callStatus}
              options={TELE_CALL_STATUS}
              header={'Chọn trạng thái cuộc gọi'}
              onChangeValue={props.onSelectCallStatus}
              defaultId={''}
            />
            <FilterRow
              title={'Trạng thái'}
              header={'Chọn trạng thái'}
              selectedId={props.statusId}
              options={props.statuses}
              defaultId={''}
              onChangeValue={props.onSelectStatus}
            />
            <FilterRow
              title={'Mã ưu đãi'}
              header={'Chọn mã ưu đãi'}
              defaultId={''}
              options={props.coupons}
              selectedId={props.couponId}
              onChangeValue={props.onSelectCouponId}
            />
            <FilterRow
              title={'Nguồn'}
              defaultId={''}
              header={'Chọn nguồn'}
              selectedId={props.sourceId}
              options={props.sources}
              onChangeValue={props.onSelectSource}
            />
            <FilterRow
              title={'Chiến dịch'}
              onChangeValue={props.onSelectCampaignId}
              options={props.campaigns}
              selectedId={props.campaignId}
              header={'Chọn chiến dịch'}
              defaultId={''}
            />
            <FilterRow
              title={'Học phí'}
              defaultId={''}
              selectedId={props.paidStatus}
              header={'Chọn học phí'}
              options={MONEY_FILTER}
              onChangeValue={props.onSelectPaidStatus}
            />
            <FilterRow
              title={'Đánh dấu'}
              onChangeValue={props.onSelectBookmark}
              options={BOOKMARK_FILTER}
              header={'Chọn đánh dấu'}
              selectedId={props.bookmark}
              defaultId={''}
            />
            <FilterRowDate
              title={'Hẹn nộp tiền (bắt đầu)'}
              selectedDate={props.appointmentPaymentStartTime}
              onSelectDate={props.onSelectAppointmentPaymentStartTime}
              isUnix
            />
            <FilterRowDate
              title={'Hẹn nộp tiền (kết thúc)'}
              selectedDate={props.appointmentPaymentEndTime}
              onSelectDate={props.onSelectAppointmentPaymentEndTime}
              isUnix
            />
            <FilterRowDate
              title={'Hẹn gọi lại (bắt đầu)'}
              selectedDate={props.callBackStartTime}
              onSelectDate={props.onSelectCallBackStartTime}
              isUnix
            />
            <FilterRowDate
              title={'Hẹn gọi lại (kết thúc)'}
              selectedDate={props.callBackEndTime}
              onSelectDate={props.onSelectCallBackEndTime}
              isUnix
            />
            <FilterRowInput
              title={'Tìm kiếm theo note'}
              value={props.note}
              onChangeValue={props.onChangeNote}
            />
            <SubmitButton
              title={'Áp dụng'}
              containerStyle={styles.submit}
              onPress={() => {
                props.onRefresh();
                props.closeModal();
              }}
            />
            <TouchableOpacity onPress={props.closeModal}>
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
    height: height - 140,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: theme.mainHorizontal,
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  submit: {
    marginTop: 20,
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

export default FilterRegisterListModal;
