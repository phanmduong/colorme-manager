import React from 'react';
import {connect} from 'react-redux';
import NotificationComponent from '../components/NotificationComponent';
import {bindActionCreators} from 'redux';
import * as notificationActions from '../actions/notificationActions';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from "../styles";

class NotificationContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.resetNotifications();
    this.loadNotifications(1);
    this.readAllNotifications();
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
          <Text style={styles.name}>Thông báo</Text>
        </View>
      </View>
    ),
  });

  componentWillUnmount = () => {
    this.loadNotifications(1);
  };

  loadNotifications = page => {
    this.props.notificationActions.loadNotifications(page, this.props.token);
  };

  loadMoreNotifications = page => {
    this.props.notificationActions.loadMoreNotifications(
      page,
      this.props.token,
    );
  };

  readAllNotifications = () => {
    this.props.notificationActions.readAllNotifications(this.props.token);
  };

  refreshNotifications = page => {
    this.props.notificationActions.refreshNotifications(page, this.props.token);
  };

  resetNotifications = () => {
    this.props.notificationActions.resetNotifications();
  };

  render() {
    return (
      <NotificationComponent
        {...this.props}
        loadMoreNotifications={this.loadMoreNotifications}
        refreshNotifications={this.refreshNotifications}
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
    notifications: state.notification.notifications,
    isLoadingNotifications: state.notification.isLoadingNotifications,
    errorLoadingNotifications: state.notification.errorLoadingNotifications,
    unread: state.notification.unread,
    isLoadingMoreNotifications: state.notification.isLoadingMoreNotifications,
    errorLoadingMoreNotifications:
      state.notification.errorLoadingMoreNotifications,
    isRefreshingNotifications: state.notification.isRefreshingNotifications,
    errorRefreshingNotifications:
      state.notification.errorRefreshingNotifications,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationContainer);
