import React from 'react';
import {
  View,
  FlatList,
  Dimensions,
  RefreshControl,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Search from './common/Search';
import ListItemLeads from './leads/ListItemLeads';
import Loading from './common/Loading';
import {Text} from 'native-base';
import theme from '../styles';
import FilterLeadsModal from './leads/FilterLeadsModal';
import ActionSheet from 'react-native-actionsheet';
var {height, width} = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

class LeadsComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filterModalVisible: false,
      index: 0,
    };
  }

  toggleFilterModal = () => {
    this.setState({filterModalVisible: !this.state.filterModalVisible});
  };

  showActionSheet = () => {
    this.ActionSheet.show();
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
            onSelectCarer={this.props.onSelectCarer}
            loadStaff={this.props.loadStaff}
            duplicate={this.props.duplicate}
            onSelectDuplicate={this.props.onSelectDuplicate}
            onSelectLeadTag={this.props.onSelectLeadTag}
            leadTag={this.props.leadTag}
            onSelectBaseId={this.props.onSelectBaseId}
            baseId={this.props.baseId}
            onSelectCallBackTime={this.props.onSelectCallBackTime}
            onSelectMockExamTime={this.props.onSelectMockExamTime}
            onSelectImportedAt={this.props.onSelectImportedAt}
          />
        </View>
        <View style={styles.sortContainer}>
          <TouchableOpacity onPress={this.showActionSheet}>
            <LinearGradient
              colors={['#F6F6F6', '#F6F6F6']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[styles.tag, {flexDirection: 'row'}]}>
              <Text style={styles.tagText}>Sắp xếp theo</Text>
              <FontAwesome name={'sort'} color={'black'} size={15} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.containerTag}>
            <TouchableOpacity
              onPress={() => {
                this.setState({index: 0});
                this.props.onSelectCarer('');
                setTimeout(() => this.props.onRefresh(), 200);
              }}>
              <LinearGradient
                colors={
                  this.state.index === 0
                    ? ['#F6F6F6', '#F6F6F6']
                    : ['white', 'white']
                }
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.tag}>
                <Text style={{color: 'black'}}>Tất cả</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({index: 1});
                this.props.onSelectCarer(-1);
                setTimeout(() => this.props.onRefresh(), 200);
              }}>
              <LinearGradient
                colors={
                  this.state.index === 1
                    ? ['#F6F6F6', '#F6F6F6']
                    : ['white', 'white']
                }
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.tag}>
                <Text style={{color: 'black'}}>Lead đã phân P.I.C</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({index: 2});
                this.props.onSelectCarer(-2);
                setTimeout(() => this.props.onRefresh(), 200);
              }}>
              <LinearGradient
                colors={
                  this.state.index === 2
                    ? ['#F6F6F6', '#F6F6F6']
                    : ['white', 'white']
                }
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.tag}>
                <Text style={{color: 'black'}}>Lead chưa phân P.I.C</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={'Sắp xếp theo'}
          options={[
            'Lead chưa có P.I.C',
            'Lead từ mới đến cũ',
            'Ngày nhập mới đến cũ',
            'Số sao',
            'Tương tác gần đây',
            'Hủy',
          ]}
          cancelButtonIndex={5}
          onPress={this.executeActions}
        />
      </View>
    );
  };

  headerComponent = () => {
    return <View>{this.renderSearch()}</View>;
  };

  renderItem = ({item}) => (
    <ListItemLeads
      {...this.props}
      key={item.id}
      token={this.props.token}
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
      changeCallStatus={this.props.changeCallStatus}
      errorChangeCallStatus={this.props.errorChangeCallStatus}
      notes={item.notes}
      setStudentId={this.props.setStudentId}
      interest={item.interest}
      father_name={item.father_name}
      source_id={item.source_id}
      campaigns={this.props.campaigns}
      staff={this.props.staff}
      sources={this.props.sources}
      statuses={this.props.statuses}
      changeTags={this.props.changeTags}
      loadStaff={this.props.loadStaff}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.leads}
        renderItem={this.renderItem}
        contentContainerStyle={{flexGrow: 1}}
        ListHeaderComponent={this.headerComponent}
        onEndReached={this.props.loadLeads}
        ListEmptyComponent={
          this.props.isLoadingLeads ? (
            this.props.refreshingLeads ? (
              <View />
            ) : (
              <Loading size={width / 8} />
            )
          ) : this.props.refreshingLeads ? (
            <View />
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
            refreshing={this.props.refreshingLeads}
            onRefresh={() => this.props.onRefresh(this.props.searchLeads)}
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
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.mainHorizontal,
    marginBottom: 5,
  },
  tag: {
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    marginRight: 5,
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
