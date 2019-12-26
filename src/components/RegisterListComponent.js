import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import {View, List, Text} from 'native-base';
import theme from '../styles';
import ListItemRegisterStudent from './registerList/ListItemRegisterStudent';
import Loading from './common/Loading';
import Search from './common/Search';
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';
import FilterModal from './infoStudent/FilterModal';

var {height, width} = Dimensions.get('window');
class RegisterListComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filterModalVisible: false,
    };
  }

  toggleFilterModal = () => {
    this.setState({filterModalVisible: !this.state.filterModalVisible});
  };

  renderSearch() {
    const {updateFormAndLoadDataSearch, search} = this.props;
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Search
          placeholder="Tìm kiếm (Email, tên, số điện thoại)"
          onChangeText={updateFormAndLoadDataSearch}
          value={search}
          autoFocus={this.props.autoFocus}
          extraStyle={{width: width - 85}}
          extraInputStyle={{width: width - 85 - 48}}
        />
        <TouchableOpacity onPress={this.toggleFilterModal}>
          <View style={styles.fitlerContainer}>
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
        />
      </View>
    );
  }

  headerComponent = () => {
    let isSubScreen = this.props.navigation.getParam('isSubScreen');
    return (
      <View style={{flex: 1}}>
        {!isSubScreen ? (
          <View style={styles.headerContainer}>
            <Image
              source={{uri: this.props.user.avatar_url}}
              style={styles.headerAva}
            />
            <Text style={styles.headerTitle}>Học viên</Text>
          </View>
        ) : null}
        {this.renderSearch()}
      </View>
    );
  };

  renderContent() {
    return (
      <View style={{flex: 1}}>
        <List
          style={styles.list}
          onEndReached={this.props.loadDataRegisterList}
          onEndReachedThreshold={height / 2}
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
              titleColor={theme.mainColor}
              title="Đang tải..."
              tintColor="#d9534f"
              colors={['#d9534f']}
            />
          }
          renderRow={(item, sectionID, rowID) => (
            <ListItemRegisterStudent
              {...this.props}
              name={item.name}
              avatar={item.course_avatar_url}
              email={item.email}
              phone={item.phone}
              saler={this.props.segmentActive === 1 ? item.saler : null}
              campaign={item.campaign}
              callStatus={item.call_status}
              paidStatus={item.paid_status}
              money={item.money}
              studentId={item.student_id}
              setStudentId={this.props.setStudentId}
              avatar_url={item.avatar_url}
              classInfo={item.class}
              token={this.props.token}
              code={item.code}
              registerId={item.id}
              errorChangeCallStatus={this.props.errorChangeCallStatus}
              errorSubmitMoney={this.props.errorSubmitMoney}
              changeCallStatus={this.props.changeCallStatus}
              submitMoney={this.props.submitMoney}
            />
          )}
        />
      </View>
    );
  }

  render() {
    let isSubScreen = this.props.navigation.getParam('isSubScreen');
    return (
      <View
        style={
          isIphoneX() && !isSubScreen
            ? {flex: 1, marginTop: getStatusBarHeight() + 10}
            : {flex: 1, marginTop: 10}
        }>
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
    marginBottom: 10,
    marginHorizontal: 20,
  },
  tag: {
    paddingHorizontal: 20,
    marginRight: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
  fitlerContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },
};

export default RegisterListComponent;
