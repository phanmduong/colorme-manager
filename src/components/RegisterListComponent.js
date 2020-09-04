import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  Image,
  RefreshControl,
  View,
  Text,
} from 'react-native';
import {List} from 'native-base';
import theme from '../styles';
import ListItemRegisterStudent from './registerList/ListItemRegisterStudent';
import Loading from './common/Loading';
import Search from './common/Search';
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';
import FilterModal from './infoStudent/FilterModal';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

var {height, width} = Dimensions.get('window');
class RegisterListComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filterModalVisible: false,
      salerId: this.props.salerId,
    };
  }

  toggleFilterModal = () => {
    this.setState({filterModalVisible: !this.state.filterModalVisible});
  };

  componentDidMount = () => {
    // this.props.navigation.addListener('didFocus', route => {
    //   this.props.autoFocus ? this.searchRegisterList.focus() : null;
    // });
    this.props.autoFocus ? this.searchRegisterList.focus() : () => null;
  };

  resetModal = () => {
    this.setState({filterModalVisible: false});
    setTimeout(() => {
      this.setState({filterModalVisible: true});
    }, 700);
  };

  renderSearch() {
    const {updateFormAndLoadDataSearch, search} = this.props;
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Search
          placeholder="Tìm kiếm (Email, tên, số điện thoại)"
          onChangeText={updateFormAndLoadDataSearch}
          value={search}
          refer={(input) => {
            this.searchRegisterList = input;
          }}
          extraStyle={{width: width - (theme.mainHorizontal * 2 + 40 + 10)}}
          extraInputStyle={{
            width: width - (theme.mainHorizontal * 2 + 40 + 10) - 48,
          }}
          onBlur={() => this.props.setAutoFocusRegisterListSearch(false)}
        />
        <TouchableOpacity onPress={this.toggleFilterModal}>
          <View style={styles.filterContainer}>
            <Image
              source={require('../../assets/img/icons8-sorting_options_filled.png')}
              style={{width: 18, height: 18}}
            />
          </View>
        </TouchableOpacity>
        <FilterModal
          isVisible={this.state.filterModalVisible}
          closeModal={this.toggleFilterModal}
          onRefresh={this.props.onRefresh}
          user={this.props.user}
          baseData={this.props.baseData}
          onSelectBaseId={this.props.onSelectBaseId}
          onSelectSalerId={this.props.onSelectSalerId}
          selectedBaseId={this.props.selectedBaseId}
          salerId={this.props.salerId}
          campaigns={this.props.campaigns}
          onSelectCampaignId={this.props.onSelectCampaignId}
          campaignId={this.props.campaignId}
          onSelectPaidStatus={this.props.onSelectPaidStatus}
          paidStatus={this.props.paidStatus}
          onSelectClassStatus={this.props.onSelectClassStatus}
          classStatus={this.props.classStatus}
          onSelectCallStatus={this.props.onSelectCallStatus}
          callStatus={this.props.callStatus}
          onSelectBookmark={this.props.onSelectBookmark}
          bookmark={this.props.bookmark}
          onSelectStartTime={this.props.onSelectStartTime}
          start_time={this.props.start_time}
          onSelectEndTime={this.props.onSelectEndTime}
          end_time={this.props.end_time}
          appointmentPayment={this.props.appointmentPayment}
          onSelectAppointmentPayment={this.props.onSelectAppointmentPayment}
          onSelectStatus={this.props.onSelectStatus}
          statuses={this.props.statuses}
          statusId={this.props.statusId}
          onSelectSource={this.props.onSelectSource}
          sources={this.props.sources}
          sourceId={this.props.sourceId}
          reset={this.props.reset}
          resetModal={this.resetModal}
          salers={this.props.salers}
          isLoadingBase={this.props.isLoadingBase}
          isLoadingCampaigns={this.props.isLoadingCampaigns}
          isLoadingSources={this.props.isLoadingSources}
          isLoadingStatuses={this.props.isLoadingStatuses}
          isLoadingSalers={this.props.isLoadingSalers}
          genData={this.props.genData}
          selectedGenId={this.props.selectedGenId}
          isLoadingGen={this.props.isLoadingGen}
          onSelectGenId={this.props.onSelectGenId}
          currentGen={this.props.currentGen}
          classId={this.props.classId}
          isLoadingFilterClasses={this.props.isLoadingFilterClasses}
          filterClasses={this.props.filterClasses}
          onSelectClassId={this.props.onSelectClassId}
          reloadFilterClasses={this.props.reloadFilterClasses}
        />
      </View>
    );
  }

  renderTabs = () => {
    let salerLst = [
      {id: -1, name: 'Tất cả'},
      {id: this.props.user.id, name: 'Đơn của bạn'},
    ];
    return salerLst.map((saler) => (
      <TouchableOpacity
        onPress={() => {
          this.setState({salerId: saler.id});
          this.props.onSelectSalerId(saler.id);
          setTimeout(() => {
            this.props.onRefresh(this.props.search_coupon);
          }, 300);
        }}>
        <LinearGradient
          colors={
            this.state.salerId === saler.id
              ? ['#F6F6F6', '#F6F6F6']
              : ['white', 'white']
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.tag}>
          <Text style={{color: 'black'}}>{saler.name}</Text>
        </LinearGradient>
      </TouchableOpacity>
    ));
  };

  headerComponent = () => {
    return (
      <View style={{flex: 1}}>
        {/*<View style={styles.headerContainer}>*/}
        {/*  <View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
        {/*    <Icon*/}
        {/*      name={'chevron-left'}*/}
        {/*      size={33}*/}
        {/*      color={'black'}*/}
        {/*      onPress={() => this.props.navigation.goBack()}*/}
        {/*    />*/}
        {/*    /!*<TouchableOpacity*!/*/}
        {/*    /!*  onPress={() => this.props.navigation.navigate('Profile')}>*!/*/}
        {/*    /!*  <Image*!/*/}
        {/*    /!*    source={{uri: this.props.user.avatar_url}}*!/*/}
        {/*    /!*    style={styles.headerAva}*!/*/}
        {/*    /!*  />*!/*/}
        {/*    /!*</TouchableOpacity>*!/*/}
        {/*    <Text style={styles.headerTitle}>Học viên</Text>*/}
        {/*  </View>*/}
        {/*  <View style={{flexDirection: 'row'}}>*/}
        {/*    <TouchableOpacity*/}
        {/*      onPress={() => this.props.navigation.navigate('SaveRegister')}>*/}
        {/*      <View style={styles.headerIconContainer}>*/}
        {/*        <MatIcon name={'add-circle'} size={20} color={'black'} />*/}
        {/*      </View>*/}
        {/*    </TouchableOpacity>*/}
        {/*  </View>*/}
        {/*</View>*/}
        {this.renderSearch()}
        <View style={styles.containerTag}>{this.renderTabs()}</View>
      </View>
    );
  };

  renderContent() {
    return (
      <List
        style={styles.list}
        onEndReached={this.props.loadDataRegisterList}
        dataArray={this.props.registerList}
        contentContainerStyle={{flexGrow: 1}}
        ListHeaderComponent={this.headerComponent}
        ListEmptyComponent={
          this.props.isLoading ? (
            this.props.refreshing ? (
              <View />
            ) : (
              <Loading size={width / 8} />
            )
          ) : (
            <View style={styles.container}>
              <Text style={{color: theme.dangerColor, fontSize: 16}}>
                Không có kết quả
              </Text>
            </View>
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={() => this.props.onRefresh(this.props.search_coupon)}
          />
        }
        renderRow={(item, sectionID, rowID) => (
          <ListItemRegisterStudent
            {...this.props}
            key={item.id}
            name={item.name}
            avatar={item.course_avatar_url}
            email={item.email}
            phone={item.phone}
            saler={item.saler}
            campaign={item.campaign}
            source={item.source}
            register_status={item.register_status}
            callStatus={item.call_status}
            paidStatus={item.paid_status}
            money={item.money}
            studentId={item.student_id}
            setStudentId={this.props.setStudentId}
            avatar_url={item.avatar_url}
            classInfo={item.class}
            token={this.props.token}
            next_code={item.next_code}
            next_waiting_code={item.next_waiting_code}
            created_at_cal={item.created_at_cal}
            registerId={item.id}
            errorChangeCallStatus={this.props.errorChangeCallStatus}
            errorSubmitMoney={this.props.errorSubmitMoney}
            changeCallStatus={this.props.changeCallStatus}
            submitMoney={this.props.submitMoney}
            paidTime={item.paid_time}
          />
        )}
      />
    );
  }

  render() {
    return (
      <View
      // style={
      //   isIphoneX()
      //     ? {flex: 1, marginTop: getStatusBarHeight() + 10}
      //     : {flex: 1, marginTop: 20}
      // }
      >
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: '#d9534f',
    textAlign: 'center',
  },
  dotStyle: {
    opacity: 0.4,
    width: 5,
    height: 5,
  },
  loading: {
    height: 95,
  },
  containerTag: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 5,
    marginHorizontal: theme.mainHorizontal,
  },
  tag: {
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    marginHorizontal: theme.mainHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginVertical: 5,
  },
  headerTitle: theme.header,
  headerAva: theme.mainAvatar,
  filterContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 10,
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

export default RegisterListComponent;
