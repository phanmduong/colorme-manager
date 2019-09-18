/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {connect} from 'react-redux';
import MeetingStore from './MeetingStore';
import {observer} from 'mobx-react';
import HistoryMeetingComponent from './HistoryMeetingComponent';

@observer
class MeetingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.store = new MeetingStore(props.token);
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Lịch sử cuộc họp',
  });

  componentDidMount() {
    this.store.loadHistoryList();
  }

  render() {
    return <HistoryMeetingComponent store={this.store} {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeetingContainer);
