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
import FilterRegisterListModal from './infoStudent/FilterRegisterListModal';
import LinearGradient from 'react-native-linear-gradient';
const {width} = Dimensions.get('window');

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
    this.props.autoFocusRegisterListSearch
      ? this.searchRegisterList.focus()
      : () => null;
  };

  renderSearch() {
    const {updateFormAndLoadDataSearch, searchMy} = this.props;
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Search
          placeholder="Tìm kiếm (Email, tên, số điện thoại)"
          onChangeText={updateFormAndLoadDataSearch}
          value={searchMy}
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
        <FilterRegisterListModal
          {...this.props}
          isVisible={this.state.filterModalVisible}
          closeModal={this.toggleFilterModal}
          onRefresh={this.props.onRefresh}
          onSelectCampaignId={this.props.onSelectCampaignId}
          onSelectPaidStatus={this.props.onSelectPaidStatus}
          onSelectClassStatus={this.props.onSelectClassStatus}
          onSelectCallStatus={this.props.onSelectCallStatus}
          onSelectBookmark={this.props.onSelectBookmark}
          onSelectStartTime={this.props.onSelectStartTime}
          onSelectEndTime={this.props.onSelectEndTime}
          onSelectAppointmentPaymentStartTime={
            this.props.onSelectAppointmentPaymentStartTime
          }
          onSelectAppointmentPaymentEndTime={
            this.props.onSelectAppointmentPaymentEndTime
          }
          onSelectStatus={this.props.onSelectStatus}
          onSelectSource={this.props.onSelectSource}
          onSelectClassId={this.props.onSelectClassId}
          loadFilterClasses={this.props.loadFilterClasses}
          onSelectCourseId={this.props.onSelectCourseId}
          onSelectDateTest={this.props.onSelectDateTest}
          onSelectCallBackStartTime={this.props.onSelectCallBackStartTime}
          onSelectCallBackEndTime={this.props.onSelectCallBackEndTime}
          onSelectProvinceId={this.props.onSelectProvinceId}
          onSelectBaseId={this.props.onSelectBaseId}
          onSelectSalerId={this.props.onSelectSalerId}
          onSelectCouponId={this.props.onSelectCouponId}
          onChangeNote={this.props.onChangeNote}
        />
      </View>
    );
  }

  renderTabs = () => {
    let salerLst = [
      {id: '', name: 'Tất cả'},
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
        {this.renderSearch()}
        <View style={styles.containerTag}>{this.renderTabs()}</View>
      </View>
    );
  };

  renderContent() {
    return (
      <List
        onEndReached={this.props.loadDataRegisterList}
        dataArray={this.props.registerListDataMy}
        contentContainerStyle={{flexGrow: 1}}
        ListHeaderComponent={this.headerComponent}
        ListEmptyComponent={
          this.props.isLoadingMy ? (
            this.props.refreshingMy ? (
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
            refreshing={this.props.refreshingMy}
            onRefresh={this.props.onRefresh}
          />
        }
        renderRow={(item, sectionID, rowID) => (
          <ListItemRegisterStudent
            {...this.props}
            key={item.id}
            saler={item.saler}
            campaign={item.campaign}
            source={item.source}
            register_status={item.register_status}
            callStatus={item.call_status}
            money={item.money}
            setStudentId={this.props.setStudentId}
            classInfo={item.class}
            created_at={item.created_at}
            registerId={item.id}
            errorChangeCallStatus={this.props.errorChangeCallStatus}
            errorSubmitMoney={this.props.errorSubmitMoney}
            changeCallStatus={this.props.changeCallStatus}
            submitMoney={this.props.submitMoney}
            paidTime={item.paid_time}
            loadAvailableClasses={this.props.loadAvailableClasses}
            availableClasses={this.props.availableClasses}
            isLoadingAvailableClasses={this.props.isLoadingAvailableClasses}
            resetAvailableClasses={this.props.resetAvailableClasses}
            changingClass={this.props.changingClass}
            changeClassStatus={this.props.changeClassStatus}
            changeClass={this.props.changeClass}
            user={item.user}
            classItem={item.class}
            code={item.code}
            receivedBook={item.received_book_at}
          />
        )}
      />
    );
  }

  render() {
    return <View style={styles.wrapper}>{this.renderContent()}</View>;
  }
}

const styles = {
  wrapper: {
    flex: 1,
  },
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
