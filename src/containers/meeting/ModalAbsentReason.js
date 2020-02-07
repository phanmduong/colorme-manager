import React from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {observer} from 'mobx-react';

@observer
class ModalAbsentReason extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  storeReason = () => {
    const {meetingId, store} = this.props;
    const {joinMeeting, reason} = store;
    if (reason !== '') {
      joinMeeting(meetingId, 'reject', reason);
      this.props.store.reason = '';
      this.props.closeModal();
    } else {
      Alert.alert('Thông báo', 'Bạn phải nhập lý do không tham gia');
    }
  };

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackButtonPress={this.props.closeModal}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}>
        <View style={styles.content}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.store.reason = '';
              this.props.closeModal();
            }}>
            <View style={styles.closeIconPosition}>
              <Image
                source={require('../../../assets/img/icons8-delete-96.png')}
                style={styles.closeIcon}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.contentTitle}>Lý do không tham gia</Text>
          <View style={styles.reasonContainer}>
            <TextInput
              style={styles.createReason}
              placeholder={'Nhập lý do'}
              value={this.props.store.reason.value}
              onChangeText={text => {
                this.props.store.reason = text;
              }}
              onSubmitEditing={() => {
                this.storeReason();
              }}
            />
            {this.props.store.reason !== '' ? (
              <TouchableOpacity onPress={() => this.storeReason()}>
                <Image
                  source={require('../../../assets/img/icons8-email-send-96-enabled.png')}
                  style={styles.sendIcon}
                />
              </TouchableOpacity>
            ) : (
              <View>
                <Image
                  source={require('../../../assets/img/icons8-email-send-96-disabled.png')}
                  style={styles.sendIcon}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 22,
    paddingBottom: 30,
    borderRadius: 6,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  createReason: {
    borderRadius: 20,
    height: 40,
    backgroundColor: '#ececec',
    paddingHorizontal: 20,
    color: '#363636',
    width: Dimensions.get('window').width - 110,
  },
  closeIconPosition: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  sendIcon: {
    width: 28,
    height: 28,
    marginLeft: 6,
  },
  reasonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default ModalAbsentReason;
