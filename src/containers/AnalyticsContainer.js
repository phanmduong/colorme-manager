/**
 * Created by phanmduong on 4/25/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import AnalyticsComponent from '../components/AnalyticsComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import {bindActionCreators} from 'redux';
import * as analyticsActions from '../actions/analyticsActions';

class AnalyticsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.loadAnalytics();
  }

  static navigationOptions = ({navigation}) => ({
    headerLeft: () => (
      <View style={styles.headerLeftContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name={'chevron-left'}
            size={33}
            color={'black'}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.name}>Thống kê</Text>
        </View>
      </View>
    ),
  });

  loadAnalyticsRegister = () => {
    let baseId =
      this.props.selectedBaseId === -1 ? '' : this.props.selectedBaseId;
    let staffId =
      this.props.selectedStaffId === -1 ? '' : this.props.selectedStaffId;
    let startTime = this.props.startDate.format('YYYY-MM-DD');
    let endTime = this.props.endDate.format('YYYY-MM-DD');
    this.props.analyticsActions.loadAnalyticsRegister(
      baseId,
      staffId,
      startTime,
      endTime,
      this.props.token,
      this.props.domain,
    );
  };

  loadAnalyticsRevenue = () => {
    let baseId =
      this.props.selectedBaseId === -1 ? '' : this.props.selectedBaseId;
    let staffId =
      this.props.selectedStaffId === -1 ? '' : this.props.selectedStaffId;
    let startTime = this.props.startDate.format('YYYY-MM-DD');
    let endTime = this.props.endDate.format('YYYY-MM-DD');
    let courseId =
      this.props.selectedCourseId === -1 ? '' : this.props.selectedCourseId;
    let sourceId =
      this.props.selectedSourceId === -1 ? '' : this.props.selectedSourceId;
    let campaignId =
      this.props.selectedCampaignId === -1 ? '' : this.props.selectedCampaignId;
    this.props.analyticsActions.loadAnalyticsRevenue(
      startTime,
      endTime,
      staffId,
      baseId,
      courseId,
      sourceId,
      campaignId,
      this.props.token,
      this.props.domain,
    );
  };

  loadAnalytics = () => {
    this.loadAnalyticsRegister();
    this.loadAnalyticsRevenue();
  };

  onSelectStartDate = (startDate) => {
    this.props.analyticsActions.selectedStartDate(startDate);
  };

  onSelectEndDate = (endDate) => {
    this.props.analyticsActions.selectedEndDate(endDate);
  };

  render() {
    return (
      <AnalyticsComponent
        {...this.props}
        onSelectStartDate={this.onSelectStartDate}
        onSelectEndDate={this.onSelectEndDate}
        loadAnalytics={this.loadAnalytics}
      />
    );
  }
}

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    domain: state.login.domain,
    selectedBaseId: state.analytics.selectedBaseId,
    selectedStaffId: state.analytics.selectedStaffId,
    startDate: state.analytics.startDate,
    endDate: state.analytics.endDate,
    selectedCourseId: state.analytics.selectedCourseId,
    selectedSourceId: state.analytics.selectedSourceId,
    selectedCampaignId: state.analytics.selectedCampaignId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    analyticsActions: bindActionCreators(analyticsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsContainer);
