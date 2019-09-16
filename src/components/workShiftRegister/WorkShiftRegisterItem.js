import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import WorkShiftRegisterParticipatesModal from './WorkShiftRegisterParticipatesModal';
import _ from 'lodash';

class WorkShiftRegisterItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isVisible: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.shift === this.props.shift) {
      if (nextState.isVisible !== this.state.isVisible) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  }

  toggleModal = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  shiftRegistered = () => {
    for (let i = 0; i < this.props.participates.length; i++) {
      if (this.props.user.id === this.props.participates[i].id) {
        return true;
      }
    }
    return false;
  };

  render() {
    if (this.props.isRegistering) {
      return (
        <View full style={styles.available}>
          <Text style={styles.shiftText}>Đang đăng kí lịch làm việc...</Text>
        </View>
      );
    } else if (this.props.isUnregistering) {
      return (
        <View full style={styles.register}>
          <Text style={styles.shiftText}>Đang hủy lịch làm việc...</Text>
        </View>
      );
    } else if (this.shiftRegistered()) {
      return (
        <TouchableOpacity
          onPress={
            this.props.disable
              ? () => null
              : () => this.props.onUnregister(this.props.shiftId)
          }>
          <View
            style={this.props.disable ? styles.registerLock : styles.register}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.registeredAvatar}
                source={{uri: this.props.user.avatar_url}}
              />
              <Text style={styles.textRegisteredByUser}>
                {this.props.errorUnregistering
                  ? 'Hủy đăng ký thất bất. Thử lại?'
                  : this.props.user.name}
              </Text>
            </View>
            <TouchableOpacity onPress={this.toggleModal}>
              <View style={styles.row}>
                {this.props.participates.slice(0, 2).map(participate => {
                  return (
                    <Image
                      style={styles.participatesAvatar}
                      source={{uri: participate.avatar_url}}
                    />
                  );
                })}
                {this.props.participates.length > 2 && (
                  <Text style={styles.numberParticipate}>
                    +{this.props.participates.length - 2}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <WorkShiftRegisterParticipatesModal
            isVisible={this.state.isVisible}
            closeModal={this.toggleModal}
            shift={
              this.props.name +
              ': ' +
              this.props.start_time +
              ' - ' +
              this.props.end_time
            }
            participates={this.props.participates}
            date={this.props.date}
          />
        </TouchableOpacity>
      );
    } else if (!this.shiftRegistered()) {
      return (
        <TouchableOpacity
          onPress={
            this.props.disable
              ? () => null
              : () => this.props.onRegister(this.props.shiftId)
          }>
          <View
            style={
              this.props.disable ? styles.availableLock : styles.available
            }>
            <Text style={styles.shiftText}>
              {this.props.errorRegistering
                ? 'Đăng ký thất bại. Thử lại?'
                : this.props.name +
                  ': ' +
                  this.props.start_time +
                  ' - ' +
                  this.props.end_time}
            </Text>
            <TouchableOpacity onPress={this.toggleModal}>
              <View style={styles.row}>
                {this.props.participates.slice(0, 2).map(participate => {
                  return (
                    <Image
                      style={styles.participatesAvatar}
                      source={{uri: participate.avatar_url}}
                    />
                  );
                })}
                {this.props.participates.length > 2 && (
                  <Text style={styles.numberParticipate}>
                    +{this.props.participates.length - 2}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <WorkShiftRegisterParticipatesModal
            isVisible={this.state.isVisible}
            closeModal={this.toggleModal}
            shift={
              this.props.name +
              ': ' +
              this.props.start_time +
              ' - ' +
              this.props.end_time
            }
            participates={this.props.participates}
            date={this.props.date}
          />
        </TouchableOpacity>
      );
    }
  }
}

const styles = {
  available: {
    backgroundColor: '#00B241',
    borderRadius: 5,
    height: 40,
    marginVertical: 5,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  availableLock: {
    backgroundColor: '#00B241',
    borderRadius: 5,
    height: 40,
    marginVertical: 5,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    opacity: 0.7,
  },
  register: {
    backgroundColor: '#F44336',
    borderRadius: 5,
    height: 40,
    marginVertical: 5,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  registerLock: {
    backgroundColor: '#F44336',
    borderRadius: 5,
    height: 40,
    marginVertical: 5,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    opacity: 0.7,
  },
  shiftText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participatesAvatar: {
    width: 14,
    height: 14,
    marginRight: 5,
    borderRadius: 7,
  },
  numberParticipate: {
    borderRadius: 7,
    height: 14,
    alignItems: 'center',
    backgroundColor: 'white',
    fontSize: 12,
    paddingHorizontal: 5,
  },
  textRegisteredByUser: {
    textAlign: 'center',
    marginLeft: 10,
    color: 'white',
  },
  registeredAvatar: {
    width: 25,
    height: 25,
    borderRadius: 15,
  },
};

export default WorkShiftRegisterItem;
