import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';
import {getBottomSpace} from 'react-native-iphone-x-helper';

const LegendsModal = ({isVisible, closeModal, legends, hasHexColor}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      style={styles.modalContainer}>
      <View style={styles.modal}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Chú thích</Text>
          </View>
          {legends.map((legend) => (
            <View style={styles.row}>
              <View
                style={[
                  styles.legendDot,
                  {
                    backgroundColor: legend.color
                      ? hasHexColor
                        ? legend.color
                        : `#${legend.color}`
                      : '#DDDDDD',
                  },
                ]}
              />
              <Text style={styles.legendName}>{legend.name}</Text>
            </View>
          ))}
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
    height: 550,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: theme.mainHorizontal,
  },
  legendDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  legendName: {
    fontSize: 16,
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },
};

export default LegendsModal;
