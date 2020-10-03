import React from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';
import TagItem from '../common/TagItem';
import SubmitButton from '../common/SubmitButton';
import {isEmptyInput} from '../../helper';

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
  carer,
  staff,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalContainer}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}>
      <View style={styles.modal}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Chỉnh sửa tag</Text>
          <Text style={styles.subTitle}>Học viên {name}</Text>
        </View>
        <TagItem
          title={'P.I.C'}
          placeholder={'No P.I.C'}
          defaultValue={carer}
          options={staff}
          hasHashInHexColor={false}
        />
        <TagItem
          title={'Chiến dịch'}
          placeholder={'No Source'}
          defaultValue={campaign}
          options={campaigns}
          hasHashInHexColor={false}
        />
        <TagItem
          title={'Nguồn'}
          placeholder={'No Campaign'}
          defaultValue={source}
          options={sources}
          hasHashInHexColor={true}
        />
        <TagItem
          title={'Trạng thái'}
          placeholder={'No status'}
          defaultValue={!isEmptyInput(status) ? status : null}
          options={statuses}
          hasHashInHexColor={true}
        />
        <SubmitButton
          containerStyle={styles.submitButton}
          onPress={closeModal}
        />
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
    marginTop: 50,
  },
};

export default LeadAssignModal;
