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
    selectedBaseId: state.analytics.selectedBaseId,
    selectedStaffId: state.analytics.selectedStaffId,
    startDate: state.analytics.startDate,
    endDate: state.analytics.endDate,
    selectedCourseId: state.analytics.selectedCourseId,
    selectedSourceId: state.analytics.selectedSourceId,
    selectedCampaignId: state.analytics.selectedCampaignId,
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
