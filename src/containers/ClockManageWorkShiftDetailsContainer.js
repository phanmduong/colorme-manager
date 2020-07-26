import React from 'react';
import {connect} from 'react-redux';
import ClockManageWorkShiftDetailsComponent from '../components/ClockManageWorkShiftDetailsComponent';
import {Image, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import {bindActionCreators} from 'redux';
import * as clockManageActions from '../actions/clockManageActions';
import {getShortName, isEmptyInput} from '../helper';

class ClockManageWorkShiftDetailsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.onSelectDate(this.props.selectedDate);
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
          {!isEmptyInput(navigation.state.params) &&
          !isEmptyInput(navigation.state.params.avatar_url) ? (
            <Image
              source={{uri: navigation.state.params.avatar_url}}
              style={styles.ava}
            />
          ) : (
            <Image
              source={require('../../assets/img/icons8-male-user-96.png')}
              style={styles.ava}
            />
          )}
          <Text style={[styles.name, {marginLeft: 10}]}>
            {navigation.state.params && navigation.state.params.name
              ? getShortName(navigation.state.params.name)
              : null}
          </Text>
        </View>
      </View>
    ),
  });

  loadWorkShifts = (date) => {
    const employeeId = this.props.navigation.getParam('employeeId');
    this.props.clockManageActions.getEmployeeWorkShiftClock(
      employeeId,
      date,
      this.props.token,
      this.props.domain,
    );
  };

  onSelectDate = (date) => {
    this.props.clockManageActions.onSelectEmployeeWorkShiftClockManageDate(
      date,
    );
  };

  render() {
    return (
      <ClockManageWorkShiftDetailsComponent
        {...this.props}
        onSelectDate={this.onSelectDate}
        loadWorkShifts={this.loadWorkShifts}
      />
    );
  }
}

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
  ava: theme.mainAvatar,
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    selectedDate: state.clockManage.selectedDate,
    employeeSelectedDate: state.clockManage.employeeSelectedDate,
    isLoadingWorkShiftData: state.clockManage.isLoadingWorkShiftData,
    errorWorkShiftData: state.clockManage.errorWorkShiftData,
    selectedEmployee: state.clockManage.selectedEmployee,
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clockManageActions: bindActionCreators(clockManageActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClockManageWorkShiftDetailsContainer);
