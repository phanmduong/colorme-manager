import React from 'react';
import {FlatList} from 'react-native';
import theme from '../styles';
import Search from './common/Search';
import WorkShiftStatisticsItem from './workShiftRegister/WorkShiftStatisticsItem';
import Loading from './common/Loading';
import EmptyMessage from './common/EmptyMessage';
import {convertVietText} from '../helper';

class WorkShiftStatisticsComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      search: '',
    };
  }

  renderStatisticsItem = ({item}) => {
    return (
      <WorkShiftStatisticsItem
        user={item.user}
        statistics={item.statistic_work_shift}
      />
    );
  };

  headerComponent = () => {
    return (
      <Search
        value={this.state.search}
        placeholder={'Tìm kiếm nhân viên'}
        onChangeText={(search) => this.setState({search})}
        extraStyle={styles.search}
      />
    );
  };

  filterStatistics = () => {
    return this.props.statistics.filter((item) =>
      convertVietText(item.user.name).includes(
        convertVietText(this.state.search),
      ),
    );
  };

  render() {
    return (
      <FlatList
        data={this.filterStatistics()}
        keyExtractor={(item) => item.user.id}
        renderItem={this.renderStatisticsItem}
        contentContainerStyle={styles.container}
        refreshing={this.props.refreshingStatistics}
        onRefresh={this.props.onRefresh}
        ListHeaderComponent={this.headerComponent}
        ListEmptyComponent={
          this.props.isLoadingStatistics
            ? !this.props.refreshingStatistics && <Loading />
            : !this.props.refreshingStatistics && <EmptyMessage />
        }
      />
    );
  }
}

const styles = {
  container: {
    flexGrow: 1,
    marginHorizontal: theme.mainHorizontal,
  },
  search: {
    marginLeft: 0,
  },
};

export default WorkShiftStatisticsComponent;
