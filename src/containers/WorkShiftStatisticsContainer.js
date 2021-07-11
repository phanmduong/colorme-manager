import React from 'react';
import WorkShiftStatisticsComponent from '../components/WorkShiftStatisticsComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import * as workShiftRegisterActions from '../actions/workShiftRegisterActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class WorkShiftStatisticsContainer extends React.Component {
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
          <Text style={styles.name}>Thống kê đăng kí làm việc</Text>
        </View>
      </View>
    ),
  });

  componentDidMount() {
    this.loadStatistics();
  }

  loadStatistics = () => {
    this.props.workShiftRegisterActions.loadStatistics(
      false,
      this.props.startTime,
      this.props.endTime,
      this.props.selectedBaseId,
      this.props.token,
      this.props.domain,
    );
  };

  onRefresh = () => {
    this.props.workShiftRegisterActions.loadStatistics(
      true,
      this.props.startTime,
      this.props.endTime,
      this.props.selectedBaseId,
      this.props.token,
      this.props.domain,
    );
  };

  render() {
    return (
      <WorkShiftStatisticsComponent
        {...this.props}
        onRefresh={this.onRefresh}
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
    domain: state.login.domain,
    statistics: state.workShiftRegister.statistics,
    isLoadingStatistics: state.workShiftRegister.isLoadingStatistics,
    errorStatistics: state.workShiftRegister.errorStatistics,
    refreshingStatistics: state.workShiftRegister.refreshingStatistics,
    startTime: state.workShiftRegister.startTime,
    endTime: state.workShiftRegister.endTime,
    selectedBaseId: state.workShiftRegister.selectedBaseId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    workShiftRegisterActions: bindActionCreators(
      workShiftRegisterActions,
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkShiftStatisticsContainer);
