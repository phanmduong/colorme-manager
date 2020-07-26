/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {connect} from 'react-redux';
import MeetingDetailStore from './MeetingDetailStore';
import {observer} from 'mobx-react';
import MeetingDetailComponent from './MeetingDetailComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../styles';

@observer
class HistoryMeetingDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const meetingId = navigation.getParam('meetingId', 0);
    this.store = new MeetingDetailStore(props.token, meetingId, props.domain);
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
          <Text style={styles.name}>Chi tiết buổi họp</Text>
        </View>
      </View>
    ),
  });

  componentDidMount() {
    this.store.loadList();
  }

  render() {
    return <MeetingDetailComponent store={this.store} {...this.props} />;
  }
}

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryMeetingDetailsContainer);
