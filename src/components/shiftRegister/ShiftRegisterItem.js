import React from 'react';
import {Image, TouchableOpacity, Linking} from 'react-native';
import {View, Text, Button} from 'native-base';
import _ from 'lodash';

class ShiftRegisterItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.shift, this.props.shift);
  }

  render() {
    var {shift, onRegister, onUnRegister, user} = this.props;
    if (shift.isLoadingRegister) {
      return (
        <View full style={styles.register}>
          <Text style={styles.textRegister}>Đang đăng kí lịch trực...</Text>
        </View>
      );
    } else if (shift.isLoadingUnRegister) {
      return (
        <View full style={styles.registeredByUser}>
          <Text style={styles.textRegisteredByUser}>Đang hủy lịch trực...</Text>
        </View>
      );
    } else if (shift.user) {
      if (shift.user.id === user.id) {
        return (
          <TouchableOpacity
            style={styles.registeredByUser}
            onPress={() => onUnRegister(shift.id)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.avatar}
                source={{uri: shift.user.avatar_url}}
              />
              <Text style={styles.textRegisteredByUser}>
                {shift.isLoadingUnRegisterError
                  ? 'Hủy đăng kí thất bại. Thử lại.'
                  : shift.user.name}
              </Text>
            </View>
            <Text style={{fontWeight: 'bold', color: 'white'}}>Hủy</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${shift.user.phone}`)}>
            <View style={styles.registered}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={styles.avatar}
                  source={{uri: shift.user.avatar_url}}
                />
                <Text style={styles.textRegistered}>{shift.user.name}</Text>
              </View>
              <Text style={{fontWeight: 'bold'}}>Gọi</Text>
            </View>
          </TouchableOpacity>
        );
      }
    } else {
      return (
        <TouchableOpacity
          style={styles.register}
          onPress={() => onRegister(shift.id)}>
          <Text style={styles.textRegister}>
            {shift.isLoadingRegisterError
              ? 'Đăng kí thất bại. Thử lại.'
              : shift.name + ': ' + shift.start_time + ' - ' + shift.end_time}
          </Text>
          <Text style={{fontWeight: 'bold', color: 'white'}}>Đăng kí</Text>
        </TouchableOpacity>
      );
    }
  }
}

const styles = {
  register: {
    backgroundColor: '#00B241',
    marginVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  registered: {
    backgroundColor: '#F0F0F0',
    marginVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 40,
  },
  registeredByUser: {
    backgroundColor: '#FF2624',
    marginVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 40,
  },
  textRegister: {
    color: 'white',
    textAlign: 'center',
  },
  textRegistered: {
    textAlign: 'center',
    marginLeft: 10,
  },
  textRegisteredByUser: {
    textAlign: 'center',
    marginLeft: 10,
    color: 'white',
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 15,
  },
};

export default ShiftRegisterItem;
