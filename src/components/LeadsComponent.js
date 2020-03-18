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
var {height, width} = Dimensions.get('window');

class LeadsComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filterModalVisible: false,
    };
  }

  toggleFilterModal = () => {
    this.setState({filterModalVisible: !this.state.filterModalVisible});
  };

  resetModal = () => {
    this.setState({filterModalVisible: false});
    setTimeout(() => {
      this.setState({filterModalVisible: true});
    }, 700);
  };

  renderSearch = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Search
          placeholder={'Tìm kiếm học viên'}
          onChangeText={this.props.searchData}
          extraStyle={{width: width - (theme.mainHorizontal * 2 + 40 + 10)}}
          extraInputStyle={{
            width: width - (theme.mainHorizontal * 2 + 40 + 10) - 48,
          }}
        />
        <TouchableOpacity onPress={this.toggleFilterModal}>
          <View style={styles.fitlerContainer}>
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
          resetModal={this.resetModal}
          reset={this.props.reset}
          onRefresh={this.props.onRefresh}
        />
      </View>
    );
  };

  headerComponent = () => {
    return <View>{this.renderSearch()}</View>;
  };

  renderItem = ({item}) => (
    <ListItemLeads
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

export default LeadsComponent;
