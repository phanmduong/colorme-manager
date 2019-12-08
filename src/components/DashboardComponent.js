/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {View, Dimensions, ScrollView, RefreshControl} from 'react-native';
var {height, width} = Dimensions.get('window');
import CardMenu from '../containers/dashboard/CardMenu';
import CircleTab from '../containers/dashboard/CircleTab';
import MeetingComponent from '../containers/meeting/MeetingComponent';
import theme from '../styles';

class DashboardComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleRefresh = () => {
    this.props.store.refreshMeetingDetail();
  };

  render() {
    const {refreshing} = this.props.store;
    return (
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
          <View style={styles.mainFeatureLine}>
            <CardMenu
              colorOne={'#E26800'}
              colorTwo={'#E2DC50'}
              checkInOutStyle={styles.checkInContainer}
              standOutFontSize={{fontSize: 17}}
              imageSource={require('../../assets/img/MiM-check-in.png')}
              imageWidth={(Dimensions.get('window').width - 32) * 0.38}
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
              imageWidth={(Dimensions.get('window').width - 32) * 0.3 * 0.7}
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
              imageWidth={(Dimensions.get('window').width - 32) * 0.26 * 0.9}
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
              iconImage={require('../../assets/img/icons8-time-card-90.png')}
              title={'ĐK làm việc'}
              onPress={() => {
                this.props.navigation.navigate('WorkShiftRegister');
              }}
            />
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
          </View>
          <View style={styles.otherFeatureLine}>
            <CircleTab
              iconImage={require('../../assets/img/icons8-writer_male.png')}
              title={'Tạo đăng ký'}
              onPress={() => {
                this.props.navigation.navigate('SaveRegister');
              }}
            />
            <CircleTab
              iconImage={require('../../assets/img/icons8-scholarship.png')}
              title={'Học viên'}
              onPress={() => {
                this.props.navigation.navigate('RegisterList');
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
};

export default DashboardComponent;
