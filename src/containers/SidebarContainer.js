/**
 * Created by phanmduong on 4/14/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SidebarComponent from '../components/SidebarComponent';
import * as loginActions from '../actions/loginActions';

class SideBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.loginActions.logout();
  }

  render() {
    return (
      <SidebarComponent
        logout={this.logout}
        user={this.props.user}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideBar);
