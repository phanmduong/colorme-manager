import React from 'react';
import AnalyticsRegisterComponent from '../../components/analytics/AnalyticsRegisterComponent';

class AnalyticsRegisterContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <AnalyticsRegisterComponent {...this.props} />;
  }
}

export default AnalyticsRegisterContainer;
