import React, {useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';
import InputPicker from '../common/InputPicker';
import Clipboard from '@react-native-community/clipboard';

function UTMFormModal({isVisible, closeModal, sources, campaigns, slug}) {
  const [sourceId, setSource] = useState('');
  const [campaignId, setCampaign] = useState('');

  function copyLink() {
    Clipboard.setString(
      `https://colorme.eduto.net/pages/registers/${slug}?campaign_id=${campaignId}&source_id=${sourceId}`,
    );
    Alert.alert('Thông báo', 'Copy link thành công');
  }

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}>
      <View style={styles.wrapper}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tạo URL với UTM</Text>
        </View>
        <InputPicker
          options={sources}
          title={'Nguồn'}
          header={'Chọn nguồn'}
          onChangeValue={setSource}
          selectedId={sourceId}
          placeholder={'Chọn nguồn'}
        />
        <InputPicker
          options={campaigns}
          title={'Chiến dịch'}
          header={'Chọn chiến dịch'}
          onChangeValue={setCampaign}
          selectedId={campaignId}
          placeholder={'Chọn chiến dịch'}
        />
        <TouchableOpacity
          onPress={() => {
            copyLink();
          }}>
          <View style={styles.submit}>
            <Text style={styles.submitTitle}>Sao chép</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeModal}>
          <View style={styles.cancelContainer}>
            <Text style={styles.cancelTitle}>Hủy</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = {
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  wrapper: {
    backgroundColor: 'white',
    height: 400,
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
  cancelContainer: {
    marginTop: 25,
    alignItems: 'center',
    paddingBottom: 30,
  },
  cancelTitle: {
    fontSize: 16,
    color: theme.mainColor,
  },
  submit: {
    height: 45,
    borderRadius: 24,
    backgroundColor: '#2ACC4C',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitTitle: {
    color: 'white',
    fontSize: 16,
  },
};

export default UTMFormModal;
