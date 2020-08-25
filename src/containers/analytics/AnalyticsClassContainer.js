import React from 'react';
import AnalyticsClassComponent from '../../components/analytics/AnalyticsClassComponent';

class AnalyticsClassContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <AnalyticsClassComponent {...this.props} />;
  }
}

export default AnalyticsClassContainer;
