/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {connect} from 'react-redux';
import MeetingStore from './MeetingStore';
import {observer} from 'mobx-react';
import HistoryMeetingComponent from './HistoryMeetingComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from "../../styles";

@observer
class MeetingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.store = new MeetingStore(props.token);
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
          <Text style={styles.name}>Lịch sử cuộc họp</Text>
        </View>
      </View>
    ),
  });

  componentDidMount() {
    this.store.loadHistoryList();
  }

  render() {
    return <HistoryMeetingComponent store={this.store} {...this.props} />;
  }
}

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
};

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
