import React from 'react';
import {connect} from 'react-redux';
import SaveRegisterComponent from '../components/SaveRegisterComponent';
import {bindActionCreators} from 'redux';
import * as saveRegisterActions from '../actions/saveRegisterActions';

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

  register = register => {
    this.props.saveRegisterActions.register(this.props.token, register);
  };

  render() {
    return (
      <SaveRegisterComponent
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveRegisterActions: bindActionCreators(saveRegisterActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SaveRegisterContainer);
