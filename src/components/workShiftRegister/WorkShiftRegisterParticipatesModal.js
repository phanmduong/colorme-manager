import React from 'react';
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
var {height, width} = Dimensions.get('window');

class WorkShiftRegisterParticipatesModal extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Modal
        style={styles.fullModal}
        isVisible={this.props.isVisible}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}>
        <View style={styles.fullView}>
          <View style={styles.headerRow}>
            <View>
              <Text
                style={[styles.headerTitle, {fontWeight: '600', fontSize: 17}]}>
                {this.props.date}
              </Text>
              <Text style={[styles.headerTitle, {marginTop: 5}]}>
                {this.props.shift}
              </Text>
            </View>
            <TouchableWithoutFeedback onPress={this.props.closeModal}>
              <Image
                source={require('../../../assets/img/closeIcon.png')}
                style={styles.closeIcon}
              />
            </TouchableWithoutFeedback>
          </View>
          <ScrollView>
            {this.props.participates.map(participate => {
              return (
                <View style={styles.containerItem}>
                  <View style={styles.containerPerson}>
                    <Image
                      source={{uri: participate.avatar_url}}
                      style={styles.avatar}
                    />
                    <View>
                      <Text style={styles.name}>{participate.name}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = {
  fullModal: {
    marginVertical: height * 0.15,
  },
  fullView: {
    flexGrow: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 15,
  },
  headerTitle: {
    fontSize: 15,
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  containerPerson: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  name: {
    fontWeight: '600',
    fontSize: 15,
  },
};

export default WorkShiftRegisterParticipatesModal;
