/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import CheckInComponent from '../components/CheckInComponent';
import {Text, View} from 'react-native';
import * as checkInCheckOutActions from '../actions/checkInCheckOutActions';
import {bindActionCreators} from 'redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import Geolocation from 'react-native-geolocation-service';

class CheckInContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onCheck = this.onCheck.bind(this);
    this.onExit = this.onExit.bind(this);
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
          <Text style={styles.name}>{navigation.state.params.title}</Text>
        </View>
      </View>
    ),
  });

  componentWillMount() {
    this.onCheck();
    Geolocation.requestAuthorization('whenInUse');
  }

  onCheck() {
    this.props.checkInCheckOutActions.loadCheck(
      this.props.token,
      this.props.navigation.state.params.type,
      this.props.domain,
    );
  }

  onExit() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <CheckInComponent
        {...this.props}
        onCheck={this.onCheck}
        onExit={this.onExit}
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
    isLoadingCheckIn: state.checkInCheckOut.isLoadingCheckIn,
    errorCheckIn: state.checkInCheckOut.errorCheckIn,
    message: state.checkInCheckOut.message,
    checkInData: state.checkInCheckOut.checkIn,
    token: state.login.token,
    user: state.login.user,
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkInCheckOutActions: bindActionCreators(
      checkInCheckOutActions,
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckInContainer);
