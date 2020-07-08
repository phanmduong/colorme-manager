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

  render() {
    return <ClockManageComponent {...this.props} />;
  }
}

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
};

function mapStateToProps(state) {
  return {};
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
