import React from 'react';
import {connect} from 'react-redux';
import AnalyticsKPIComponent from '../../components/analytics/AnalyticsKPIComponent';
import * as analyticsActions from '../../actions/analyticsActions';
import {bindActionCreators} from 'redux';

class AnalyticsKPIContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <AnalyticsKPIComponent {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    analyticsKpis: state.analytics.analyticsKpis,
    isLoadingAnalyticsKPI: state.analytics.isLoadingAnalyticsKPI,
    errorAnalyticsKPI: state.analytics.errorAnalyticsKPI,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    analyticsActions: bindActionCreators(analyticsActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnalyticsKPIContainer);
