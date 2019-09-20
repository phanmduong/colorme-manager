/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {connect} from 'react-redux';
import EditStore from './EditStore';
import {observer} from 'mobx-react';
import EditStoreMeetingComponent from './EditStoreMeetingComponent';

@observer
class EditStoreMeetingContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    const {navigation} = this.props;
    const meetingId = navigation.getParam('meetingId', 0);
    this.store = new EditStore(props.token, meetingId);
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Chỉnh sửa cuộc họp',
  });

  render() {
    return (
      <EditStoreMeetingComponent
        store={this.store}
        {...this.props}
      />
    );
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
)(EditStoreMeetingContainer);
