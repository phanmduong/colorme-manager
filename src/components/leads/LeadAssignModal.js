import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';
import TagItem from '../common/TagItem';
import SubmitButton from '../common/SubmitButton';
import {isEmptyInput} from '../../helper';
import InputPicker from '../common/InputPicker';
import {RATE} from '../../constants/constant';

const LeadAssignModal = ({
  isVisible,
  closeModal,
  name,
  source,
  sources,
  campaign,
  campaigns,
  status,
  statuses,
  pic,
  staff,
  changeTags,
  lead_id,
  loadStaff,
  rate,
}) => {
  const [campaignId, setCampaignId] = useState(null);
  const [sourceId, setSourceId] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [creatorId, setCreatorId] = useState(null);
  const [star, setRate] = useState(null);

  useEffect(() => {
    setCampaignId(campaign ? campaign.id : null);
    setSourceId(source ? source.id : null);
    setStatusId(!isEmptyInput(status) ? status.id : null);
    setCreatorId(pic ? pic.id : null);
    setRate(rate ? rate : null);
  }, []);

  const applyTagChange = () => {
    changeTags(lead_id, campaignId, sourceId, statusId, creatorId, star);
  };

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalContainer}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}>
      <View style={styles.modal}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Chỉnh sửa tag</Text>
            <Text style={styles.subTitle}>Học viên {name}</Text>
          </View>
          <TagItem
            title={'P.I.C'}
            placeholder={'No P.I.C'}
            defaultValue={pic ? pic.id : null}
            options={staff}
            hasHashInHexColor={false}
            onValueChange={(value) => setCreatorId(value.id)}
            externalSearch={(search) => loadStaff(search)}
          />
          <TagItem
            title={'Nguồn'}
            placeholder={'No Source'}
            defaultValue={source ? source.id : null}
            options={sources}
            hasHashInHexColor={true}
            onValueChange={(value) => setSourceId(value.id)}
          />
          <TagItem
            title={'Chiến dịch'}
            placeholder={'No Campaign'}
            defaultValue={campaign ? campaign.id : null}
            options={campaigns}
            hasHashInHexColor={true}
            onValueChange={(value) => setCampaignId(value.id)}
          />
          <TagItem
            title={'Trạng thái'}
            placeholder={'No status'}
            defaultValue={!isEmptyInput(status) ? status.id : null}
            options={statuses}
            hasHashInHexColor={true}
            onValueChange={(value) => setStatusId(value.id)}
          />
          <InputPicker
            title={'Chọn sao'}
            header={'Chọn sao'}
            options={RATE}
            onChangeValue={setRate}
            selectedId={star}
          />
          <SubmitButton
            containerStyle={styles.submitButton}
            onPress={() => {
              applyTagChange();
              closeModal();
            }}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: 'white',
    height: 530,
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
  subTitle: {
    fontSize: 16,
    paddingTop: 5,
  },
  submitButton: {
    borderRadius: 8,
    marginVertical: 30,
  },
};

export default LeadAssignModal;
