import React from 'react';
import {View, Dimensions, RefreshControl} from 'react-native';
import KPIItem from './kpi/KPIItem';
import Loading from './common/Loading';
import Search from './common/Search';
import FilterKPIModal from './kpi/FilterKPIModal';
const {width, height} = Dimensions.get('window');
import {List, Text} from 'native-base';
import theme from '../styles';

class KPIComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  renderKPIs = (item) => (
    <KPIItem
      name={item.name}
      detail_kpis={item.detail_kpis}
      type={item.type}
      calculate_by={item.calculate_by}
    />
  );

  toggleModal = () => {
    this.setState({isVisible: !this.state.isVisible});
  };

  headerComponent = () => {
    return (
      <View>
        <Search
          placeholder={'Tìm kiếm KPI'}
          isFilter
          onChangeText={this.props.searchKPI}
          onFilterPress={this.toggleModal}
        />
        <FilterKPIModal
          isVisible={this.state.isVisible}
          closeModal={this.toggleModal}
          type={this.props.type}
          calculateBy={this.props.calculateBy}
          onSelectKPIType={this.props.onSelectKPIType}
          onSelectKPICalculateBy={this.props.onSelectKPICalculateBy}
          apply={this.props.apply}
          startTime={this.props.startTime}
          endTime={this.props.endTime}
          onSelectKPIStartTime={this.props.onSelectKPIStartTime}
          onSelectKPIEndTime={this.props.onSelectKPIEndTime}
        />
      </View>
    );
  };

  render() {
    return (
      <List
        dataArray={this.props.kpis}
        renderRow={this.renderKPIs}
        ListHeaderComponent={this.headerComponent}
        contentContainerStyle={{flexGrow: 1}}
        onEndReached={this.props.loadKPI}
        refreshControl={
          <RefreshControl
            onRefresh={this.props.onRefresh}
            refreshing={this.props.refreshing}
          />
        }
        ListEmptyComponent={
          this.props.loading ? (
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
};

export default KPIComponent;
