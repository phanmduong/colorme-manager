/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {observer} from 'mobx-react';
import HistoryAttendanceTeachingStore from './HistoryAttendanceTeachingStore';
import ListHistoryAttendanceTeaching from './ListHistoryAttendanceTeaching';

@observer
class HistoryAttendanceTeachingContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = new HistoryAttendanceTeachingStore();
  }

  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    const {startTime, endTime} = this.store;
    this.store.loadHistoryTeaching(
      this.props.user.id,
      startTime,
      endTime,
      this.props.token,
      this.props.domain,
    );
  };

  onSelectStartTime = (startTime) => {
    this.store.onSelectStartTime(startTime);
  };

  onSelectEndTime = (endTime) => {
    this.store.onSelectEndTime(endTime);
  };

  render() {
    return (
      <ListHistoryAttendanceTeaching
        store={this.store}
        onSelectStartTime={this.onSelectStartTime}
        onSelectEndTime={this.onSelectEndTime}
        loadData={this.loadData}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    user: state.login.user,
    domain: state.login.domain,
  };
}

export default connect(mapStateToProps)(HistoryAttendanceTeachingContainer);
