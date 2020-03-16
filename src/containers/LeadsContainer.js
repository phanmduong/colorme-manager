import React from 'react';
import {connect} from 'react-redux';
import LeadsComponent from '../components/LeadsComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import * as leadsActions from '../actions/leadsActions';
import * as saveRegisterActions from '../actions/saveRegisterActions';
import {bindActionCreators} from 'redux';

class LeadsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadLeads();
  };

  loadLeads = () => {
    let carer_id = this.props.carer_id === -1 ? '' : this.props.carer_id;
    let leadStatusId =
      this.props.leadStatusId === -1 ? '' : this.props.leadStatusId;
    let source_id = this.props.source_id === -1 ? '' : this.props.source_id;
    let campaign_id =
      this.props.campaign_id === -1 ? '' : this.props.campaign_id;
    this.props.leadsActions.getLeads(
      this.props.currentPageLeads + 1,
      this.props.searchLeads,
      this.props.start_time,
      this.props.end_time,
      carer_id,
      leadStatusId,
      this.props.rate,
      this.props.top,
      this.props.address,
      this.props.orderBy,
      this.props.orderByType,
      source_id,
      campaign_id,
      this.props.token,
    );
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
          <Text style={styles.name}>Leads</Text>
        </View>
      </View>
    ),
  });

  render() {
    console.log(this.props.leads);
    return <LeadsComponent />;
  }
}

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    leadsActions: bindActionCreators(leadsActions, dispatch),
    saveRegisterActions: bindActionCreators(saveRegisterActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeadsContainer);
