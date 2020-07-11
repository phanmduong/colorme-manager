import React from 'react';
import {connect} from 'react-redux';
import ClockManageComponent from '../components/ClockManageComponent';
import * as clockManageActions from '../actions/clockManageActions';
import {bindActionCreators} from 'redux';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';

class ClockManageContainer extends React.Component {
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
          <Text style={styles.name}>Chấm công</Text>
        </View>
      </View>
    ),
  });

  componentDidMount = () => {
    this.loadShifts(this.props.selectedDate);
  };

  loadShifts = (date) => {
    this.props.clockManageActions.getShiftClock(date, this.props.token);
  };

  onSelectDate = (date) => {
    this.props.clockManageActions.onSelectClockManageDate(date);
  };

  render() {
    return (
      <ClockManageComponent
        {...this.props}
        onSelectDate={this.onSelectDate}
        loadShifts={this.loadShifts}
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
    selectedDate: state.clockManage.selectedDate,
    shifts: state.clockManage.shifts,
    isLoadingShifts: state.clockManage.isLoadingShifts,
    errorShifts: state.clockManage.errorShifts,
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
)(ClockManageContainer);
