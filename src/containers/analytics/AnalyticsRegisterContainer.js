import React from 'react';
import {connect} from 'react-redux';
import AnalyticsRegisterComponent from '../../components/analytics/AnalyticsRegisterComponent';
import {bindActionCreators} from 'redux';
import * as analyticsActions from '../../actions/analyticsActions';

class AnalyticsRegisterContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.analyticsRevenue);
    return <AnalyticsRegisterComponent {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    domain: state.login.domain,
    isLoadingAnalyticsRegister: state.analytics.isLoadingAnalyticsRegister,
    errorAnalyticsRegister: state.analytics.errorAnalyticsRegister,
    analyticsRegister: state.analytics.analyticsRegister,
    analyticsRevenue: state.analytics.analyticsRevenue,
    isLoadingAnalyticsRevenue: state.analytics.isLoadingAnalyticsRevenue,
    errorAnalyticsRevenue: state.analytics.errorAnalyticsRevenue,
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
)(AnalyticsRegisterContainer);
