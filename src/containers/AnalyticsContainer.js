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
import * as saveRegisterActions from '../actions/saveRegisterActions';
import * as leadsActions from '../actions/leadsActions';
import * as classActions from '../actions/classActions';
import * as baseActions from '../actions/baseActions';
import * as genActions from '../actions/genActions';
import {ENROLLING, STUDYING} from '../constants/constant';
import AsyncStorage from '@react-native-community/async-storage';

class AnalyticsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    setTimeout(() => this.loadAnalytics(), 50);
    this.loadCampaigns();
    this.loadSources();
    this.loadStaff('');
    this.loadCourses();
    this.loadBases();
    this.loadGens();
  }

  componentWillUnmount() {
    this.props.classActions.reset();
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
    let courseId =
      this.props.selectedCourseId === -1 ? '' : this.props.selectedCourseId;
    let sourceId =
      this.props.selectedSourceId === -1 ? '' : this.props.selectedSourceId;
    let campaignId =
      this.props.selectedCampaignId === -1 ? '' : this.props.selectedCampaignId;
    this.props.analyticsActions.loadAnalyticsRegister(
      baseId,
      staffId,
      startTime,
      endTime,
      courseId,
      sourceId,
      campaignId,
      this.props.token,
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
    );
  };

  loadAnalytics = () => {
    this.loadAnalyticsRegister();
    this.loadAnalyticsRevenue();
    this.loadAnalyticsKPI();
    this.loadDataClass();
  };

  loadAnalyticsKPI = () => {
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
    this.props.analyticsActions.loadAnalyticsKPI(
      startTime,
      endTime,
      baseId,
      courseId,
      sourceId,
      campaignId,
      staffId,
      this.props.token,
    );
  };

  onSelectStartDate = async (startDate) => {
    try {
      const dateString = String(startDate.format('YYYY-MM-DD'));
      await AsyncStorage.setItem('@analytics_start_date', dateString);
      this.props.analyticsActions.selectedStartDate(startDate);
    } catch (e) {
      // saving error
    }
  };

  onSelectEndDate = async (endDate) => {
    try {
      const dateString = String(endDate.format('YYYY-MM-DD'));
      await AsyncStorage.setItem('@analytics_end_date', dateString);
      this.props.analyticsActions.selectedEndDate(endDate);
    } catch (e) {
      // saving error
    }
  };

  onSelectBaseId = (baseId) => {
    this.props.analyticsActions.selectedBaseId(baseId);
  };

  onSelectCampaignId = (campaignId) => {
    this.props.analyticsActions.selectedCampaignId(campaignId);
  };

  onSelectSourceId = (sourceId) => {
    this.props.analyticsActions.selectedSourceId(sourceId);
  };

  onSelectStaffId = (staffId) => {
    this.props.analyticsActions.selectedStaffId(staffId);
  };

  onSelectCourseId = (courseId) => {
    this.props.analyticsActions.selectedCourseId(courseId);
  };

  onSelectGenId = async (genId) => {
    try {
      await AsyncStorage.setItem('@analytics_gen_id', String(genId));
      this.props.analyticsActions.selectedGenId(genId);
    } catch (e) {
      // saving error
    }
  };

  loadCampaigns = () => {
    this.props.saveRegisterActions.loadCampaigns(this.props.token);
  };

  loadSources = () => {
    this.props.saveRegisterActions.loadSources(this.props.token);
  };

  loadStaff = (search) => {
    this.props.leadsActions.getStaff(search, this.props.token);
  };

  loadGens = () => {
    this.props.genActions.loadDataGen(this.props.token);
  };

  loadCourses = () => {
    this.props.classActions.loadDataCourse(this.props.token);
  };

  loadBases = () => {
    this.props.baseActions.loadDataBase(this.props.token);
  };

  loadDataClass = () => {
    const baseId =
      this.props.selectedBaseId === -1 ? '' : this.props.selectedBaseId;
    const courseId =
      this.props.selectedCourseId === -1 ? '' : this.props.selectedCourseId;
    const startDate =
      this.props.classType === STUDYING
        ? this.props.startDate.format('YYYY-MM-DD')
        : '';
    const endDate =
      this.props.classType === STUDYING
        ? this.props.endDate.format('YYYY-MM-DD')
        : '';
    const enrollStart =
      this.props.classType === STUDYING
        ? ''
        : this.props.enrollStart.format('YYYY-MM-DD');
    const enrollEnd =
      this.props.classType === STUDYING
        ? ''
        : this.props.enrollEnd.format('YYYY-MM-DD');
    let staffId =
      this.props.selectedStaffId === -1 ? '' : this.props.selectedStaffId;
    let sourceId =
      this.props.selectedSourceId === -1 ? '' : this.props.selectedSourceId;
    let campaignId =
      this.props.selectedCampaignId === -1 ? '' : this.props.selectedCampaignId;
    this.props.analyticsActions.loadAnalyticsClasses(
      startDate,
      endDate,
      staffId,
      baseId,
      enrollStart,
      enrollEnd,
      courseId,
      sourceId,
      campaignId,
      this.props.token,
    );
  };

  render() {
    return (
      <AnalyticsComponent
        {...this.props}
        onSelectStartDate={this.onSelectStartDate}
        onSelectEndDate={this.onSelectEndDate}
        loadAnalytics={this.loadAnalytics}
        loadStaff={this.loadStaff}
        onSelectCourseId={this.onSelectCourseId}
        onSelectStaffId={this.onSelectStaffId}
        onSelectBaseId={this.onSelectBaseId}
        onSelectSourceId={this.onSelectSourceId}
        onSelectCampaignId={this.onSelectCampaignId}
        onSelectGenId={this.onSelectGenId}
        loadDataClass={this.loadDataClass}
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
    selectedBaseId: state.analytics.selectedBaseId,
    selectedStaffId: state.analytics.selectedStaffId,
    startDate: state.analytics.startDate,
    endDate: state.analytics.endDate,
    selectedCourseId: state.analytics.selectedCourseId,
    selectedSourceId: state.analytics.selectedSourceId,
    selectedCampaignId: state.analytics.selectedCampaignId,
    isLoadingCampaigns: state.saveRegister.isLoadingCampaigns,
    errorLoadingCampaigns: state.saveRegister.errorLoadingCampaigns,
    campaigns: state.saveRegister.campaigns,
    isLoadingSources: state.saveRegister.isLoadingSources,
    errorLoadingSources: state.saveRegister.errorLoadingSources,
    sources: state.saveRegister.sources,
    staff: state.leads.staff,
    isLoadingStaff: state.leads.isLoadingStaff,
    errorStaff: state.leads.errorStaff,
    courseData: state.class.courseData,
    isLoadingCourse: state.class.isLoadingCourse,
    isLoadingBase: state.base.isLoading,
    baseData: state.base.baseData,
    genData: state.gen.genData,
    isLoadingGen: state.gen.isLoading,
    selectedGenId: state.analytics.selectedGenId,
    enrollStart: state.analytics.enrollStart,
    enrollEnd: state.analytics.enrollEnd,
    classType: state.analytics.classType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    analyticsActions: bindActionCreators(analyticsActions, dispatch),
    classActions: bindActionCreators(classActions, dispatch),
    saveRegisterActions: bindActionCreators(saveRegisterActions, dispatch),
    leadsActions: bindActionCreators(leadsActions, dispatch),
    baseActions: bindActionCreators(baseActions, dispatch),
    genActions: bindActionCreators(genActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsContainer);
