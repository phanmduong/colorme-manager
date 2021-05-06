import React from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import * as leadsActions from '../actions/leadsActions';
import * as baseActions from '../actions/baseActions';
import {bindActionCreators} from 'redux';
import AddEditLeadsComponent from '../components/AddEditLeadsComponent';
import * as saveRegisterActions from '../actions/saveRegisterActions';

class AddEditLeadsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadProvinces();
    this.loadStatuses();
    this.loadCampaigns();
    this.loadSources();
    this.loadBase();
    this.loadStaff('');
  };

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
          <Text style={styles.name}>Tạo lead</Text>
        </View>
      </View>
    ),
  });

  loadBase = () => {
    this.props.baseActions.loadDataBase(this.props.token, this.props.domain);
  };

  loadProvinces = () => {
    this.props.saveRegisterActions.loadProvinces(
      this.props.token,
      this.props.domain,
    );
  };

  loadStatuses = () => {
    this.props.saveRegisterActions.loadStatuses(
      'leads',
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

  loadSources = () => {
    this.props.saveRegisterActions.loadSources(
      this.props.token,
      this.props.domain,
    );
  };

  loadStaff = (search) => {
    this.props.leadsActions.getStaff(
      search,
      this.props.token,
      this.props.domain,
    );
  };

  saveLead = (mode = 'add', lead) => {
    this.props.leadsActions.saveLead(
      mode,
      lead,
      this.props.token,
      this.props.domain,
      () => this.props.navigation.goBack(),
    );
  };

  render() {
    const lead = this.props.navigation.getParam('lead');
    const mode = this.props.navigation.getParam('mode');
    return (
      <AddEditLeadsComponent
        {...this.props}
        saveLead={this.saveLead}
        loadStaff={this.loadStaff}
        lead={lead}
        mode={mode}
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
    isSavingLead: state.leads.isSavingLead,
    errorSaveLead: state.leads.errorSaveLead,
    isLoadingProvinces: state.saveRegister.isLoadingProvinces,
    errorLoadingProvinces: state.saveRegister.errorLoadingProvinces,
    provinces: state.saveRegister.provinces,
    isLoadingStatuses: state.saveRegister.isLoadingStatuses,
    errorLoadingStatuses: state.saveRegister.errorLoadingStatuses,
    statuses: state.saveRegister.statuses,
    domain: state.login.domain,
    isLoadingCampaigns: state.saveRegister.isLoadingCampaigns,
    errorLoadingCampaigns: state.saveRegister.errorLoadingCampaigns,
    campaigns: state.saveRegister.campaigns,
    isLoadingSources: state.saveRegister.isLoadingSources,
    errorLoadingSources: state.saveRegister.errorLoadingSources,
    sources: state.saveRegister.sources,
    staff: state.leads.staff,
    isLoadingStaff: state.leads.isLoadingStaff,
    errorStaff: state.leads.errorStaff,
    baseData: state.base.baseData,
    isLoadingBase: state.base.isLoading,
    errorBase: state.base.errorBase,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    leadsActions: bindActionCreators(leadsActions, dispatch),
    saveRegisterActions: bindActionCreators(saveRegisterActions, dispatch),
    baseActions: bindActionCreators(baseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditLeadsContainer);
