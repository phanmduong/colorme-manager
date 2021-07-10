import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import WorkShiftRegisterParticipatesModal from './WorkShiftRegisterParticipatesModal';
import theme from '../../styles';
import {displayUnixDate, getValidUrl, isValidUrl} from '../../helper';
import ImagePlaceholder from '../common/ImagePlaceholder';

class WorkShiftRegisterItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isVisible: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.shift === this.props.shift) {
      return nextState.isVisible !== this.state.isVisible;
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
    for (let user of this.props.participates) {
      if (user.id === this.props.user.id) {
        return true;
      }
    }
    return false;
  };

  processAuthorName = (name) => {
    let processed = name.trim().replace('\t\t', '');
    processed = processed.split(' ').splice(-2).join(' ');
    return processed;
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
            !this.props.permissions.unsubscribe
              ? () => null
              : () => this.props.onUnregister(this.props.shiftId)
          }>
          <View
            style={
              !this.props.permissions.unsubscribe
                ? styles.registerLock
                : styles.register
            }>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {isValidUrl(this.props.user.avatar_url) ? (
                <Image
                  style={styles.registeredAvatar}
                  source={{uri: getValidUrl(this.props.user.avatar_url)}}
                />
              ) : (
                <ImagePlaceholder avatarStyle={styles.registeredAvatar} />
              )}
              <Text style={styles.textRegisteredByUser}>
                {this.props.errorUnregistering
                  ? 'Hủy đăng ký thất bất. Thử lại?'
                  : this.processAuthorName(this.props.user.name)}
              </Text>
            </View>
            <TouchableOpacity onPress={this.toggleModal}>
              <View style={styles.row}>
                {this.props.participates.slice(0, 2).map((participate) => {
                  return isValidUrl(participate.avatar_url) ? (
                    <Image
                      style={styles.participatesAvatar}
                      source={{uri: getValidUrl(participate.avatar_url)}}
                    />
                  ) : (
                    <ImagePlaceholder avatarStyle={styles.participatesAvatar} />
                  );
                })}
                {this.props.participates.length > 2 && (
                  <View style={styles.numberContainer}>
                    <Text style={styles.numberParticipate}>
                      +{this.props.participates.length - 2}
                    </Text>
                  </View>
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
              displayUnixDate(this.props.start_time, 'time') +
              ' - ' +
              displayUnixDate(this.props.end_time, 'time')
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
            !this.props.permissions.subscribe
              ? () => null
              : () => this.props.onRegister(this.props.shiftId)
          }>
          <View
            style={
              !this.props.permissions.subscribe
                ? styles.availableLock
                : styles.available
            }>
            <Text style={styles.shiftText}>
              {this.props.errorRegistering
                ? 'Đăng ký thất bại. Thử lại?'
                : this.props.name +
                  ': ' +
                  displayUnixDate(this.props.start_time, 'time') +
                  ' - ' +
                  displayUnixDate(this.props.end_time, 'time')}
            </Text>
            <TouchableOpacity onPress={this.toggleModal}>
              <View style={styles.row}>
                {this.props.participates.slice(0, 2).map((participate) => {
                  return isValidUrl(participate.avatar_url) ? (
                    <Image
                      style={styles.participatesAvatar}
                      source={{uri: getValidUrl(participate.avatar_url)}}
                    />
                  ) : (
                    <ImagePlaceholder avatarStyle={styles.participatesAvatar} />
                  );
                })}
                {this.props.participates.length > 2 && (
                  <View style={styles.numberContainer}>
                    <Text style={styles.numberParticipate}>
                      +{this.props.participates.length - 2}
                    </Text>
                  </View>
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
              displayUnixDate(this.props.start_time, 'time') +
              ' - ' +
              displayUnixDate(this.props.end_time, 'time')
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
    backgroundColor: '#32CA41',
    borderRadius: 5,
    height: 40,
    marginVertical: 5,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  availableLock: {
    backgroundColor: '#32CA41',
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
    padding: 10,
  },
  participatesAvatar: {
    width: theme.miniAvatar.width,
    height: theme.miniAvatar.height,
    marginRight: 5,
    borderRadius: theme.miniAvatar.borderRadius,
  },
  numberParticipate: {
    fontSize: 12,
  },
  numberContainer: {
    borderRadius: 7,
    height: 14,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
  textRegisteredByUser: {
    textAlign: 'center',
    marginLeft: 10,
    color: 'white',
  },
  registeredAvatar: theme.shiftAvatar,
};

export default WorkShiftRegisterItem;
