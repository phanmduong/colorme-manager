import React from 'react';
import {View, Dimensions} from 'react-native';
import AnalyticsKPIItem from './AnalyticsKPIItem';
import Loading from '../common/Loading';
const {width, height} = Dimensions.get('window');

class AnalyticsKPIComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  renderKPIs = () => {
    return this.props.analyticsKpis.map((person) => (
      <AnalyticsKPIItem
        name={person.name}
        kpi={person.kpi}
        revenue={person.revenue}
        avatar_url={person.avatar_url}
      />
    ));
  };

  pairKpiRevenue = () => {
    const kpi = this.props.analyticsKpis.reduce(function (accum, currentItem) {
      return (accum += currentItem.kpi);
    }, 0);
    const revenue = this.props.analyticsKpis.reduce(function (
      accum,
      currentItem,
    ) {
      return (accum += currentItem.revenue);
    },
    0);
    return {kpi, revenue};
  };

  render() {
    return this.props.isLoadingAnalyticsKPI ? (
      <Loading size={width / 8} />
    ) : (
      <View>
        <AnalyticsKPIItem
          name={'Tất cả'}
          kpi={this.pairKpiRevenue().kpi}
          revenue={this.pairKpiRevenue().revenue}
          avatar_url={null}
        />
        {this.renderKPIs()}
      </View>
    );
  }
}

export default AnalyticsKPIComponent;
