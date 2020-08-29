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
    return this.props.analyticsKpis.map((kpi) => (
      <AnalyticsKPIItem
        name={kpi.name}
        kpi={kpi.kpi}
        revenue={kpi.revenue}
        avatar_url={kpi.avatar_url}
      />
    ));
  };

  render() {
    return this.props.isLoadingAnalyticsKPI ? (
      <Loading size={width / 8} />
    ) : (
      <View>{this.renderKPIs()}</View>
    );
  }
}

export default AnalyticsKPIComponent;
