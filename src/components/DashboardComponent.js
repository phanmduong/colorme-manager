/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'native-base';
var {height, width} = Dimensions.get('window');
import CardMenu from '../containers/dashboard/CardMenu';
import CircleTab from '../containers/dashboard/CircleTab';
import MeetingComponent from '../containers/meeting/MeetingComponent';
import theme from '../styles';
import AsyncStorage from '@react-native-community/async-storage';
import * as alert from '../constants/alert';
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/Ionicons';

class DashboardComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalVisible: false,
    };
  }

  handleRefresh = () => {
    this.props.store.refreshMeetingDetail();
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

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  render() {
    const {refreshing} = this.props.store;
    const {navigation} = this.props;
    return (
      <View
        style={
          isIphoneX()
            ? {flex: 1, marginTop: getStatusBarHeight() + 10}
            : {flex: 1, marginTop: 10}
        }>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.handleRefresh}
              titleColor={theme.mainColor}
              title="Đang tải..."
              tintColor="#d9534f"
              colors={['#d9534f']}
            />
          }>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.toggleModal()}>
                  <Image
                    source={{uri: this.props.avatar_url}}
                    style={styles.headerAva}
                  />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Trang chủ</Text>
              </View>
              <TouchableOpacity onPress={() => this.clearAll(navigation)}>
                <Image
                  source={require('../../assets/img/icons8-logout-rounded-up-100.png')}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('RegisterList', {
                  autoFocus: true,
                  isSubScreen: true,
                })
              }>
              <View style={styles.searchContainer}>
                <Icon
                  name={'ios-search'}
                  color={'black'}
                  size={20}
                  style={styles.searchIcon}
                />
                <Text style={styles.searchInput}>Tìm kiếm học viên</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.mainFeatureLine}>
              <CardMenu
                colorOne={'#E26800'}
                colorTwo={'#E2DC50'}
                checkInOutStyle={styles.checkInContainer}
                standOutFontSize={{fontSize: 17}}
                imageSource={require('../../assets/img/MiM-check-in.png')}
                imageWidth={(width - 32) * 0.38}
                title={'Check in'}
                characterImgPosition={styles.checkInCharacterImgPosition}
                onPress={() => {
                  this.props.navigation.navigate('CheckIn', {
                    title: 'Check in',
                    type: 'checkin',
                  });
                }}
              />
              <CardMenu
                colorOne={'#6800E2'}
                colorTwo={'#2F94EB'}
                checkInOutStyle={styles.checkOutContainer}
                imageSource={require('../../assets/img/MiM-check-out.png')}
                imageWidth={(width - 32) * 0.3 * 0.7}
                title={'Check out'}
                characterImgPosition={styles.checkOutCharacterImgPosition}
                onPress={() => {
                  this.props.navigation.navigate('CheckOut', {
                    title: 'Check out',
                    type: 'checkout',
                  });
                }}
              />
              <CardMenu
                colorOne={'#E20000'}
                colorTwo={'#E29950'}
                checkInOutStyle={styles.checkOutContainer}
                imageSource={require('../../assets/img/MiM-history.png')}
                imageWidth={(width - 32) * 0.26 * 0.9}
                title={'Lịch sử'}
                characterImgPosition={styles.historyCharacterImgPosition}
                onPress={() => {
                  this.props.navigation.navigate('HistoryAllAttendance');
                }}
              />
            </View>
            <View style={styles.otherFeatureLine}>
              <CircleTab
                iconImage={require('../../assets/img/icons8-ratings-90.png')}
                title={'Thống kê'}
                onPress={() => {
                  this.props.navigation.navigate('Analytics');
                }}
              />
              <CircleTab
                iconImage={require('../../assets/img/icons8-contact-100.png')}
                title={'Xác thực'}
                onPress={() => {
                  this.props.navigation.navigate('AccurateStudent');
                }}
              />
              <CircleTab
                iconImage={require('../../assets/img/icons8-idea-96-2.png')}
                title={'Họp'}
                onPress={() => {
                  this.props.navigation.navigate('Meeting');
                }}
              />
            </View>
            <View style={styles.otherFeatureLine}>
              <CircleTab
                iconImage={require('../../assets/img/icons8-rating-90.png')}
                title={'Đánh giá'}
                onPress={() => {
                  this.props.navigation.navigate('TeachingRating');
                }}
              />
              <CircleTab
                iconImage={require('../../assets/img/icons8-calendar.png')}
                title={'Lịch học bù'}
                onPress={() => {
                  this.props.navigation.navigate('MakeupClass');
                }}
              />
              <CircleTab
                iconImage={require('../../assets/img/icons8-writer_male.png')}
                title={'Tạo đăng ký'}
                onPress={() => {
                  this.props.navigation.navigate('SaveRegister');
                }}
              />
            </View>
            <View style={styles.otherFeatureLine}>
              <CircleTab
                iconImage={require('../../assets/img/icons8-cheap_2_filled.png')}
                title={'Nộp tiền'}
                onPress={() => {
                  this.props.navigation.navigate('CollectMoney');
                }}
              />
              <CircleTab
                iconImage={require('../../assets/img/icons8-wallet_filled.png')}
                title={'Chuyển tiền'}
                onPress={() => {
                  this.props.navigation.navigate('MoneyTransfer');
                }}
              />
              <View style={{width: width / 3}} />
            </View>
            <MeetingComponent
              store={this.props.store}
              {...this.props}
              mainScreen={true}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  mainFeatureLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  // 32 is the total left, right margin,
  // 0.40 is the relative ratio of container to screen width,
  // (178/139) is the ratio between height and width
  checkInContainer: {
    height: (Dimensions.get('window').width - 32) * 0.4 * (178 / 139),
    width: (Dimensions.get('window').width - 32) * 0.4,
    borderRadius: 10,
  },
  // 32 is the total left, right margin,
  // 0.26 is the relative ratio of container to screen width,
  // (178/139) is the ratio between height and width
  checkOutContainer: {
    height: (Dimensions.get('window').width - 32) * 0.26 * (178 / 139),
    width: (Dimensions.get('window').width - 32) * 0.26,
    borderRadius: 10,
  },
  // 32 is the total left, right margin,
  // 0.18, 0.08 is the relative ratio of image to screen width
  checkInCharacterImgPosition: {
    position: 'absolute',
    top: (Dimensions.get('window').width - 32) * 0.19,
    left: (Dimensions.get('window').width - 32) * 0.06,
  },
  // 32 is the total left, right margin,
  // 0.15, 0.09 is the relative ratio of image to screen width
  checkOutCharacterImgPosition: {
    position: 'absolute',
    top: (Dimensions.get('window').width - 32) * 0.15,
    left: (Dimensions.get('window').width - 32) * 0.07,
  },
  // 32 is the total left, right margin,
  // 0.14, 0.06 is the relative ratio of image to screen width
  historyCharacterImgPosition: {
    position: 'absolute',
    top: (Dimensions.get('window').width - 32) * 0.15,
    left: (Dimensions.get('window').width - 32) * 0.05,
  },
  otherFeatureLine: {
    flexDirection: 'row',
    marginTop: 30,
  },
  searchContainer: {
    backgroundColor: '#f6f6f6',
    height: 40,
    borderRadius: 27,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchIcon: {
    marginLeft: 14,
  },
  searchInput: {
    fontSize: 16,
    color: '#707070',
    marginLeft: 14,
  },
  headerContainer: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  headerTitle: {
    color: 'black',
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerAva: {
    width: 35,
    height: 35,
    borderRadius: 18,
  },
};

export default DashboardComponent;
