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
    this.loadCoupons();
    this.loadClasses(null, null, '');
  };

  loadCoupons = () => {
    this.props.saveRegisterActions.loadCoupons(
      this.props.token,
      this.props.domain,
    );
  };

  loadCourses = () => {
    this.props.saveRegisterActions.loadCourses(
      this.props.token,
      this.props.domain,
    );
  };

  loadClasses = (courseId, baseId, search) => {
    this.props.saveRegisterActions.loadClasses(
      courseId,
      baseId,
      search,
      this.props.token,
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
      () => this.props.navigation.goBack(),
    );
  };

  render() {
    return (
      <SaveRegisterComponent
        {...this.props}
        loadClasses={this.loadClasses}
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
    isLoadingSources: state.saveRegister.isLoadingSources,
    errorLoadingSources: state.saveRegister.errorLoadingSources,
    sources: state.saveRegister.sources,
    isLoadingStatuses: state.saveRegister.isLoadingStatuses,
    errorLoadingStatuses: state.saveRegister.errorLoadingStatuses,
    statuses: state.saveRegister.statuses,
    isLoadingBase: state.base.isLoading,
    errorLoadingBase: state.base.error,
    baseData: state.base.baseData,
    isLoadingSalers: state.saveRegister.isLoadingSalers,
    errorLoadingSalers: state.saveRegister.errorLoadingSalers,
    salers: state.saveRegister.salers,
    domain: state.login.domain,
    selectedBaseId: state.base.selectedBaseId,
    isLoadingCoupons: state.saveRegister.isLoadingCoupons,
    errorCoupons: state.saveRegister.errorCoupons,
    coupons: state.saveRegister.coupons,
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
