import React from 'react';
import {connect} from 'react-redux';
import ClockManageWorkShiftDetailsComponent from '../components/ClockManageWorkShiftDetailsComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import {bindActionCreators} from 'redux';
import * as clockManageActions from '../actions/clockManageActions';

class ClockManageWorkShiftDetailsContainer extends React.Component {
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

  render() {
    return <ClockManageWorkShiftDetailsComponent {...this.props} />;
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
    selectedEmployee: state.clockManage.selectedEmployee,
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
