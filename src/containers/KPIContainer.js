import React from 'react';
import {connect} from 'react-redux';
import KPIComponent from '../components/KPIComponent';
import * as kpiActions from '../actions/kpiActions';
import {bindActionCreators} from 'redux';
import theme from '../styles';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class KPIContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadKPI();
  }

  componentWillUnmount() {
    this.props.kpiActions.reset();
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
          <Text style={styles.name}>KPI</Text>
        </View>
      </View>
    ),
  });

  loadKPI = () => {
    this.props.kpiActions.loadKPI(
      false,
      this.props.search,
      this.props.currentPage + 1,
      this.props.type,
      this.props.calculateBy,
      this.props.startTime,
      this.props.endTime,
      this.props.token,
    );
  };

  refreshKPI = () => {
    this.props.kpiActions.refreshKPI(
      this.props.search,
      this.props.type,
      this.props.calculateBy,
      this.props.startTime,
      this.props.endTime,
      this.props.token,
    );
  };

  searchKPI = (search) => {
    this.props.kpiActions.searchKPI(
      search,
      this.props.type,
      this.props.calculateBy,
      this.props.startTime,
      this.props.endTime,
      this.props.token,
    );
  };

  render() {
    return (
      <KPIComponent
        {...this.props}
        onRefresh={this.refreshKPI}
        searchKPI={this.searchKPI}
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
    kpis: state.kpi.kpis,
    loading: state.kpi.loading,
    error: state.kpi.error,
    refreshing: state.kpi.refreshing,
    currentPage: state.kpi.currentPage,
    totalPage: state.kpi.totalPage,
    search: state.kpi.search,
    type: state.kpi.type,
    calculateBy: state.kpi.calculateBy,
    startTime: state.kpi.startTime,
    endTime: state.kpi.endTime,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    kpiActions: bindActionCreators(kpiActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(KPIContainer);
