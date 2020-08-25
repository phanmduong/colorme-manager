import React from 'react';
import AnalyticsKPIComponent from '../../components/analytics/AnalyticsKPIComponent';

class AnalyticsKPIContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <AnalyticsKPIComponent {...this.props} />;
  }
}

export default AnalyticsKPIContainer;
