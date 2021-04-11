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
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {observer} from 'mobx-react';
import {getShortName} from '../helper';
import Loading from './common/Loading';

@observer
class DashboardComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleRefresh = () => {
    this.props.store.refreshMeetingDetail();
    this.props.refreshNotifications();
    this.props.refreshTasks();
  };

  getTotalNotCompletedTasks = () => {
    let totalNotCompleted = this.props.taskView.filter(
      (task) => task.status === 0,
    );
    return totalNotCompleted.length;
  };

  filterFeatureList = () => {
    let deepCopiedFeatureList = this.getFeatureList().slice(0);
    deepCopiedFeatureList = deepCopiedFeatureList.filter((feature) => {
      for (const tab of this.props.tabs) {
        if (feature.id === tab.url || feature.permission_all) {
          return true;
        }
      }
      return false;
    });
    let filteredFeatureList = [];
    while (deepCopiedFeatureList.length > 0) {
      filteredFeatureList.push(deepCopiedFeatureList.splice(0, 3));
    }
    return filteredFeatureList;
  };

  getFeatureList = () => {
    return [
      {
        id: 'dashboard/sale',
        element: (
          <CircleTab
            iconImage={require('../../assets/img/Group_1300.png')}
            title={'Thống kê'}
            backgroundColor={'#FFC5B8'}
            onPress={() => {
              this.props.navigation.navigate('Analytics');
            }}
          />
        ),
      },
      {
        id: '/kpi/list',
        element: (
          <CircleTab
            iconImage={require('../../assets/img/Group_1304.png')}
            title={'KPI'}
            backgroundColor={'#FFC5B8'}
            onPress={() => {
              this.props.navigation.navigate('KPI');
            }}
          />
        ),
      },
      {
        id: '/register/list',
        element: (
          <CircleTab
            iconImage={require('../../assets/img/Group_1311.png')}
            title={'Học viên'}
            backgroundColor={'#FFEEAF'}
            onPress={() => {
              this.props.navigation.navigate('RegisterList');
            }}
          />
        ),
      },
      {
        id: '/shift/manage/regis-shifts',
        element: (
          <CircleTab
            iconImage={require('../../assets/img/Group_1315.png')}
            title={'Đăng kí trực'}
            backgroundColor={'#FFC5B8'}
            onPress={() => {
              this.props.navigation.navigate('ShiftRegister');
            }}
          />
        ),
      },
      {
        id: '',
        element: (
          <CircleTab
            iconImage={require('../../assets/img/Group_1302.png')}
            title={'Họp'}
            backgroundColor={'#FFEEAF'}
            onPress={() => {
              this.props.navigation.navigate('Meeting');
            }}
          />
        ),
        permission_all: true,
      },
      {
        id: 'teaching/evaluate',
        element: (
          <CircleTab
            iconImage={require('../../assets/img/Group_1301.png')}
            title={'Đánh giá'}
            backgroundColor={'#B2B3FF'}
            onPress={() => {
              this.props.navigation.navigate('TeachingRating');
            }}
          />
        ),
      },
      {
        id: '',
        element: (
          <CircleTab
            iconImage={require('../../assets/img/Group_1299.png')}
            title={'Lịch học bù'}
            backgroundColor={'#FFEEAF'}
            onPress={() => {
              this.props.navigation.navigate('MakeupClass');
            }}
          />
        ),
        permission_all: true,
      },
      {
        id: '',
        element: (
          <CircleTab
            iconImage={require('../../assets/img/Group_1303.png')}
            title={'Danh bạ nhân viên'}
            backgroundColor={'#B2B3FF'}
            onPress={() => {
              this.props.navigation.navigate('Staff');
            }}
          />
        ),
        permission_all: true,
      },
      // {
      //   id: 'finance/moneycollect',
      //   element: (
      //     <CircleTab
      //       iconImage={require('../../assets/img/Group_1306.png')}
      //       title={'Nộp tiền'}
      //       backgroundColor={'#B2B3FF'}
      //       onPress={() => {
      //         this.props.navigation.navigate('CollectMoney');
      //       }}
      //     />
      //   ),
      // },
      {
        id: 'finance/sendmoney',
        element: (
          <CircleTab
            iconImage={require('../../assets/img/Group_1310.png')}
            title={'Chuyển tiền'}
            backgroundColor={'#B2B3FF'}
            onPress={() => {
              this.props.navigation.navigate('MoneyTransfer');
            }}
          />
        ),
      },
      {
        id: 'teaching/classes',
        element: (
          <CircleTab
            iconImage={require('../../assets/img/Group_1307.png')}
            title={'Lớp học'}
            backgroundColor={'#FFEEAF'}
            onPress={() => {
              this.props.navigation.navigate('Class', {
                analyticsScreen: false,
              });
            }}
          />
        ),
      },
      {
        id: '/lead/list',
        element: (
          <CircleTab
            iconImage={require('../../assets/img/Group_1311.png')}
            title={'Leads'}
            backgroundColor={'#FFEEAF'}
            onPress={() => {
              this.props.navigation.navigate('Leads');
            }}
          />
        ),
      },
      {
        id: '',
        element: (
          <CircleTab
            iconImage={require('../../assets/img/Group_1308.png')}
            title={'Tài liệu'}
            backgroundColor={'#FFC5B8'}
            onPress={() => {
              this.props.navigation.navigate('Document');
            }}
          />
        ),
        permission_all: true,
      },
      {
        id: 'dashboard/checkin-checkout',
        element: (
          <CircleTab
            iconImage={require('../../assets/img/Group_1309.png')}
            title={'Chấm công'}
            backgroundColor={'#FFEEAF'}
            onPress={() => {
              this.props.navigation.navigate('ClockManage');
            }}
          />
        ),
      },
      {
        id: 'teaching/teaching-schedule',
        element: (
          <CircleTab
            iconImage={require('../../assets/img/Group_1299.png')}
            title={'Lịch dạy'}
            backgroundColor={'#FFEEAF'}
            onPress={() => {
              this.props.navigation.navigate('TeachingSchedule');
            }}
          />
        ),
      },
      {
        id: '/register-form/list',
        element: (
          <CircleTab
            iconImage={require('../../assets/img/Group_1257.png')}
            title={'Form đăng kí'}
            backgroundColor={'#B2B3FF'}
            onPress={() => {
              this.props.navigation.navigate('Form');
            }}
          />
        ),
      },
      {
        id: 'teaching/courses',
        element: (
          <CircleTab
            iconImage={require('../../assets/img/Group_1248.png')}
            title={'Môn học'}
            backgroundColor={'#FFC5B8'}
            onPress={() => {
              this.props.navigation.navigate('Course');
            }}
          />
        ),
      },
    ];
  };

  render() {
    const {refreshing} = this.props.store;
    const {isRefreshingNotifications, isLoadingTaskView} = this.props;
    return (
      <ScrollView
        style={
          isIphoneX()
            ? {flex: 1, marginTop: getStatusBarHeight() + 10}
            : {flex: 1, marginTop: 20}
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={
              refreshing || isRefreshingNotifications || isLoadingTaskView
            }
            onRefresh={this.handleRefresh}
          />
        }>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile')}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{uri: this.props.avatar_url}}
                  style={styles.headerAva}
                />

                <Text style={styles.headerTitle}>
                  {getShortName(this.props.user.name)}
                </Text>
                {this.props.user.role === 2 ? (
                  <Image
                    source={require('../../assets/img/icons8-star-100-filled.png')}
                    style={{
                      width: 18,
                      height: 18,
                      marginLeft: 5,
                    }}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Task')}>
                <View style={[styles.headerIconContainer, {marginRight: 10}]}>
                  <MatIcon
                    name={'chrome-reader-mode'}
                    size={20}
                    color={'black'}
                  />
                </View>
                {this.getTotalNotCompletedTasks() > 0 ? (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationNumber}>
                      {this.getTotalNotCompletedTasks()}
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Notification')}>
                <View style={styles.headerIconContainer}>
                  <MatIcon name={'notifications'} size={20} color={'black'} />
                </View>
                {this.props.unread > 0 ? (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationNumber}>
                      {this.props.unread}
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.setAutoFocusRegisterListSearch(true);
              this.props.navigation.navigate('RegisterList');
            }}>
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
              colorOne={'#FEC9BC'}
              colorTwo={'#FEC9BC'}
              imageSource={require('../../assets/img/Checkin_Lighter.png')}
              title={'Check in'}
              onPress={() => {
                this.props.navigation.navigate('CheckIn', {
                  title: 'Check in',
                  type: 'checkin',
                });
              }}
            />
            <CardMenu
              colorOne={'#FEC9BC'}
              colorTwo={'#FEC9BC'}
              imageSource={require('../../assets/img/Checkinout_Lighter.png')}
              title={'Check out'}
              onPress={() => {
                this.props.navigation.navigate('CheckOut', {
                  title: 'Check out',
                  type: 'checkout',
                });
              }}
            />
            <CardMenu
              colorOne={'#FEC9BC'}
              colorTwo={'#FEC9BC'}
              imageSource={require('../../assets/img/History_Lighter.png')}
              title={'Lịch sử'}
              onPress={() => {
                this.props.navigation.navigate('HistoryAllAttendance');
              }}
            />
          </View>
          {this.props.isLoadingTabs ? (
            <Loading size={width / 8} />
          ) : (
            this.filterFeatureList().map((featureGroup) => (
              <View style={styles.otherFeatureLine}>
                {featureGroup.map((feature) => {
                  return feature.element;
                })}
              </View>
            ))
          )}
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
    marginHorizontal: theme.mainHorizontal,
  },
  otherFeatureLine: {
    flexDirection: 'row',
    marginTop: 30,
  },
  searchContainer: {
    backgroundColor: '#f6f6f6',
    height: 40,
    borderRadius: 27,
    marginHorizontal: theme.mainHorizontal,
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
    marginHorizontal: theme.mainHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  headerTitle: {
    color: theme.mainTextColor,
    fontSize: theme.header.fontSize,
    fontWeight: theme.header.fontWeight,
    marginLeft: 10,
  },
  headerAva: theme.mainAvatar,
  notificationBadge: {
    position: 'absolute',
    top: -8,
    left: 20,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: theme.secondColor,
  },
  notificationNumber: {
    fontSize: 9,
    color: 'white',
    fontWeight: '600',
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
};

export default DashboardComponent;
