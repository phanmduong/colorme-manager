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
import FilterRowDate from '../common/FilterRowDate';
import FilterRow from '../common/FilterRow';
import {
  ADDRESS,
  DUPLICATE_FILTER,
  LEAD_TAG_FILTER,
  RATE,
} from '../../constants/constant';
import SubmitButton from '../common/SubmitButton';

function FilterLeadsModal(props) {
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
        !props.isLoadingStatuses ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Lọc</Text>
            </View>
            <FilterRowDate
              isUnix
              title={'Bắt đầu'}
              selectedDate={props.start_time}
              onSelectDate={props.onSelectStartTime}
            />
            <FilterRowDate
              isUnix
              title={'Kết thúc'}
              selectedDate={props.end_time}
              onSelectDate={props.onSelectEndTime}
            />
            {!props.isMyLead && (
              <FilterRow
                title={'P.I.C'}
                header={'Chọn P.I.C'}
                isApiSearch
                onApiSearch={props.loadStaff}
                options={props.staff}
                selectedId={props.picId}
                onChangeValue={props.onSelectPICLeads}
                defaultId={''}
              />
            )}
            <FilterRow
              title={'Tỉnh/Thành phố'}
              options={ADDRESS}
              header={'Chọn tỉnh/thành phố'}
              defaultId={''}
              selectedId={props.address}
              onChangeValue={props.onSelectAddress}
            />
            <FilterRow
              title={'Cơ sở'}
              header={'Chọn cơ sở'}
              options={props.baseData}
              selectedId={props.baseId}
              onChangeValue={props.onSelectBaseId}
              defaultId={''}
            />
            <FilterRow
              title={'Chiến dịch'}
              header={'Chọn chiến dịch'}
              options={props.campaigns}
              onChangeValue={props.onSelectCampaignId}
              selectedId={props.campaign_id}
              defaultId={''}
            />
            <FilterRow
              title={'Nguồn'}
              header={'Chọn nguồn'}
              defaultId={''}
              options={props.sources}
              onChangeValue={props.onSelectSource}
              selectedId={props.source_id}
            />
            <FilterRow
              title={'Trạng thái'}
              header={'Chọn trạng thái'}
              options={props.statuses}
              selectedId={props.status_id}
              onChangeValue={props.onSelectStatus}
              defaultId={''}
            />
            <FilterRow
              title={'Lead tag'}
              header={'Chọn lead tag'}
              options={LEAD_TAG_FILTER}
              defaultId={''}
              onChangeValue={props.onSelectLeadTag}
              selectedId={props.leadTag}
            />
            <FilterRow
              title={'Lead duplicate'}
              header={'Chọn lead duplicate'}
              selectedId={props.duplicate}
              onChangeValue={props.onSelectDuplicate}
              options={DUPLICATE_FILTER}
              defaultId={''}
            />
            <FilterRow
              title={'Sao'}
              header={'Chọn sao'}
              options={RATE}
              selectedId={props.rate}
              onChangeValue={props.onSelectRate}
              defaultId={''}
            />
            <FilterRowDate
              title={'Hẹn gọi lại (bắt đầu)'}
              onSelectDate={props.onSelectCallBackStartTime}
              isUnix
              selectedDate={props.callBackStartTime}
            />
            <FilterRowDate
              title={'Hẹn gọi lại (kết thúc)'}
              onSelectDate={props.onSelectCallBackEndTime}
              isUnix
              selectedDate={props.callBackEndTime}
            />
            <FilterRowDate
              title={'Thi xếp lớp (bắt đầu)'}
              onSelectDate={props.onSelectMockExamStartTime}
              isUnix
              selectedDate={props.mockExamStartTime}
            />
            <FilterRowDate
              title={'Thi xếp lớp (kết thúc)'}
              onSelectDate={props.onSelectMockExamEndTime}
              isUnix
              selectedDate={props.mockExamEndTime}
            />
            <SubmitButton
              title={'Áp dụng'}
              onPress={() => {
                props.onRefresh();
                props.closeModal();
              }}
              containerStyle={styles.submit}
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
    height: height - 140,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: theme.mainHorizontal,
  },
  submit: {
    marginTop: 20,
  },
  reset: {
    height: 45,
    borderRadius: 24,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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

export default FilterLeadsModal;
