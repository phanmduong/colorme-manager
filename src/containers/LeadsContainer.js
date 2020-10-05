import React from 'react';
import {connect} from 'react-redux';
import LeadsComponent from '../components/LeadsComponent';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import * as leadsActions from '../actions/leadsActions';
import * as saveRegisterActions from '../actions/saveRegisterActions';
import * as infoStudentActions from '../actions/infoStudentActions';
import {bindActionCreators} from 'redux';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

class LeadsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadLeads();
    this.loadStatuses();
    this.loadCampaigns();
    this.loadSources();
    this.loadStaff('');
  };

  loadLeads = () => {
    let carer_id = this.props.carer_id === -1 ? '' : this.props.carer_id;
    let rate = this.props.rate === -1 ? '' : this.props.rate;
    let leadStatusId =
      this.props.leadStatusId === -1 ? '' : this.props.leadStatusId;
    let source_id = this.props.source_id === -1 ? '' : this.props.source_id;
    let campaign_id =
      this.props.campaign_id === -1 ? '' : this.props.campaign_id;
    this.props.leadsActions.getLeads(
      false,
      this.props.currentPageLeads + 1,
      this.props.searchLeads,
      this.props.start_time,
      this.props.end_time,
      carer_id,
      leadStatusId,
      rate,
      this.props.top,
      this.props.address,
      this.props.orderBy,
      this.props.orderByType,
      source_id,
      campaign_id,
      this.props.token,
      this.props.domain,
    );
  };

  searchData = (searchLeads) => {
    let carer_id = this.props.carer_id === -1 ? '' : this.props.carer_id;
    let rate = this.props.rate === -1 ? '' : this.props.rate;
    let leadStatusId =
      this.props.leadStatusId === -1 ? '' : this.props.leadStatusId;
    let source_id = this.props.source_id === -1 ? '' : this.props.source_id;
    let campaign_id =
      this.props.campaign_id === -1 ? '' : this.props.campaign_id;
    this.props.leadsActions.searchLeads(
      searchLeads,
      this.props.start_time,
      this.props.end_time,
      carer_id,
      leadStatusId,
      rate,
      this.props.top,
      this.props.address,
      this.props.orderBy,
      this.props.orderByType,
      source_id,
      campaign_id,
      this.props.token,
      this.props.domain,
    );
  };

  onRefresh = (searchLeads) => {
    let carer_id = this.props.carer_id === -1 ? '' : this.props.carer_id;
    let rate = this.props.rate === -1 ? '' : this.props.rate;
    let leadStatusId =
      this.props.leadStatusId === -1 ? '' : this.props.leadStatusId;
    let source_id = this.props.source_id === -1 ? '' : this.props.source_id;
    let campaign_id =
      this.props.campaign_id === -1 ? '' : this.props.campaign_id;
    this.props.leadsActions.refreshLeads(
      searchLeads,
      this.props.start_time,
      this.props.end_time,
      carer_id,
      leadStatusId,
      rate,
      this.props.top,
      this.props.address,
      this.props.orderBy,
      this.props.orderByType,
      source_id,
      campaign_id,
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

  onSelectStartTime = (startTime) => {
    this.props.leadsActions.onSelectStartTimeLeads(startTime);
  };

  onSelectEndTime = (endTime) => {
    this.props.leadsActions.onSelectEndTimeLeads(endTime);
  };

  onSelectRate = (rate) => {
    this.props.leadsActions.onSelectRateLeads(rate);
  };

  onSelectCampaign = (campaign) => {
    this.props.leadsActions.onSelectCampaignLeads(campaign);
  };

  onSelectStatus = (status) => {
    this.props.leadsActions.onSelectStatusLeads(status);
  };

  onSelectSource = (source) => {
    this.props.leadsActions.onSelectSourceLeads(source);
  };

  onSelectAddress = (address) => {
    this.props.leadsActions.onSelectAddressLeads(address);
  };

  onSelectCarer = (carer_id) => {
    this.props.leadsActions.onSelectCarerLeads(carer_id);
  };

  reset = () => {
    this.props.leadsActions.reset();
  };

  changeCallStatus = (
    callStatus,
    studentId,
    telecallId,
    genId,
    note,
    callerId,
    appointmentPayment,
    dateTest,
  ) => {
    this.props.infoStudentActions.changeCallStatus(
      callStatus,
      studentId,
      telecallId,
      genId,
      note,
      callerId,
      appointmentPayment,
      dateTest,
      this.props.token,
      this.props.domain,
    );
  };

  setStudentId = (studentId) => {
    this.props.infoStudentActions.setStudentId(studentId);
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
          <Text style={styles.name}>Leads - CRM</Text>
        </View>
      </View>
    ),
    headerRight: () => (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.navigate('AddLead')}>
          <View style={styles.headerIconContainer}>
            <MatIcon name={'add-circle'} size={20} color={'black'} />
          </View>
        </TouchableOpacity>
      </View>
    ),
  });

  changeCampaignTag = (campaign_id, user_id) => {
    this.props.leadsActions.changeCampaignTag(
      campaign_id,
      user_id,
      this.props.token,
      this.props.domain,
    );
  };

  changeSourceTag = (source_id, user_id) => {
    this.props.leadsActions.changeSourceTag(
      source_id,
      user_id,
      this.props.token,
      this.props.domain,
    );
  };

  changeStatusTag = (status_id, id) => {
    this.props.leadsActions.changeStatusTag(
      status_id,
      id,
      this.props.token,
      this.props.domain,
    );
  };

  changePICTag = (staff_id, lead_id) => {
    this.props.leadsActions.changePICTag(
      staff_id,
      lead_id,
      this.props.token,
      this.props.domain,
    );
  };

  changeTags = (user_id, campaign_id, source_id, status_id, staff_id) => {
    this.changeCampaignTag(campaign_id, user_id);
    this.changeSourceTag(source_id, user_id);
    this.changeStatusTag(status_id, user_id);
    this.changePICTag(staff_id, user_id);
    setTimeout(() => this.onRefresh(this.props.searchLeads), 500);
  };

  render() {
    return (
      <LeadsComponent
        {...this.props}
        searchData={this.searchData}
        loadLeads={this.loadLeads}
        onRefresh={this.onRefresh}
        onSelectStartTime={this.onSelectStartTime}
        onSelectEndTime={this.onSelectEndTime}
        onSelectRate={this.onSelectRate}
        onSelectCampaignId={this.onSelectCampaign}
        onSelectStatus={this.onSelectStatus}
        onSelectSource={this.onSelectSource}
        onSelectAddress={this.onSelectAddress}
        onSelectCarer={this.onSelectCarer}
        reset={this.reset}
        loadStaff={this.loadStaff}
        changeCallStatus={this.changeCallStatus}
        setStudentId={this.setStudentId}
        changeTags={this.changeTags}
      />
    );
  }
}

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
  headerIconContainer: theme.headerIconContainer,
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    isLoadingLeads: state.leads.isLoadingLeads,
    errorLeads: state.leads.errorLeads,
    leads: state.leads.leads,
    currentPageLeads: state.leads.currentPageLeads,
    totalPageLeads: state.leads.totalPageLeads,
    searchLeads: state.leads.searchLeads,
    start_time: state.leads.start_time,
    end_time: state.leads.end_time,
    carer_id: state.leads.carer_id,
    leadStatusId: state.leads.leadStatusId,
    rate: state.leads.rate,
    top: state.leads.top,
    address: state.leads.address,
    orderBy: state.leads.orderBy,
    orderByType: state.leads.orderByType,
    source_id: state.leads.source_id,
    campaign_id: state.leads.campaign_id,
    refreshingLeads: state.leads.refreshingLeads,
    isLoadingStatuses: state.saveRegister.isLoadingStatuses,
    errorLoadingStatuses: state.saveRegister.errorLoadingStatuses,
    statuses: state.saveRegister.statuses,
    isLoadingCampaigns: state.saveRegister.isLoadingCampaigns,
    errorLoadingCampaigns: state.saveRegister.errorLoadingCampaigns,
    campaigns: state.saveRegister.campaigns,
    isLoadingSources: state.saveRegister.isLoadingSources,
    errorLoadingSources: state.saveRegister.errorLoadingSources,
    sources: state.saveRegister.sources,
    staff: state.leads.staff,
    isLoadingStaff: state.leads.isLoadingStaff,
    errorStaff: state.leads.errorStaff,
    errorChangeCallStatus: state.infoStudent.errorChangeCallStatus,
    domain: state.login.domain,
    isChangingCampaignTag: state.leads.isChangingCampaignTag,
    errorChangeCampaignTag: state.leads.errorChangeCampaignTag,
    isChangingStatusTag: state.leads.isChangingStatusTag,
    errorChangeStatusTag: state.leads.errorChangeStatusTag,
    isChangingPICTag: state.leads.isChangingPICTag,
    errorChangePICTag: state.leads.errorChangePICTag,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    leadsActions: bindActionCreators(leadsActions, dispatch),
    saveRegisterActions: bindActionCreators(saveRegisterActions, dispatch),
    infoStudentActions: bindActionCreators(infoStudentActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadsContainer);
