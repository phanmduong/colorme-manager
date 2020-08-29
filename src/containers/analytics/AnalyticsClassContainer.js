import React from 'react';
import {connect} from 'react-redux';
import AnalyticsClassComponent from '../../components/analytics/AnalyticsClassComponent';
import * as analyticsActions from '../../actions/analyticsActions';
import * as classActions from '../../actions/classActions';
import {bindActionCreators} from 'redux';

class AnalyticsClassContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  onSelectedItem = (classId) => {
    this.props.classActions.selectedClassId(classId);
    this.props.navigation.navigate('ListStudentClass');
  };

  changeClassStatus = (classId) => {
    this.props.classActions.changeClassStatus(
      classId,
      this.props.token,
      this.props.domain,
    );
  };

  changeClassType = (type) => {
    this.props.analyticsActions.selectedClassType(type);
    setTimeout(() => this.props.loadDataClass(), 200);
  };

  render() {
    return (
      <AnalyticsClassComponent
        {...this.props}
        changeClassStatus={this.changeClassStatus}
        changeClassType={this.changeClassType}
        onSelectedItem={this.onSelectedItem}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    analyticsClasses: state.analytics.analyticsClasses,
    isLoadingAnalyticsClasses: state.analytics.isLoadingAnalyticsClasses,
    errorAnalyticsClasses: state.analytics.errorAnalyticsClasses,
    user: state.login.user,
    token: state.login.token,
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    analyticsActions: bindActionCreators(analyticsActions, dispatch),
    classActions: bindActionCreators(classActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnalyticsClassContainer);
