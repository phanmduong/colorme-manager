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
    this.props.saveRegisterActions.loadCourses(this.props.token);
  };

  loadClasses = (courseId) => {
    this.props.saveRegisterActions.loadClasses(this.props.token, courseId);
  };

  loadCampaigns = () => {
    this.props.saveRegisterActions.loadCampaigns(this.props.token);
  };

  loadProvinces = () => {
    this.props.saveRegisterActions.loadProvinces(this.props.token);
  };

  loadSources = () => {
    this.props.saveRegisterActions.loadSources(this.props.token);
  };

  loadStatuses = () => {
    this.props.saveRegisterActions.loadStatuses('registers', this.props.token);
  };

  loadDataBase = () => {
    this.props.baseActions.loadDataBase(this.props.token);
  };

  loadSalers = () => {
    this.props.saveRegisterActions.loadSalers(this.props.token);
  };

  register = (register) => {
    this.props.saveRegisterActions.register(this.props.token, register);
  };

  reloadRegisterList = () => {
    let baseId =
      this.props.selectedBaseId === -1 ? '' : this.props.selectedBaseId;
    let salerId = this.props.salerId === -1 ? '' : this.props.salerId;
    let campaignId = this.props.campaignId === -1 ? '' : this.props.campaignId;
    let paidStatus = this.props.paidStatus === -1 ? '' : this.props.paidStatus;
    let callStatus = this.props.callStatus === -1 ? '' : this.props.callStatus;
    let bookmark = this.props.bookmark === -1 ? '' : this.props.bookmark;
    let statusId = this.props.status_id === -1 ? '' : this.props.status_id;
    let sourceId = this.props.source_id === -1 ? '' : this.props.source_id;
    let genId = '';
    if (this.props.selectedGenId === -1) {
      genId = this.props.currentGen.id;
    } else if (
      this.props.selectedGenId !== -1 &&
      this.props.selectedGenId !== 2
    ) {
      genId = this.props.selectedGenId;
    }
    let classId = this.props.classId === -1 ? '' : this.props.classId;
    this.props.registerListActions.refreshRegisterListMy(
      this.props.searchMy,
      this.props.token,
      salerId,
      baseId,
      campaignId,
      paidStatus,
      this.props.classStatus,
      callStatus,
      bookmark,
      this.props.search_coupon,
      this.props.start_time,
      this.props.end_time,
      this.props.appointmentPayment,
      statusId,
      sourceId,
      genId,
      classId,
    );
  };

  render() {
    return (
      <SaveRegisterComponent
        {...this.props}
        isLoadingCourses={this.props.isLoadingCourses}
        courses={this.props.courses}
        isLoadingClasses={this.props.isLoadingClasses}
        classes={this.props.classes}
        isLoadingCampaigns={this.props.isLoadingCampaigns}
        campaigns={this.props.campaigns}
        onSelectCourseId={this.loadClasses}
        register={this.register}
        isLoadingRegister={this.props.isLoadingRegister}
        errorLoadingRegister={this.props.errorLoadingRegister}
        provinces={this.props.provinces}
        isLoadingProvinces={this.props.isLoadingProvinces}
        reload={this.reloadRegisterList}
        user={this.props.user}
        isLoadingSources={this.props.isLoadingSources}
        sources={this.props.sources}
        isLoadingStatuses={this.props.isLoadingStatuses}
        statuses={this.props.statuses}
        isLoadingBase={this.props.isLoadingBase}
        baseData={this.props.baseData}
        isLoadingSalers={this.props.isLoadingSalers}
        salers={this.props.salers}
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
