import React from 'react';
import {connect} from 'react-redux';
import SaveRegisterComponent from '../components/SaveRegisterComponent';
import {bindActionCreators} from 'redux';
import * as saveRegisterActions from '../actions/saveRegisterActions';
import * as registerListActions from '../actions/registerListActions';
import * as baseActions from '../actions/baseActions';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';

class SaveRegisterContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
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
          <Text style={styles.name}>Tạo đăng ký</Text>
        </View>
      </View>
    ),
  });

  componentDidMount = () => {
    this.loadCourses();
    this.loadCampaigns();
    this.loadProvinces();
    this.loadSources();
    this.loadStatuses();
    this.loadDataBase();
    this.loadSalers();
  };

  loadCourses = () => {
    this.props.saveRegisterActions.loadCourses(
      this.props.token,
      this.props.domain,
    );
  };

  loadClasses = (courseId) => {
    this.props.saveRegisterActions.loadClasses(
      this.props.token,
      courseId,
      this.props.domain,
    );
  };

  loadCampaigns = () => {
    this.props.saveRegisterActions.loadCampaigns(
      this.props.token,
      this.props.domain,
    );
  };

  loadProvinces = () => {
    this.props.saveRegisterActions.loadProvinces(
      this.props.token,
      this.props.domain,
    );
  };

  loadSources = () => {
    this.props.saveRegisterActions.loadSources(
      this.props.token,
      this.props.domain,
    );
  };

  loadStatuses = () => {
    this.props.saveRegisterActions.loadStatuses(
      'registers',
      this.props.token,
      this.props.domain,
    );
  };

  loadDataBase = () => {
    this.props.baseActions.loadDataBase(this.props.token, this.props.domain);
  };

  loadSalers = () => {
    this.props.saveRegisterActions.loadSalers(
      this.props.token,
      this.props.domain,
    );
  };

  register = (register) => {
    this.props.saveRegisterActions.register(
      this.props.token,
      register,
      this.props.domain,
    );
  };

  render() {
    return (
      <SaveRegisterComponent
        {...this.props}
        onSelectCourseId={this.loadClasses}
        register={this.register}
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
    isLoadingCourses: state.saveRegister.isLoadingCourses,
    errorLoadingCourses: state.saveRegister.errorLoadingCourses,
    courses: state.saveRegister.courses,
    isLoadingClasses: state.saveRegister.isLoadingClasses,
    errorLoadingClasses: state.saveRegister.errorLoadingClasses,
    classes: state.saveRegister.classes,
    isLoadingRegister: state.saveRegister.isLoadingRegister,
    errorLoadingRegister: state.saveRegister.errorLoadingRegister,
    isLoadingCampaigns: state.saveRegister.isLoadingCampaigns,
    errorLoadingCampaigns: state.saveRegister.errorLoadingCampaigns,
    campaigns: state.saveRegister.campaigns,
    isLoadingProvinces: state.saveRegister.isLoadingProvinces,
    errorLoadingProvinces: state.saveRegister.errorLoadingProvinces,
    provinces: state.saveRegister.provinces,
    user: state.login.user,
    saler_id: state.registerList.saler_id,
    isLoadingSources: state.saveRegister.isLoadingSources,
    errorLoadingSources: state.saveRegister.errorLoadingSources,
    sources: state.saveRegister.sources,
    isLoadingStatuses: state.saveRegister.isLoadingStatuses,
    errorLoadingStatuses: state.saveRegister.errorLoadingStatuses,
    statuses: state.saveRegister.statuses,
    isLoadingBase: state.base.isLoading,
    errorLoadingBase: state.base.error,
    baseData: state.base.baseData,
    salerId: state.registerList.salerId,
    isLoadingSalers: state.saveRegister.isLoadingSalers,
    errorLoadingSalers: state.saveRegister.errorLoadingSalers,
    salers: state.saveRegister.salers,
    domain: state.login.domain,
    selectedBaseId: state.base.selectedBaseId,
    campaignId: state.registerList.campaignId,
    paidStatus: state.registerList.paidStatus,
    callStatus: state.registerList.callStatus,
    bookmark: state.registerList.bookmark,
    status_id: state.registerList.status_id,
    source_id: state.registerList.source_id,
    selectedGenId: state.gen.selectedGenId,
    currentGen: state.gen.currentGen,
    classId: state.registerList.classId,
    searchMy: state.registerList.searchMy,
    classStatus: state.registerList.classStatus,
    start_time: state.registerList.start_time,
    end_time: state.registerList.end_time,
    appointmentPayment: state.registerList.appointmentPayment,
    search_coupon: state.registerList.search_coupon,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveRegisterActions: bindActionCreators(saveRegisterActions, dispatch),
    registerListActions: bindActionCreators(registerListActions, dispatch),
    baseActions: bindActionCreators(baseActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SaveRegisterContainer);
