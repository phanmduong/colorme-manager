import React from 'react';
import {connect} from 'react-redux';
import SaveRegisterComponent from '../components/SaveRegisterComponent';
import {bindActionCreators} from 'redux';
import * as saveRegisterActions from '../actions/saveRegisterActions';
import * as registerListActions from '../actions/registerListActions';
import * as baseActions from '../actions/baseActions';

class SaveRegisterContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Tạo đăng ký',
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

  loadClasses = courseId => {
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

  register = register => {
    this.props.saveRegisterActions.register(this.props.token, register);
  };

  reloadRegisterList = () => {
    let salerId = this.props.salerId === -1 ? '' : this.props.salerId;
    this.props.registerListActions.refreshRegisterListMy(
      '',
      this.props.token,
      salerId,
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
