import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  RefreshControl,
} from 'react-native';
import {isEmptyInput} from '../helper';
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
import AsyncStorage from '@react-native-community/async-storage';
import * as alert from '../constants/alert';
import ImagePicker from 'react-native-image-picker';
var {width, height} = Dimensions.get('window');

export const MARITAL = [
  {
    id: 0,
    name: '',
  },
  {
    id: 1,
    name: 'Chưa kết hôn',
  },
  {
    id: 2,
    name: 'Đã kết hôn',
  },
];

export const LITERACY = [
  {
    id: 0,
    name: '',
  },
  {
    id: 1,
    name: 'Đại học',
  },
  {
    id: 2,
    name: 'Cao đẳng',
  },
];

class ProfileComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  getItemName = (itemId, array) => {
    for (let item of array) {
      if (item.id === itemId) {
        return item.name;
      }
    }
    return '';
  };

  async clearAll(navigation) {
    const keys = ['@ColorME:username', '@ColorME:password'];
    try {
      await AsyncStorage.multiRemove(keys);
      navigation.navigate('Login');
    } catch (error) {
      alert(error);
    }
  }

  changeAvatar = () => {
    const options = {};
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        let imageUri = response.uri;
        this.props.changeAvatar(imageUri);
        if (this.props.errorChangingAvatar) {
          Alert.alert('Thông báo', 'Có lỗi xảy ra');
        }
      }
    });
  };

  render() {
    if (!this.props.isLoadingProfile && !isEmptyInput(this.props.profile)) {
      return (
        <ScrollView
          style={{marginHorizontal: 16}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isLoadingProfile}
              onRefresh={() => this.props.onRefresh()}
              titleColor={theme.mainColor}
              title="Đang tải..."
              tintColor="#d9534f"
              colors={['#d9534f']}
            />
          }>
          <View style={{alignItems: 'center', paddingTop: 30}}>
            {!this.props.isChangingAvatar ? (
              <TouchableOpacity onPress={() => this.changeAvatar()}>
                {!isEmptyInput(this.props.avatar_url) ? (
                  <Image
                    source={{uri: this.props.avatar_url}}
                    style={{width: 100, height: 100, borderRadius: 50}}
                  />
                ) : (
                  <Image
                    source={require('../../assets/img/icons8-male-user-96.png')}
                    style={{width: 100, height: 100, borderRadius: 50}}
                  />
                )}
              </TouchableOpacity>
            ) : (
              <View style={{flex: 1}}>
                <View style={styles.container}>
                  <Spinkit
                    isVisible
                    color={theme.mainColor}
                    type="Wave"
                    size={width / 8}
                  />
                </View>
              </View>
            )}
            <View style={{marginTop: 25}}>
              <Text style={{fontSize: 16}}>{this.props.profile.name}</Text>
            </View>
            <Text style={{marginTop: 10, fontSize: 16, color: '#707070'}}>
              {!isEmptyInput(this.props.profile.current_role) &&
              !isEmptyInput(this.props.profile.current_role.role_title)
                ? this.props.profile.current_role.role_title
                : null}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: 25,
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('EditProfile')}>
              <View style={[styles.editButton, {marginRight: 10}]}>
                <Text style={{fontSize: 16}}>Chỉnh sửa</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.clearAll(this.props.navigation)}>
              <View style={styles.editButton}>
                <Text style={{fontSize: 16}}>Đăng xuất</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 25}}>
            <Text style={{fontSize: 16}}>Tên đăng nhập</Text>
            <Text
              numberOfLines={1}
              style={{paddingTop: 8, fontSize: 16, fontWeight: '600'}}>
              {isEmptyInput(this.props.profile.username)
                ? 'Chưa có'
                : this.props.profile.username}
            </Text>
          </View>
          <View style={{marginTop: 25}}>
            <Text style={{fontSize: 16}}>Điện thoại</Text>
            <Text
              numberOfLines={1}
              style={{paddingTop: 8, fontSize: 16, fontWeight: '600'}}>
              {isEmptyInput(this.props.profile.phone)
                ? 'Chưa có'
                : this.props.profile.phone}
            </Text>
          </View>
          <View style={{marginTop: 25}}>
            <Text style={{fontSize: 16}}>Email</Text>
            <Text
              numberOfLines={1}
              style={{paddingTop: 8, fontSize: 16, fontWeight: '600'}}>
              {isEmptyInput(this.props.profile.email)
                ? 'Chưa có'
                : this.props.profile.email}
            </Text>
          </View>
          <View style={{marginTop: 25}}>
            <Text style={{fontSize: 16}}>Quê quán</Text>
            <Text
              numberOfLines={1}
              style={{paddingTop: 8, fontSize: 16, fontWeight: '600'}}>
              {isEmptyInput(this.props.profile.homeland)
                ? 'Chưa có'
                : this.props.profile.homeland}
            </Text>
          </View>
          <View style={{marginTop: 25}}>
            <Text style={{fontSize: 16}}>Tuổi</Text>
            <Text
              numberOfLines={1}
              style={{paddingTop: 8, fontSize: 16, fontWeight: '600'}}>
              {isEmptyInput(this.props.profile.age)
                ? 'Chưa có'
                : this.props.profile.age}
            </Text>
          </View>
          <View style={{marginTop: 25}}>
            <Text style={{fontSize: 16}}>Địa chỉ</Text>
            <Text
              numberOfLines={1}
              style={{paddingTop: 8, fontSize: 16, fontWeight: '600'}}>
              {isEmptyInput(this.props.profile.address)
                ? 'Chưa có'
                : this.props.profile.address}
            </Text>
          </View>
          <View style={{marginTop: 25}}>
            <Text style={{fontSize: 16}}>Hoạt động công ty từ</Text>
            <Text
              numberOfLines={1}
              style={{paddingTop: 8, fontSize: 16, fontWeight: '600'}}>
              {isEmptyInput(this.props.profile.start_company_vi)
                ? 'Chưa có'
                : this.props.profile.start_company_vi}
            </Text>
          </View>
          <View style={{marginTop: 25}}>
            <Text style={{fontSize: 16}}>Trình độ học vấn</Text>
            <Text
              numberOfLines={1}
              style={{paddingTop: 8, fontSize: 16, fontWeight: '600'}}>
              {isEmptyInput(this.props.profile.literacy)
                ? 'Chưa có'
                : this.getItemName(
                    parseInt(this.props.profile.literacy),
                    LITERACY,
                  )}
            </Text>
          </View>
          <View style={{marginTop: 25}}>
            <Text style={{fontSize: 16}}>Tình trạng hôn nhân</Text>
            <Text
              numberOfLines={1}
              style={{paddingTop: 8, fontSize: 16, fontWeight: '600'}}>
              {isEmptyInput(this.props.user.marital)
                ? 'Chưa có'
                : this.getItemName(this.props.user.marital, MARITAL)}
            </Text>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View style={styles.container}>
            <Spinkit
              isVisible
              color={theme.mainColor}
              type="Wave"
              size={width / 8}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = {
  editButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default ProfileComponent;
