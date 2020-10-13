import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';

const FilterKPIModal = ({isVisible, closeModal}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}>
      <View style={styles.wrapper}>

      </View>
    </Modal>
  );
};

const styles = {
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  wrapper: {
    backgroundColor: 'white',
    height: 550,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: theme.mainHorizontal,
  },
};

export default FilterKPIModal;
