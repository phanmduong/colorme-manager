import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import * as kpiActions from '../actions/kpiActions';
import {bindActionCreators} from 'redux';
import AddKPIComponent from '../components/AddKPIComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';

function AddKPIContainer(props) {
  useEffect(() => {
    function loadKPISettings() {
      props.kpiActions.loadKPISettings(props.token);
    }
    function loadKPIEmployees() {
      props.kpiActions.loadKPIEmployees(props.token);
    }
    function loadKPICampaigns() {
      props.kpiActions.loadCampaigns(props.token);
    }
    function loadKPISources() {
      props.kpiActions.loadSources(props.token);
    }
    function loadKPICourses() {
      props.kpiActions.loadCourses(props.token);
    }
    loadKPISettings();
    loadKPIEmployees();
    loadKPICampaigns();
    loadKPISources();
    loadKPICourses();
  }, []);

  function filterEmployees() {
    let kpiListEmployees = props.settings.find(
      (setting) => setting.key === 'kpi_list_employee',
    );
    if (kpiListEmployees) {
      kpiListEmployees = kpiListEmployees.value;
    } else {
      kpiListEmployees = [];
    }
    return props.employees.filter((employee) =>
      kpiListEmployees.includes(employee.id),
    );
  }

  function addKpis(kpiData) {
    props.kpiActions.addKpis(kpiData, props.token);
  }

  return (
    <AddKPIComponent
      {...props}
      employees={filterEmployees()}
      addKpis={addKpis}
    />
  );
}

AddKPIContainer.navigationOptions = ({navigation}) => {
  return {
    headerLeft: () => (
      <View style={styles.headerLeftContainer}>
        <View style={styles.row}>
          <Icon
            name={'chevron-left'}
            size={33}
            color={'black'}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.name}>Thêm KPI</Text>
        </View>
      </View>
    ),
  };
};

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
  row: theme.row,
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    settings: state.kpi.settings,
    loadingSettings: state.kpi.loadingSettings,
    errorSettings: state.kpi.errorSettings,
    employees: state.kpi.employees,
    loadingEmployees: state.kpi.loadingEmployees,
    errorEmployees: state.kpi.errorEmployees,
    addingKpis: state.kpi.addingKpis,
    errorAddKpis: state.kpi.errorAddKpis,
    campaigns: state.kpi.campaigns,
    loadingCampaigns: state.kpi.loadingCampaigns,
    errorCampaigns: state.kpi.errorCampaigns,
    sources: state.kpi.sources,
    loadingSources: state.kpi.loadingSources,
    errorSources: state.kpi.errorSources,
    courses: state.kpi.courses,
    loadingCourses: state.kpi.loadingCourses,
    errorCourses: state.kpi.errorCourses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    kpiActions: bindActionCreators(kpiActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddKPIContainer);
