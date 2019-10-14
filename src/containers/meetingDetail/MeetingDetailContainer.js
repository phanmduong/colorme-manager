/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {connect} from 'react-redux';
import MeetingDetailStore from './MeetingDetailStore';
import {observer} from 'mobx-react';
import MeetingDetailComponent from './MeetingDetailComponent';
import {TouchableOpacity, Image} from 'react-native';

@observer
class MeetingDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const meetingId = navigation.getParam('meetingId', 0);
    this.store = new MeetingDetailStore(props.token, meetingId);
  }

  static navigationOptions = ({navigation}) => {
    const meetingId = navigation.getParam('meetingId', 0);
    return {
      title: 'Chi tiết buổi họp',
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate('EditStoreMeeting', {meetingId})}>
          <Image
            source={require('../../../assets/img/icons8-edit-96.png')}
            style={{width: 20, height: 20, marginRight: 20}}
          />
        </TouchableOpacity>
      ),
    };
  };

  componentDidMount() {
    this.store.loadList();
  }

  render() {
    return <MeetingDetailComponent store={this.store} {...this.props} />;
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
)(MeetingDetailContainer);
