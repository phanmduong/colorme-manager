import React from 'react';
import {
  View,
  FlatList,
  Dimensions,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import Search from './common/Search';
import ListItemLeads from './leads/ListItemLeads';
import Loading from './common/Loading';
import {Text} from 'native-base';
import theme from '../styles';
import FilterLeadsModal from './leads/FilterLeadsModal';
import LinearGradient from 'react-native-linear-gradient';
var {width} = Dimensions.get('window');

class LeadsComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filterModalVisible: false,
      index: 0,
      picId: this.props.picId,
    };
  }

  toggleFilterModal = () => {
    this.setState({filterModalVisible: !this.state.filterModalVisible});
  };
  executeActions = (index) => {
    switch (index) {
      case 0:
        this.props.onSelectOrderBy('staff_id');
        setTimeout(() => this.props.onRefresh(), 200);
        break;
      case 1:
        this.props.onSelectOrderBy('created_at');
        setTimeout(() => this.props.onRefresh(), 200);
        break;
      case 2:
        this.props.onSelectOrderBy('imported_at');
        setTimeout(() => this.props.onRefresh(), 200);
        break;
      case 3:
        this.props.onSelectOrderBy('rate');
        setTimeout(() => this.props.onRefresh(), 200);
        break;
      case 4:
        this.props.onSelectOrderBy('last_time_interact');
        setTimeout(() => this.props.onRefresh(), 200);
        break;
      default:
        return;
    }
  };

  renderSearch = () => {
    return (
      <View>
        <View style={styles.row}>
          <Search
            placeholder={'Tìm kiếm học viên'}
            onChangeText={this.props.searchData}
            extraStyle={{width: width - (theme.mainHorizontal * 2 + 40 + 10)}}
            extraInputStyle={{
              width: width - (theme.mainHorizontal * 2 + 40 + 10) - 48,
            }}
            value={this.props.searchLeads}
          />
          <TouchableOpacity onPress={this.toggleFilterModal}>
            <View style={styles.filterContainer}>
              <Image
                source={require('../../assets/img/icons8-sorting_options_filled.png')}
                style={{width: 18, height: 18}}
              />
            </View>
          </TouchableOpacity>
          <FilterLeadsModal
            {...this.props}
            isMyLead={this.state.picId === this.props.user.id}
            isVisible={this.state.filterModalVisible}
            closeModal={this.toggleFilterModal}
            onSelectStartTime={this.props.onSelectStartTime}
            onSelectEndTime={this.props.onSelectEndTime}
            onSelectRate={this.props.onSelectRate}
            onSelectCampaignId={this.props.onSelectCampaignId}
            onSelectStatus={this.props.onSelectStatus}
            onSelectSource={this.props.onSelectSource}
            onSelectAddress={this.props.onSelectAddress}
            onRefresh={this.props.onRefresh}
            onSelectPICLeads={this.props.onSelectPICLeads}
            loadStaff={this.props.loadStaff}
            duplicate={this.props.duplicate}
            onSelectDuplicate={this.props.onSelectDuplicate}
            onSelectLeadTag={this.props.onSelectLeadTag}
            leadTag={this.props.leadTag}
            onSelectBaseId={this.props.onSelectBaseId}
            baseId={this.props.baseId}
            onSelectCallBackStartTime={this.props.onSelectCallBackStartTime}
            onSelectCallBackEndTime={this.props.onSelectCallBackEndTime}
            onSelectMockExamStartTime={this.props.onSelectMockExamStartTime}
            onSelectMockExamEndTime={this.props.onSelectMockExamEndTime}
          />
        </View>
        <View style={styles.containerTag}>{this.renderTabs()}</View>
      </View>
    );
  };

  renderTabs = () => {
    let pics = [
      {id: '', name: 'Tất cả Lead'},
      {id: this.props.user.id, name: 'Lead của bạn'},
    ];
    return pics.map((pic) => (
      <TouchableOpacity
        onPress={() => {
          this.setState({picId: pic.id});
          this.props.onSelectPICLeads(pic.id);
          setTimeout(() => {
            this.props.onRefresh();
          }, 500);
        }}>
        <LinearGradient
          colors={
            this.state.picId === pic.id
              ? ['#F6F6F6', '#F6F6F6']
              : ['white', 'white']
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.tag}>
          <Text style={{color: 'black'}}>{pic.name}</Text>
        </LinearGradient>
      </TouchableOpacity>
    ));
  };

  headerComponent = () => {
    return <View>{this.renderSearch()}</View>;
  };

  renderItem = ({item}) => (
    <ListItemLeads
      {...this.props}
      avatar_url={item.avatar_url}
      name={item.name}
      email={item.email}
      rate={item.rate}
      phone={item.phone}
      campaign={item.campaign}
      source={item.source}
      carer={item.carer}
      lead_status={item.lead_status}
      city={item.city}
      id={item.id}
      setStudentId={this.props.setStudentId}
      pic={item.pic}
      source_id={item.source_id}
      campaigns={this.props.campaigns}
      staff={this.props.staff}
      sources={this.props.sources}
      changeTags={this.props.changeTags}
      loadStaff={this.props.loadStaff}
      note={item.note}
      lead={item}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.leads}
        renderItem={this.renderItem}
        contentContainerStyle={{flexGrow: 1}}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.headerComponent}
        onEndReached={this.props.loadLeads}
        ListEmptyComponent={
          this.props.isLoadingLeads
            ? !this.props.refreshingLeads && <Loading size={width / 8} />
            : !this.props.refreshingLeads && (
                <View style={styles.container}>
                  <Text style={{color: theme.dangerColor, fontSize: 16}}>
                    Không có kết quả
                  </Text>
                </View>
              )
        }
        refreshControl={
          <RefreshControl
            refreshing={this.props.refreshingLeads}
            onRefresh={this.props.onRefresh}
          />
        }
      />
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTag: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 5,
    marginHorizontal: theme.mainHorizontal,
  },
};

export default LeadsComponent;
